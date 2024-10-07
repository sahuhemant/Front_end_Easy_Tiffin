import React, { useState, useEffect } from "react";
import "./ChatIcon.css"; // Import your CSS
import "./ChatMessage.css"; // Import the new CSS

const ChatMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const token = localStorage.getItem("token"); // Get the token from local storage
  const userId = localStorage.getItem("userId"); // Assume you are storing user ID in local storage

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchMessages(); // Fetch messages when opening the chat box
    }
  };

  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3001/chat_messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data); // Set the fetched messages
      } else {
        console.error("Failed to fetch messages:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send a new chat message
  const sendMessage = async () => {
    if (!messageInput.trim()) return; // Don't send empty messages
    try {
      const response = await fetch("http://localhost:3001/chat_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageInput, user_id: userId }), // Include user ID
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to the list
        setMessageInput(""); // Clear input after sending
      } else {
        console.error("Failed to send message:", await response.json());
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-icon-container">
      <button className="chat-icon" onClick={toggleChatBox}>
        💬
      </button>

      {isOpen && (
        <div className={`chat-box ${isOpen ? "open" : ""}`}>
          <h3>Chat with Admin</h3>
          <div className="messages-container">
            {/* Display messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "admin" ? "admin" : "user"}`}>
                <div className="message-content">
                  <strong>{msg.sender === "admin" ? "Admin" : "You"}:</strong> {msg.message}
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
