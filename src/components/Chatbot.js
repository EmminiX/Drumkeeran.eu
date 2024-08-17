import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/components/Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages(prev => [...prev, { text: input, isUser: true }]);
            setInput('');
            setIsLoading(true);

            try {
                const response = await axios.post('/api/chat', { message: input });
                setMessages(prev => [...prev, { text: response.data.message, isUser: false }]);
            } catch (error) {
                console.error('Error sending message to chatbot API:', error);
                setMessages(prev => [...prev, { text: 'An error occurred. Please try again later.', isUser: false }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
            <button
                className="chatbot-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle chatbot"
            >
                <span className="chatbot-icon">💬</span>
                <span></span>
            </button>
            {isOpen && (
                <>
                    <div className="chatbot-body" ref={chatBodyRef}>
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                                {message.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            aria-label="Chat message"
                        />
                        <button onClick={handleSend} aria-label="Send message">Send</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chatbot;