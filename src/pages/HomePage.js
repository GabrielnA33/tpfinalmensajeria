import React from "react";
import ChatList from "../components/ChatList";
import { Link } from "react-router-dom";
import "./HomePage.css";  

const HomePage = () => {
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
        <Link to="/home" className="start-button">Comenzar</Link>
      </div>
    </div>
  );
};


export default HomePage;
