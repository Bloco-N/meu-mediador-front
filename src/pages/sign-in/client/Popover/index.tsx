import React, { useState } from 'react';
import styled from 'styled-components';

interface PopoverProps {
  content?: any;
  children:any;
}

// Styled component for the popover container
const PopoverContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Styled component for the popover content
const PopoverContent = styled.div<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: absolute;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

// Styled component for the popover trigger
const PopoverTrigger = styled.span`
  cursor: pointer;
`;

const Popover: React.FC<PopoverProps> = ({ content, children }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <PopoverContainer>
      <PopoverTrigger onClick={toggleVisibility}>{children}</PopoverTrigger>
      <PopoverContent visible={visible}>{content}</PopoverContent>
    </PopoverContainer>
  );
};

export default Popover;
