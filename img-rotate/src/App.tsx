import React from "react";
import { Box } from "@mui/material";

const boxSx = {
  overflow: "hidden",
  margin: "8px",
  minWidth: "240px",
  maxWidth: "320px",
  width: "100%",

  "& > img": {
    transition: "all 0.3s",
    boxSizing: "border-box",
    maxWidth: "100%",
  },

  "&:hover > img": {
    transform: "scale(1.3) rotate(5deg)",
  },
};

function App() {
  return (
    <Box sx={boxSx}>
      <img src="https://picsum.photos/id/669/600/800.jpg" />
    </Box>
  );
}

export { App };
