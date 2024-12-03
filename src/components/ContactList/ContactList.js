import React from "react";

const ContactList = ({ contacts }) => {
  return (
    <div className="contactlist-container">
      <h2>Contactos</h2>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <div className="contact-avatar">
              <img src={contact.avatar} alt={contact.name} className="avatar" />
            </div>
            <div className="contact-info">
              <p>{contact.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
