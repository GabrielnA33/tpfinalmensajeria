import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css"; 

const Chat = () => {
  const { id } = useParams();

  const contacts = {
    1: { name: "Juan Pérez", avatar: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" },
    2: { name: "María García", avatar: "https://media.gettyimages.com/id/1437816897/es/foto/mujer-de-negocios-gerente-o-retrato-de-recursos-humanos-para-el-%C3%A9xito-profesional-la-empresa.jpg?s=612x612&w=gi&k=20&c=qKF-y-ER7FtIsBJk8CBUuWRbDzUcA-BhPyXQzmBCCKA=" },
    3: { name: "Carlos López", avatar: "https://via.placeholder.com/40" },
  };

  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem(`chat-${id}`)) || []
  );
  const [newMessage, setNewMessage] = useState("");

  const autoResponses = {
    1: ["¡Hola! ¿Qué tal?", "Estoy ocupado ahora, luego hablamos.", "¿Cómo puedo ayudarte?"],
    2: ["¡Qué bueno escucharte!", "¿Necesitas algo?", "Te mando un saludo."],
    3: ["Hola. Como estás?", "Que haces?", "Gracias por avisarme."],
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedMessages = [...messages, { text: newMessage, sender: "me", time: timestamp }];
      setMessages(updatedMessages);
      localStorage.setItem(`chat-${id}`, JSON.stringify(updatedMessages));
      setNewMessage("");

      setTimeout(() => {
        const responses = autoResponses[id] || ["No estoy disponible ahora."];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const autoReply = [...updatedMessages, { text: randomResponse, sender: "them", time: timestamp }];
        setMessages(autoReply);
        localStorage.setItem(`chat-${id}`, JSON.stringify(autoReply));
      }, 1000);
    }
  };

  const contact = contacts[id] || { name: "Contacto desconocido", avatar: "" };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={contact.avatar} alt="avatar" className="avatar" />
        <div className="contact-info">
          <h3>{contact.name}</h3>
          <p>En línea</p>
        </div>
        <button className="call-button">📞</button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === "me" ? "my-message" : "their-message"}
          >
            {msg.text}
            <span className="message-time">{msg.time}</span>
          </p>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
