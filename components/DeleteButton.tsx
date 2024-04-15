import React from 'react';
import styled from 'styled-components';
import IconTrash from '../public/icons-trash.png';

const DivButton = styled.div`
    border-radius: 100%;
    overflow: hidden;
    height: 60px;
    width: 60px;
    background: #c14341;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1em;
    cursor: pointer;

    @media only screen and (max-width: 760px) {
      height: 40px;
      width: 40px;
  }
`;

const ResponsiveImage = styled.img`
  width: 60%;
`;
interface TrashButtonProps {
  onClick: () => void;
}

const TrashButton = ({ onClick }:TrashButtonProps) => {
  return (
    <DivButton onClick={onClick}>
      <ResponsiveImage src={IconTrash.src} alt="Trash Icon" color='#b5b3b3' />
    </DivButton>
  );
};

export default TrashButton;
