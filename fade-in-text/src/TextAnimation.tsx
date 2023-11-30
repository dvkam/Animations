import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
100% {
    opacity: 1;
    filter: blur(0);
  }
`;

const H1Style = styled.h1`
  max-width: 500px;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ChunksStyle = styled.span<{ order: number }>`
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
  animation: ${fadeIn} 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
  animation-delay: ${(props) => `${props.order}s`};
`;

export const TextAnimation = ({ text }: { text: string }) => {
  const words = text.split(" ");

  const chunks = words.map((word, index) => {
    // index + 1 - our index start from 1
    // 10 - number of decimal seconds in one second
    const count = (index + 1) / 10;

    return (
      <ChunksStyle key={index} order={count}>
        {word}
      </ChunksStyle>
    );
  });

  return <H1Style>{chunks}</H1Style>;
};
