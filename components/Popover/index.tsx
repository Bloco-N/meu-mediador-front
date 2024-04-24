import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface PopoverProps {
  showArrow?: boolean;
  triggerNode: React.ReactNode;
  trigger: 'click' | 'hover';
  closeOnClick?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClickOutside?: () => void;
}

const PopoverContentWrapper = styled.div`
  background-color: #fff;
  background-clip: padding-box;
  position: absolute;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  outline: 0;

  ${(props: { showArrow?: boolean }) =>
    props.showArrow &&
    `
    margin-top: 10px;

    &::before, &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      right: 22px;
    }

    &::before {
      top: -10px;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 10px solid rgba(0, 0, 0, 0.15);
    }

    &::after {
      top: -8px;
      margin-left: 1px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #fff;
    }
  `}
`;

const PopoverContent: React.FC<any> = ({
  showArrow,
  className,
  style,
  onClickOutside,
  children,
}) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node && onClickOutside && !node.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [node, onClickOutside]);

  return (
    <PopoverContentWrapper
      ref={(ref) => setNode(ref)}
      className={className}
      style={style}
      showArrow={showArrow}
    >
      <div className="popover-inner">{children}</div>
    </PopoverContentWrapper>
  );
};

interface PopoverState {
  visible: boolean;
}

export const Popover: React.FC<any> = ({
  triggerNode,
  trigger,
  closeOnClick,
  onClickOutside,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const onShow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((prevState) => !prevState);
  };

  const handleClickOutside = () => {
    onClose();
    onClickOutside && onClickOutside();
  };

  return (
    <div className="popover">
      {triggerNode &&
        React.cloneElement(triggerNode as React.ReactElement, {
          onClick: trigger === 'click' || trigger === 'hover' ? onToggle : undefined,
          onMouseOver: trigger === 'hover' ? onShow : undefined,
        })}

      {visible && (
        <PopoverContent
          showArrow
          onClickOutside={handleClickOutside}
          closeOnClick={closeOnClick}
        >
          {children}
        </PopoverContent>
      )}
    </div>
  );
};

