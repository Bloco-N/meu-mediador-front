import React from 'react';
import styled from 'styled-components';


const GoogleButton = styled.button`
  background-color: #FFFF;
  color: #000000;
  font-size: 1.6rem;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 1rem;
  text-overflow: ellipsis;
  white-space:nowrap;
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
