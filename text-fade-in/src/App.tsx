import "./App.css";
import { TextAnimation } from "./TextAnimation";

export default function App() {
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate incidunt praesentium, rerum voluptatem in reiciendis officia harum repudiandae tempore suscipit ex ea, adipisci ab porro.";
  return (
    <div className="App">
      <TextAnimation text={text} />
    </div>
  );
}
