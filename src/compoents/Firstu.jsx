import "./first.css";
import { useState, useEffect, useRef } from "react";

function Firstu() {
    const [color, setColor] = useState("white");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef(null);

    function onchange(event) {
        setInput(event.target.value);
    }

    function darkmode() {
        const newColor = color === "white" ? "#424242" : "white";
        setColor(newColor);
        document.documentElement.style.setProperty("--bg-color", newColor);
        document.documentElement.style.setProperty("--text-color", newColor === "#424242" ? "white" : "#424242");
        document.documentElement.style.setProperty("--button-bg", newColor === "#424242" ? "white" : "#424242");
    }

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages([...messages, { sender: "user", text: userMessage }]);
        setInput("");

        try {
            const res = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: data.response }
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <i className="bi bi-robot"></i>
                    <a className="navbar-brand" href="/">FAQ Assistant</a>
                    <button className="light" onClick={darkmode}>
                        <i className="bi bi-brightness-high"></i>
                    </button>
                </div>
            </nav>

            {/* Scrollable message container */}
            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                        {msg.text}
                    </p>
                ))}
            </div>

            {/* Fixed input at bottom */}
            <div className="input-group">
                <input
                    type="text"
                    className="form"
                    placeholder="Send message..."
                    value={input}
                    onChange={onchange}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
                />
                <i className="bi bi-send" onClick={sendMessage}></i>
            </div>
        </>
    );
}

export default Firstu;
