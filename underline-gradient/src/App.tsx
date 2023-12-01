import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Underline } from "./Underline";
import useGradient from "./useGradient";

const Heading = styled(Typography)`
  font-family: "Playfair Display", serif;
  font-size: 10vw;
  @media screen and (min-width: 40em) {
    font-size: 6vw;
  }
`;
const Subheading = styled(Typography)`
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  @media screen and (min-width: 40em) {
    font-size: 1.75vw;
  }
`;

export default function App() {
  const gradient = useGradient();
  return (
    <div className="App">
      <Box>
        <Heading>
          Look At This <Underline gradient={gradient}>Pretty</Underline>{" "}
          Underline
        </Heading>
        <Subheading>
          Wow this one is super incredibly cool, and this{" "}
          <Underline gradient={gradient}>one is on Multiple Lines!</Underline> I
          wish I had found this like thirty projects ago when I was representing
          the lollipop guild.
        </Subheading>
      </Box>
    </div>
  );
}
