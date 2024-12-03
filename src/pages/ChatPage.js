import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatPage.css";

// Respuestas predeterminadas basadas en las entradas
const generateResponse = (message) => {
  const responses = {
    "Hola, ¿cómo estás?": "¡Estoy bien, gracias! ¿Y tú?",
    "¿Cómo estás?": "Estoy muy bien, gracias por preguntar. ¿Y tú?",
    "¿Qué haces?": "Estoy programando, trabajando en un proyecto interesante. ¿Y tú?",
    "Hola": "¡Hola! ¿Cómo puedo ayudarte hoy?",
    "¿Nos vemos mañana?": "¡Sí! ¿A qué hora te viene bien?",
    "¿Qué tal?": "Todo bien, gracias. ¿Cómo va todo contigo?",
  };

  return responses[message] || "Lo siento, no entiendo tu mensaje. ¿Puedes repetir?";
};

const users = [
  { id: 1, name: "Juan Pérez", avatar: "https://via.placeholder.com/50?text=Juan" },
  { id: 2, name: "María García", avatar: "https://via.placeholder.com/50?text=María" },
  { id: 3, name: "Carlos López", avatar: "https://via.placeholder.com/50?text=Carlos" },
];

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]); // Mensajes seleccionados para eliminar
  const [showOptions, setShowOptions] = useState(false); // Control de opciones (editar/eliminar)
  const [messageToEdit, setMessageToEdit] = useState(null); // Control de mensaje a editar
  const [blocked, setBlocked] = useState(false); // Bloquear/desbloquear

  const user = users.find((user) => user.id === parseInt(id));

  const sendMessage = (messageText, sender = "me") => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessage = { text: messageText, sender, time: timestamp, timestamp: Date.now() };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem(`chat-${id}`, JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, "me");
      setTimeout(() => {
        const response = generateResponse(newMessage);
        sendMessage(response, "them");
      }, 1000);
      setNewMessage("");
    }
  };

  // Función para eliminar varios mensajes
  const handleDeleteMessages = () => {
    const updatedMessages = messages.filter((msg, index) => !selectedMessages.includes(index));
    setMessages(updatedMessages);
    localStorage.setItem(`chat-${id}`, JSON.stringify(updatedMessages));
    setSelectedMessages([]);
  };

  const handleSelectMessage = (index) => {
    if (selectedMessages.includes(index)) {
      setSelectedMessages(selectedMessages.filter((i) => i !== index)); // Deseleccionar mensaje
    } else {
      setSelectedMessages([...selectedMessages, index]); // Seleccionar mensaje
    }
  };

  // Función para editar el último mensaje
  const handleEditMessage = (index) => {
    const lastMessageTime = messages[index].timestamp;
    const currentTime = Date.now();
    const timeDifference = (currentTime - lastMessageTime) / 60000; // Diferencia en minutos

    if (timeDifference <= 1) {
      setMessageToEdit(index);
      setNewMessage(messages[index].text);
    } else {
      alert("No podes editar este mensaje, ha pasado más de un minuto.");
    }
  };

  const handleSaveEdit = () => {
    const updatedMessages = [...messages];
    updatedMessages[messageToEdit].text = newMessage;
    setMessages(updatedMessages);
    localStorage.setItem(`chat-${id}`, JSON.stringify(updatedMessages));
    setMessageToEdit(null);
    setNewMessage("");
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    localStorage.setItem(`chat-${id}`, JSON.stringify(updatedMessages));
  };

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem(`chat-${id}`)) || [];
    setMessages(chatHistory);
  }, [id]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="contact-info">
          <img src={user.avatar} alt="avatar" className="contact-avatar" />
          <div className="contact-details">
            <h3>{user.name}</h3>
            <span className="contact-status">{blocked ? "Bloqueado" : "En línea"}</span>
          </div>
        </div>
        <button onClick={() => navigate("/home")}>Volver</button>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "me" ? "my-message" : "their-message"}>
            <div className="message-content">
              <p>{msg.text}</p>
              <span className="message-time">{msg.time}</span>
            </div>
            <div className="message-options">
              {msg.sender === "me" && (
                <button onClick={() => handleSelectMessage(index)}>
                  ⋮
                </button>
              )}
            </div>
            {selectedMessages.includes(index) && (
              <div className="edit-options">
                <button onClick={() => handleEditMessage(index)}>Editar</button>
                <button onClick={() => handleDeleteMessage(index)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={messageToEdit !== null ? handleSaveEdit : handleSendMessage}>
          {messageToEdit !== null ? "Guardar" : "Enviar"}
        </button>
      </div>

      {/* Eliminar múltiples mensajes */}
      {selectedMessages.length > 0 && (
        <div className="delete-messages">
          <button onClick={handleDeleteMessages}>Eliminar mensajes seleccionados</button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
