import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Image from "mui-image";

const styles = {
  body: {
    background: "#ECECEC",
  },

  footer: {
    width: "50%",
    marginLeft: "25%",
    textAlign: "center",
    fontFamily: "Julius Sans One, sans-serif",
    marginTop: "24px",
  },

  container: {
    maxWidth: "720px",
    margin: "24px auto 48px auto",
  },

  h1: {
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
  },

  h2: {
    fontFamily: "Julius Sans One, sans-serif",
    fontSize: "2.5rem",
  },

  row: {
    marginTop: "12px",
  },

  column: {
    display: "inlin-block",
    textAlign: "center",
  },

  figure: {
    overflow: "hidden",
  },

  "a:hover": {
    textDecoration: "none",
  },

  "column img": {
    display: "block",
    width: "100%",
    height: "300px",
  },

  tdimension: {
    width: "300px",
    height: "300px",
    margin: "20px auto 40px auto",
    perspective: "1000px",
    a: {
      background:
        'url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/e8346826957515.56361c2106f3f.png")',
      display: "block",
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      transformStyle: "preserve-3d",
      transform: "rotateX(70deg)",
      transition: "all 0.8s",
    },
    "&:hover a": {
      transform: "rotateX(20deg)",
    },
    "a:after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "40px",
      background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))",
      transform: "rotateX(90deg)",
      transformOrigin: "bottom",
    },
  },
};

function App() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.row}>
        <Typography sx={styles.h1}>Image Hover Effect</Typography>
        <Typography sx={styles.h2}>3D Hover Effect</Typography>
      </Box>

      <Box sx={styles.row}>
        <Box sx={styles.tdimension}>
          <a href="#"></a>
        </Box>
        <Divider sx={{ padding: "1px" }} />
      </Box>
    </Box>
  );
}

export default App;
