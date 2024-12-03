import React from 'react';
import './ContactList.css';  

const ContactList = ({ contacts, onAddContact, onOpenChat }) => {
  return (
    <div className="contact-list">
      <h2>Lista de Contactos</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} onClick={() => onOpenChat(contact)} className="contact-item">
            <img src={contact.photo || '/path/to/default-photo.jpg'} alt="Foto de perfil" className="contact-photo" />
            <span>{contact.name}</span>
          </li>
        ))}
      </ul>
      <button onClick={onAddContact} className="add-contact-btn">Agregar Contacto</button>
    </div>
  );
};

export default ContactList;
