import * as React from "react";
import styled from "styled-components";
import infoCircler from '../public/info.svg'
import { useRouter } from "next/router";
import locales from "locales";
interface IPopup {
  qtdeCitys: number;
  cities: any;
}

export default function PopupClose() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const router = useRouter();
  const locale = router.locale;
  const t = locales[locale as keyof typeof locales];

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
              <h5>
                {t.popupInfo?.text}
              </h5>
            </div>
          </PopupBody>
        </StyledPopup>
      )}
    </div>
  );
}

const PopupBody = styled.div`
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

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
    height: 100%;
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
