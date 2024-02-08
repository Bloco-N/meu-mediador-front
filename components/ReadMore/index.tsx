import React, { useState, useEffect } from 'react';

const ReadMoreButton = ({ text, maxChars, style }:{text: string, maxChars: number, style?: any}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (text.length <= maxChars) {
      setDisplayText(text);
    } else {
      setDisplayText(isExpanded ? text : text.slice(0, maxChars) + '...');
    }
  }, [text, maxChars, isExpanded]);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const divStyle = {
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
    ...style,
  };

  return (
    <>
    <div style={divStyle}>
      {displayText}
    </div>
    {text.length > maxChars && (
        <button style={buttonStyle} onClick={handleReadMoreClick}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </>
  );
};

export default ReadMoreButton;