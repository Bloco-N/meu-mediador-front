import React, { useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

const PopoverBase:React.FC<any> = ({ triggerNode,children,align,autoClose = true }) => {
  const [open,setOpen] = useState(false)
  const clickedRef = useRef(false);
  function closeOnTime(){
    if(!autoClose) return
    setTimeout(() => {
        setOpen(!open)
    }, 1500);
  }


  const handleMouseLeave = () => {
    if (!clickedRef.current) {
      setOpen(false);
    }
    clickedRef.current = false;
  };

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
    clickedRef.current = true;
  };

  
  return(
  <Popover.Root open={open}>
    <Popover.Trigger asChild>
      <button onMouseEnter={() => setOpen(true)} onClick={() => handleClick()}>
        {triggerNode}
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content onMouseLeave={closeOnTime} align={align} className="PopoverContent" sideOffset={5} data-side='top'>
        {children}
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)};

export default PopoverBase;