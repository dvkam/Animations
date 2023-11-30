import { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Button, SxProps } from "@mui/material";
import "./App.css";

const StyledButton = styled(Button)<{ left: number; top: number }>`
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;

  &:before {
    content: "";
    left: ${({ left }) => left}px;
    top: ${({ top }) => top}px;
    position: absolute;
    width: 0;
    height: 0;
    background: radial-gradient(circle closest-side, pink, transparent);
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
  }

  &:hover:before {
    color: red;
    width: 200px;
    height: 200px;
  }
`;

const SubmitButton = (props: {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}) => {
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    top: 0,
  });

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;

    setHoverStyle({ left, top });
  };

  return (
    <StyledButton
      left={hoverStyle.left}
      top={hoverStyle.top}
      type="submit"
      variant="contained"
      sx={props.sx}
      onMouseMove={handleMouseMove}
    >
      <span>Hover me</span>
    </StyledButton>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Gradient Tracking Button</h1>
      <SubmitButton />
    </div>
  );
}
