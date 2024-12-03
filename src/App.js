import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Ruta de la pagina de bienvenida
import ChatPage from "./pages/ChatPage";  // Ruta de la pagina de chat
import ChatList from "./components/ChatList";  // Ruta de la lista de chats

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Pagina de bienvenida */}
        <Route path="/home" element={<ChatList />} />  {/* Pagina de chats */}
        <Route path="/chat/:id" element={<ChatPage />} />  {/* Pagina de chat individual */}
      </Routes>
    </Router>
  );
};
const users = [
  {
    id: 1,
    name: "Juan Pérez",
    avatar: "https://via.placeholder.com/50?text=Juan", // URL de foto de perfil
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

export default App;
