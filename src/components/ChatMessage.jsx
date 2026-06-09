import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import "../styles/ChatMessage.css";

export default function ChatMessage({
    message,
    onCopyCode,
    copied,
    children,
}) {
    const isUser = message.role === "user";

    return (
        <div className={`message-wrapper ${isUser ? "user" : "assistant"}`}>
            <div className={`message ${isUser ? "user-message" : "assistant-message"}`}>
                {isUser ? (
                    <div className="user-message-content">
                        {message.content && <p>{message.content}</p>}
                        {message.code && (
                            <div className="user-code-block">
                                <small>{message.language}</small>
                                <pre>
                                    <code>{message.code}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="assistant-message-content">
                        <ReactMarkdown
                            components={{
                                h4: ({ node, ...props }) => (
                                    <h4 style={{ marginTop: "12px", marginBottom: "8px" }} {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul style={{ marginLeft: "20px", marginBottom: "8px" }} {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p style={{ marginBottom: "8px" }} {...props} />
                                ),
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
