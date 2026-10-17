import { useRef, type PointerEvent } from "react";
import styles from "./App.module.css";

export default function App() {
  const glow = useRef<HTMLSpanElement>(null);
  function trackPointer(event: PointerEvent<HTMLButtonElement>) {
    if (
      event.pointerType === "touch" ||
      !glow.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    glow.current.style.transform = `translate(${event.clientX - bounds.left}px, ${event.clientY - bounds.top}px)`;
  }
  return (
    <main className={styles.page}>
      <h1>Gradient Tracking Button</h1>
      <button type="button" className={styles.button} onPointerMove={trackPointer}>
        <span ref={glow} className={styles.position} aria-hidden="true">
          <span className={styles.glow} />
        </span>
        <span className={styles.label}>Hover me</span>
      </button>
    </main>
  );
}
