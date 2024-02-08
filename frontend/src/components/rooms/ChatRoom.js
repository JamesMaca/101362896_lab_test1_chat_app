import React, { useState, useEffect } from 'react';

export default function ChatRoom({ socket, room, loggedInUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            // Check if the message belongs to the current room
            if (message.room === room) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('message');
        };
    }, [socket, room]); // Re-run effect when socket or room changes

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const messageObject = {
            room,
            message: newMessage,
            from_user: loggedInUser.username
        };
        socket.emit('sendMessage', messageObject);
        setNewMessage('');
    };

    return (
        <div className="chat-room">
            <h2>Chat Room: {room}</h2>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.from_user}:</strong> {msg.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleMessageSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}


