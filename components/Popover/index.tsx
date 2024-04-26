import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

const PopoverDemo:React.FC<any> = ({triggerNode,children,align}) => {
  const [open,setOpen] = useState(false)

  function closeOnTime(){
    setTimeout(() => {
        setOpen(!open)
    }, 1500);
  }
  
  return(
  <Popover.Root open={open}>
    <Popover.Trigger asChild>
      <button onMouseLeave={closeOnTime} onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)}>
        {triggerNode}
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content align={align} className="PopoverContent" sideOffset={5} data-side='top'>
        {children}
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)};

export default PopoverDemo;