import { useRef, useEffect, useState, useMemo } from "react";
import styled, { css } from "styled-components";
import data from "./data";
export type TypePosition = "left" | "center" | "right";

interface IProps {
  position: TypePosition;
  active: boolean;
}

const Image = styled.img`
  width: 100%;
  height: auto;
`;

// Left image wrapper style with active, inactive state
const left = (active: boolean) => css`
  ${!active &&
  css`
    transform: rotate(-4deg) translateX(calc(-1 * clamp(25%, 20vw, 75%)));
  `}
  ${active &&
  css`
    transform: rotate(-6deg) translateX(calc(-1 * clamp(25%, 20vw, 75%)))
      scale(1.2);
  `}
  transition-delay: 0s;
  z-index: 1;
`;

// Center image wrapper style with active, inactive state
const center = (active: boolean) => css`
  ${active &&
  css`
    transform: scale(1.2);
  `}
  transition-delay: 0.1s;
  z-index: 2;
`;

// Right image wrapper style with active, inactive state
const right = (active: boolean) => css`
  ${!active &&
  css`
    transform: rotate(4deg) translateX(clamp(25%, 20vw, 75%));
  `}
  ${active &&
  css`
    transform: rotate(6deg) translateX(clamp(25%, 20vw, 75%)) scale(1.2);
  `}
  transition-delay: 0.2s;
  z-index: 1;
`;

// Image wrapper component with 2 props:
// position: left | center | right
// active:  true / false
const PictureWrapper = styled.figure<IProps>`
  grid-column: 1;
  grid-row: 1;
  width: clamp(200px, 40vw, 380px);
  display: flex;
  border: 1px solid #000;
  transition: transform 0.4s ease-in-out;
  ${({ position, active }) => position === "left" && left(active)}
  ${({ position, active }) => position === "center" && center(active)}
  ${({ position, active }) => position === "right" && right(active)}
`;

const Container = styled.section`
  display: grid;
  place-content: center;
  position: relative;
  margin: 0 50px;
`;

export const OverlappingImages = () => {
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

  const images = data.map((img) => {
    return (
      <PictureWrapper key={img.id} position={img.position} active={active}>
        <Image src={img.image} />
      </PictureWrapper>
    );
  });
  return <Container ref={ref}>{images}</Container>;
};
