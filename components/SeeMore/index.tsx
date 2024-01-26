import React, { useState } from 'react';

const SeeMoreButton = ({ children, maxHeight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const divStyle = {
    maxHeight: isExpanded ? 'none' : maxHeight,
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
  };

  const buttonStyle = {
    background: '#3498db',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <>
    <div style={divStyle}>
      {children}
    </div>
    <button style={buttonStyle} onClick={handleReadMoreClick}>
        {isExpanded ? 'See Less' : 'See More'}
      </button>
    </>
  );
};

export default SeeMoreButton;
