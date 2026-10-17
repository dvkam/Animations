import { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [active, setActive] = useState(false);
  return (
    <main className={styles.container}>
      <h1>Image Hover Effect</h1>
      <h2>3D Hover Effect</h2>
      <div className={styles.stage}>
        <button
          className={styles.card}
          type="button"
          aria-label="Lift the image"
          aria-pressed={active}
          data-active={active}
          onClick={() => setActive(!active)}
        />
      </div>
      <hr />
    </main>
  );
}
