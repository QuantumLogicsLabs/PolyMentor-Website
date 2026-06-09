import { useState, useRef, useEffect } from "react";
import { Send, Copy, Check, AlertCircle, Loader } from "lucide-react";
import ChatMessage from "./ChatMessage";
import CodeBlock from "./CodeBlock";
import "../styles/ChatInterface.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content:
                "👋 Hello! I'm PolyMentor, your AI coding tutor. I can help you:\n\n• Explain programming concepts\n• Find and fix bugs in your code\n• Review your code quality\n• Teach you best practices\n\nJust paste your code and ask a question!",
            timestamp: new Date(),
        },
    ]);

    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [language, setLanguage] = useState("python");
    const [level, setLevel] = useState("beginner");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(null);
    const messagesEndRef = useRef(null);
    const messageInputRef = useRef(null);

    const languages = [
        "python",
        "javascript",
        "typescript",
        "java",
        "cpp",
        "c",
        "csharp",
        "go",
        "rust",
        "php",
        "ruby",
        "swift",
        "kotlin",
        "sql",
        "html",
        "css",
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleCopyCode = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() && !code.trim()) return;

        setError("");
        const userMessage = {
            id: Date.now(),
            role: "user",
            content: message,
            code: code,
            language: language,
            level: level,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message || "Review this code",
                    code: code,
                    language: language,
                    level: level,
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            let answerContent = data.answer || "";

            // Format response with sections
            if (data.suspected_bugs && data.suspected_bugs.length > 0) {
                answerContent += `\n\n**🐛 Suspected Bugs:**\n${data.suspected_bugs.map((b) => `- ${b}`).join("\n")}`;
            }

            if (data.lesson) {
                answerContent += `\n\n**📚 Lesson:**\n${data.lesson}`;
            }

            if (data.next_steps && data.next_steps.length > 0) {
                answerContent += `\n\n**🎯 Next Steps:**\n${data.next_steps.map((s) => `- ${s}`).join("\n")}`;
            }

            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: answerContent,
                fixedCode: data.fixed_code,
                codeLanguage: language,
                model: data.model,
                elapsed: data.elapsed_ms,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Clear code after successful message
            if (code.trim()) {
                setCode("");
            }
        } catch (err) {
            setError(
                `Error: ${err.message}. Make sure the API is running at ${API_URL}`
            );
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="header-content">
                    <h1>💻 PolyMentor Chat</h1>
                    <p>Your AI coding tutor - Ask anything about code!</p>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                        onCopyCode={() => handleCopyCode(msg.content, msg.id)}
                        copied={copied === msg.id}
                    >
                        {msg.fixedCode && (
                            <div className="fixed-code-section">
                                <h4>✅ Fixed Code:</h4>
                                <CodeBlock
                                    code={msg.fixedCode}
                                    language={msg.codeLanguage}
                                    onCopy={() =>
                                        handleCopyCode(msg.fixedCode, `fixed-${msg.id}`)
                                    }
                                    copied={copied === `fixed-${msg.id}`}
                                />
                            </div>
                        )}
                        {msg.model && (
                            <div className="message-meta">
                                <small>
                                    Model: {msg.model} | Time: {msg.elapsed?.toFixed(0)}ms
                                </small>
                            </div>
                        )}
                    </ChatMessage>
                ))}

                {loading && (
                    <div className="message assistant-message loading">
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>PolyMentor is thinking...</p>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {error && (
                <div className="error-banner">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <form className="chat-input-area" onSubmit={sendMessage}>
                <div className="compact-settings">
                    <div className="settings-badge">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={loading}
                            title="Programming Language"
                        >
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="settings-badge">
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            disabled={loading}
                            title="Difficulty Level"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div className="code-input-section">
                    <label>📝 Code (optional)</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste your code here... (optional)"
                        rows="5"
                        disabled={loading}
                        className="code-textarea"
                    />
                    <small>{code.length} characters</small>
                </div>

                <div className="message-input-section">
                    <input
                        ref={messageInputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me to fix bugs, explain concepts, review code, or teach you..."
                        disabled={loading}
                        className="message-input"
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading || (!message.trim() && !code.trim())}
                        className="send-button"
                    >
                        {loading ? (
                            <Loader size={20} className="spinner" />
                        ) : (
                            <Send size={20} />
                        )}
                        <span>{loading ? "Sending..." : "Send"}</span>
                    </button>
                </div>

                <div className="input-hints">
                    <small>💡 Tip: You can ask me to:</small>
                    <ul>
                        <li>"Find the bug"</li>
                        <li>"Explain this code"</li>
                        <li>"How do I..."</li>
                        <li>"Fix this for me and teach me"</li>
                    </ul>
                </div>
            </form>
        </div>
    );
}
