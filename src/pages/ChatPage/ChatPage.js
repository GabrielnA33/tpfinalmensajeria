import React, { useState } from 'react';
import ContactList from '../../components/ContactList/ContactList';
import './ChatPage.css'; 

const ChatPage = () => {
  const [contacts, setContacts] = useState([
    { name: 'Juan', photo: '/path/to/photo1.jpg' },
    { name: 'María', photo: '/path/to/photo2.jpg' },
  ]);

  const handleAddContact = () => {
    const newContact = { name: 'Nuevo Contacto', photo: '/path/to/photo3.jpg' };
    setContacts([...contacts, newContact]);
  };

  const handleOpenChat = (contact) => {
    alert(`Abriendo chat con ${contact.name}`);
  };

  return (
    <div className="chat-page">
      <h1>Página de Chat</h1>
      <ContactList
        contacts={contacts}
        onAddContact={handleAddContact}
        onOpenChat={handleOpenChat}
      />
    </div>
  );
};

export default ChatPage;
