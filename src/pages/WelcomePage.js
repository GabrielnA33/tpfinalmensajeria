import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src="https://iconape.com/wp-content/files/zp/114427/svg/whatsapp-logo-icon-png-svg.png" alt="WhatsApp Clone" />
      <Button onClick={() => navigate('/chats')}>Comenzar</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #128c7e;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #25d366;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default WelcomePage;
