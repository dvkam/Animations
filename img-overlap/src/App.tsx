import "./App.css";
import { OverlappingImages } from "./OverlappingImages";

export default function App() {
  return (
    <div className="App">
      <section>
        <p>(scroll down!)</p>
      </section>
      <OverlappingImages />
      <section>
        <p>(scroll up!)</p>
      </section>
    </div>
  );
}
