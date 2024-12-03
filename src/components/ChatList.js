import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChatList.css";

// Lista de usuarios con sus fotos de perfil
const users = [
  {
    id: 1,
    name: "Juan Pérez",
    avatar: "https://via.placeholder.com/50?text=Juan",
  },
  {
    id: 2,
    name: "María García",
    avatar: "https://via.placeholder.com/50?text=María",
  },
  {
    id: 3,
    name: "Carlos López",
    avatar: "https://via.placeholder.com/50?text=Carlos",
  },
  
];

// Simulo los mensajes en el chat
const sampleMessages = {
  1: [
    { text: "como estas?", sender: "me", time: "10:30 AM" },
    { text: "Todo bien, ¿y vos?", sender: "them", time: "10:32 AM" },
  ],
  2: [
    { text: "bien y vos?", sender: "me", time: "9:45 AM" },
    { text: "Me alegra, todo super bien.", sender: "them", time: "9:46 AM" },
  ],
  3: [
    { text: "hola", sender: "me", time: "8:30 AM" },
    { text: "Hola, como estás?", sender: "them", time: "8:31 AM" },
  ],
};

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de busqueda

  useEffect(() => {
    // Convertir las horas de los mensajes en formato de 24 horas para poder ordenarlos
    const convertTo24HourFormat = (time) => {
      const [hour, minute] = time.split(":");
      const [amPm] = time.split(" ").slice(-1);
      let hour24 = parseInt(hour, 10);
      if (amPm === "PM" && hour24 !== 12) hour24 += 12;
      if (amPm === "AM" && hour24 === 12) hour24 = 0;
      return hour24 * 60 + parseInt(minute, 10); // Devuelve el tiempo en minutos
    };

    // Crea una lista de chats ordenados por el ultimo mensaje
    const chatList = users.map((user) => {
      const messages = sampleMessages[user.id];
      
      // Ordena los mensajes de cada usuario por tiempo
      messages.sort((a, b) => convertTo24HourFormat(b.time) - convertTo24HourFormat(a.time));
      
      const lastMessage = messages[0]; // El ultimo mensaje despues de ordenar
      return {
        ...user,
        lastMessage: lastMessage.text,
        time: lastMessage.time,
      };
    });

    setChats(chatList);
  }, []);

  // Filtrar los chats por nombre de usuario segun lo ingresado en la barra de busqueda
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chatlist-container">
      <div className="chatlist-header">
        <h1>Chats</h1>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="chatlist">
        {filteredChats.map((chat) => (
          <Link to={`/chat/${chat.id}`} key={chat.id} className="chat-item">
            <div className="chat-avatar">
              <img src={chat.avatar} alt={chat.name} className="avatar" />
            </div>
            <div className="chat-info">
              <div className="chat-header">
                <h3>{chat.name}</h3>
                <span className="chat-time">{chat.time}</span>
              </div>
              <p className="chat-last-message">{chat.lastMessage}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
