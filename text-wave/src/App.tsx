import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const AnimatedTypography = styled(Typography)`
  & span {
    color: #fbbf2c;
    display: inline-block;
    animation: wave 2s infinite;
    animation-delay: calc(0.2s * var(--i));
  }

  @keyframes wave {
    0%,
    40%,
    100% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(-20px);
    }
  }
` as typeof Typography;

interface Styles extends React.CSSProperties {
  "--i": number;
}

function App() {
  const string = "TEXT-WAVE!";
  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ margin: "0px", fontWeight: "bold", fontSize: "4em" }}>
          Look at this
        </p>
        <AnimatedTypography
          component={"span"}
          sx={{ whiteSpace: "nowrap" }}
          variant={"h3"}
          fontWeight={"bold"}
        >
          {string.split("").map((char, index) => {
            const styles: Styles = {
              "--i": index + 1,
            };
            return (
              <span key={`${char}-${index}`} style={styles}>
                {char}
              </span>
            );
          })}
        </AnimatedTypography>
      </div>
    </div>
  );
}

export default App;
