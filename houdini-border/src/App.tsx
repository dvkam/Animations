import "./App.css";
import styled from "styled-components";

const Houdini = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  padding: 2rem;
  margin: auto;

  display: grid;
  place-content: center;
  text-align: center;

  font-size: 1.5em;

  --border-size: 0.3rem;
  border: var(--border-size) solid transparent;

  /* Paint an image in the border */
  border-image: conic-gradient(
      from var(--angle),
      #d53e33 0deg 90deg,
      #fbb300 90deg 180deg,
      #377af5 180deg 270deg,
      #399953 270deg 360deg
    )
    1 stretch;
  background: rgb(255 255 255 / var(--opacity));

  @supports (background: paint(houdini)) {
    @property --opacity {
      syntax: "<number>";
      initial-value: 0.5;
      inherits: false;
    }

    @property --angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes opacityChange {
      to {
        --opacity: 1;
      }
    }

    @keyframes rotate {
      to {
        --angle: 360deg;
      }
    }

    & /*.rainbow*/ {
      animation: rotate 4s linear infinite, opacityChange 3s infinite alternate;
    }

    /* Hide the warning */
    .warning {
      display: none;
    }
  }
`;

function App() {
  return (
    <>
      <Houdini>
        <p>
          This demo uses a real border with <code>border-image</code>, a
          background, and finally Houdini to animate.
        </p>
      </Houdini>

      <div>
        <p>
          ⚠️ Not all browsers support{" "}
          <a href="https://web.dev/css-individual-transform-properties/">
            @property
          </a>{" "}
          so the animation might not work
          <br />
          Please use Chrome.
        </p>
      </div>
    </>
  );
}

export default App;
