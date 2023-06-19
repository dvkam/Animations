import styled, { keyframes } from "styled-components";

const showTopText = keyframes`
  0% { transform: translate3d(0, 100% , 0); }
  40%, 60% { transform: translate3d(0, 50%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const showBottomText = keyframes`
  0% { transform: translate3d(0, -100%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const Section = styled.section`
  width: calc(100% + 10vmin);
  display: flex;
  flex-flow: column;
  padding: 2vmin 0;
  overflow: hidden;
  &:last-child {
    border-top: 1vmin solid black;
  }
`;

const Block = styled.div<{ numofline: number }>`
  position: relative;
`;
const TopAnimateBlock = styled(Block)`
  animation: ${showTopText} calc(0.5s * ${(props) => props.numofline}) forwards;
  animation-delay: 0.5s;
  transform: translateY(calc(100% * ${(props) => props.numofline}));
`;
const BottomAnimateBlock = styled(Block)<{ delaytopline: number }>`
  animation: ${showBottomText} calc(0.5s * ${(props) => props.numofline})
    forwards;
  animation-delay: calc(0.7s * ${(props) => props.delaytopline});
  transform: translateY(calc(-100% * ${(props) => props.numofline}));
`;

const TextStyle = styled.p<{ color: string }>`
  font-family: Roboto, Arial, sans-serif;
  font-size: 12vmin;
  color: ${(props) => props.color};
`;

export const TextAnimation = () => {
  return (
    <>
      <Section>
        <TopAnimateBlock numofline={2}>
          <TextStyle color="rgba(0, 0, 0, 0.5)">mimicking</TextStyle>
          <TextStyle color="#000">apple's design</TextStyle>
        </TopAnimateBlock>
      </Section>
      <Section>
        <BottomAnimateBlock numofline={1} delaytopline={2}>
          <TextStyle color="black">for the win!</TextStyle>
        </BottomAnimateBlock>
      </Section>
    </>
  );
};
