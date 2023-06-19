import "./App.css";
import { useRef, useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import { Underline } from "./Underline";

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const TitleStyle = styled(Typography)`
  font-size: 42px;
  text-align: center;
`;

export default function App() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setActive(entry.isIntersecting);
      return;
    }
    setActive(false);
  };

  const options = useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: 0.75,
    }),
    []
  );

  useEffect(() => {
    const container = ref.current;
    // Observer with external callback function and options
    const observer = new IntersectionObserver(callback, options);
    if (container) observer.observe(container);

    //cleanup when a component unmounted
    return () => {
      if (container) observer.unobserve(container);
    };
  }, [ref, options]);

  // Dummy scroll data
  const scrollDown = new Array(9)
    .fill("SCROLL DOWN")
    .map((el, index) => <TitleStyle key={index}>{el}</TitleStyle>);

  const scrollUp = new Array(9)
    .fill("SCROLL UP")
    .map((el, index) => <TitleStyle key={index}>{el}</TitleStyle>);

  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <div className="App">
        {scrollDown}
        <Box>
          <TitleStyle ref={ref}>
            Animated
            <LinkStyle href="#" color="inherit">
              Underline!{" "}
              <Underline color="#fb9f18" time={1} trigger={active} size={4} />
            </LinkStyle>
          </TitleStyle>
        </Box>
        {scrollUp}
      </div>
    </div>
  );
}
