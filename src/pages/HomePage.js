import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && phoneNumber) {
      // Guardo los datos en localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("phoneNumber", phoneNumber);
      navigate("/home");
    } else {
      alert("Por favor, complete ambos campos.");
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <img 
          src="https://iconape.com/wp-content/files/zp/114427/svg/whatsapp-logo-icon-png-svg.png" 
          alt="WhatsApp Logo" 
          className="welcome-logo"
        />
        <h1>Bienvenido a WhatsApp Clone</h1>
        <p>Conéctate con tus amigos y familia.</p>
        
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="input-field"
            required 
          />
          <input 
            type="tel" 
            placeholder="Número de teléfono" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            className="input-field"
            required 
          />
          <button type="submit" className="start-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
