import React, { Children, ReactNode } from 'react';
import { text } from 'stream/consumers';
import styled from 'styled-components';


const GoogleButton = styled.button`
  background-color: #FFFF;
  color: #000000;
  padding: 1em 1em;
  font-size: 1.6rem;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 40%;
  min-width: 200px; /* Largura mínima para evitar que o botão fique muito estreito */

  @media screen and (max-width: 400px) {
    width: 60%;
  }
  @media screen and (max-width: 1400px) {
    width: 70%;
  }
`;

const GoogleLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

interface GoogleLoginButtonProps {
    onClick: () => void;
    icon: string;
    text: string;
  }

  const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick , icon , text}) => {
    return (
        <GoogleButton onClick={onClick}>
            <GoogleLogo src={icon} alt="Google Logo" />
            {text}
      </GoogleButton>
    );
  };
  
  export default GoogleLoginButton;
