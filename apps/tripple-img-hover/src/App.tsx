import { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      className={styles.stack}
      data-active={active}
      aria-label="Fan out the three pictures"
      aria-pressed={active}
      onClick={() => setActive(!active)}
    >
      {[1, 2, 3].map((number) => (
        <img
          key={number}
          src={`${import.meta.env.BASE_URL}placeholder.svg`}
          width={150}
          height={150}
          alt=""
        />
      ))}
    </button>
  );
}
