import { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      className={styles.frame}
      data-active={active}
      aria-label="Rotate and zoom the image"
      aria-pressed={active}
      onClick={() => setActive(!active)}
    >
      <img
        src={`${import.meta.env.BASE_URL}landscape.jpg`}
        alt="Person wearing a knit hat and a brown jacket"
        width={600}
        height={800}
      />
    </button>
  );
}
