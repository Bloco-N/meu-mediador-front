import React from 'react';
import styled from 'styled-components';


const GoogleButton = styled.button`
  background-color: #FFFF;
  color: #000000;
  padding: 1em 1em;
  font-size: 0.8em;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 40%;
  min-width: 200px;
  font-size: 16px;
  margin-bottom: 1em;

  @media screen and (max-width: 400px) {
    width: 60%;
    font-size: 13px;
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
