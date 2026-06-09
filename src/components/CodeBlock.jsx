import { Copy, Check } from "lucide-react";
import "../styles/CodeBlock.css";

export default function CodeBlock({
    code,
    language = "python",
    onCopy,
    copied,
}) {
    return (
        <div className="code-block-wrapper">
            <div className="code-block-header">
                <span className="language-badge">{language}</span>
                <button
                    className="copy-button"
                    onClick={onCopy}
                    title="Copy code"
                    type="button"
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className={`code-block language-${language}`}>
                <code>{code}</code>
            </pre>
        </div>
    );
}
