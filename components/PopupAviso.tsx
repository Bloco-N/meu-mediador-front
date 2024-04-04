import * as React from "react";
import styled from "styled-components";
import infoCircler from '../public/info.svg'
interface IPopup {
  qtdeCitys: number;
  cities: any;
}

export default function PopupClose() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setOpen(true);
    setPosition({ top: top + height, left });
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={infoCircler.src} alt="" width={30}/>
      </Button>
      {open && (
        <StyledPopup
          id={id}
          style={{ top: position.top, left: position.left }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          <PopupBody>
            <div className="close">
              <b>Serviço validado por clientes cadastrados no Meoagent. 
              <br/>
                A agência pode ter resultados superiores e 
                <br/>
                que ainda não foram validados na plataforma.</b>
            </div>
          </PopupBody>
        </StyledPopup>
      )}
    </div>
  );
}

const PopupBody = styled.div`
  width: max-content;
  height: 20%;
  padding: 10px;
  border-radius: 5px;
  background-color: #d3d2d2;
  font-size: 0.875rem;
  z-index: 99999;
  gap: 3px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  b {
    font-size: 16px;
  }

  li {
    font-size: 14px;
  }

  ul{
    margin-top: 5px;
  }

  .cities-list {
    overflow-y: auto;
    max-height: 290px;
  }

  .close {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    right: 2px;
    width: 85%;
    height: 23%;
  }
`;

const Button = styled.b`
  position: relative;
  text-decoration: none;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 1px
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledPopup = styled.div`
  &.MuiPaper-root {
    margin-top: 8px;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  border: none;
  background: none;
  font-size: 14px;
  margin-top: 5px;
  color: #333;
  &:hover {
    color: #000;
  }
`;
