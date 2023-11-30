import "./App.css";
import { TextAnimation } from "./TextAnimation";

export default function App() {
  const text =
    "There are no limits to what you can accomplish, except the limits you place on your own thinking.";
  return (
    <>
      <TextAnimation text={text} />
    </>
  );
}
