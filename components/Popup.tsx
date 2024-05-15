import * as React from "react";
import styled from "styled-components";

interface IPopup {
  qtdeCitys: number;
  cities: any;
  textPopupList?:string;
}

export default function SimplePopup({ qtdeCitys, cities,textPopupList }: IPopup) {
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
        {qtdeCitys}
      </Button>
      {open && (
        <StyledPopup
          id={id}
          style={{ top: position.top, left: position.left }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          <PopupBody>
            <div className="close" onClick={() => setOpen(false)}>
              <b>{textPopupList}</b>
              <CloseButton onClick={handleClose}>X</CloseButton>
            </div>
            <ul className="cities-list">
              {cities.map((city: any) => (
                <li key={city?.City?.id ? city?.City?.id : city?.Language?.id }>- {city?.City?.name ? city?.City?.name : city?.Language?.name }</li>
              ))}
            </ul>
          </PopupBody>
        </StyledPopup>
      )}
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const PopupBody = styled.div`
  width: max-content;
  /* min-width: 200px; */
  height: auto;
  padding: 10px;
  border-radius: 5px;
  background-color: #d3d2d2;
  font-size: 0.875rem;
  z-index: 5;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  list-style-type: none;
  gap: 3px;
  position: absolute;
  text-align: left;

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
    display: flex;
    flex-direction:row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    
  }

  @media (max-width: 768px) {
    right: 2px;
    width: 85%
  }
`;

const Button = styled.b`
  position: relative;
  text-decoration: none;
  display: inline-block;
  border: 1px solid toamto;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 1px;
    background-color: black;
  }

  &:hover:after {
    background-color: black;
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
  margin-top: 2px;
  margin-left:5px;
  color: #333;
  &:hover {
    color: #000;
  }
`;
