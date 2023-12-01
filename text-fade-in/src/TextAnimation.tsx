import styled, { keyframes } from "styled-components";

const an = keyframes`
  100% { opacity: 1; transform: translate3d(0, 0, 0) }
`;

const Section = styled.section`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
`;

const TextStyle = styled.span<{ color: string; delay: number }>`
  animation: ${an} 1s ease-out forwards;
  animation-delay: ${(props) => props.delay}ms;
  color: ${(props) => props.color};
  font-size: 2em;
  line-height: 1.3;
  opacity: 0;
  transform-style: perspective(500px);
  transform: translate3d(-35px, -40px, -150px) rotate3d(1, -1, 0, 35deg);
`;

const DELAY = 6; // ms
export const TextAnimation = ({ text }: { text: string }) => {
  // Splitting text on each character and return an array of HTML nodes.
  const letters = text.split("").map((letter, index) => {
    // Calculate delay for each sign
    const delayCounter = DELAY * (index + 1);

    return (
      <TextStyle key={index} delay={delayCounter} color="white">
        {letter === " " ? <>&nbsp;</> : letter}
      </TextStyle>
    );
  });

  return <Section>{letters}</Section>;
};
