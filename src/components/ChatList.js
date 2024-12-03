import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContactList from './ContactList/ContactList';
import './ChatList.css';

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
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', avatar: '' });
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [image, setImage] = useState(null); // Estado para la imagen seleccionada

  useEffect(() => {
    const chatList = users.map((user) => {
      const messages = sampleMessages[user.id];
      messages.sort((a, b) => {
        return new Date(`1970-01-01T${b.time}`) - new Date(`1970-01-01T${a.time}`);
      });

      const lastMessage = messages[0];
      return {
        ...user,
        lastMessage: lastMessage.text,
        time: lastMessage.time,
      };
    });

    setChats(chatList);
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Maneja la adición de nuevos contactos
  const handleAddContact = () => {
    if (newContact.name) {
      const newId = users.length + contacts.length + 1;
      const newUser = {
        ...newContact,
        id: newId,
        avatar: image || `https://via.placeholder.com/50?text=${newContact.name.charAt(0)}`,
      };
      setContacts([...contacts, newUser]);
      setChats([
        ...chats,
        { ...newUser, lastMessage: "Nuevo contacto", time: "Ahora" },
      ]);
      setNewContact({ name: '', avatar: '' });
      setImage(null); // Limpiar la imagen después de agregar el contacto
      setShowModal(false); // Cerrar el modal después de agregar el contacto
    }
  };

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

      <button className="add-contact-btn" onClick={() => setShowModal(true)}>Agregar Contacto</button>

      {/* Modal para agregar un nuevo contacto */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agregar Nuevo Contacto</h2>
            <input
              type="text"
              placeholder="Nombre del contacto"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImage(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {image && <img src={image} alt="Vista previa" className="preview-image" />}
            <button onClick={handleAddContact}>Agregar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <ContactList
        contacts={contacts}
      />

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
