import styles from "./App.module.css";

export default function App() {
  const text = "Lorem ipsum dolor sit amet.";
  return (
    <main className={styles.page}>
      <h1>Automatic Typewriter</h1>
      <div className={styles.typewriter}>
        <span className="sr-only">{text}</span>
        <span
          aria-hidden="true"
          className={styles.text}
          style={{ animationTimingFunction: `steps(${text.length})` }}
        >
          {text}
        </span>
      </div>
    </main>
  );
}
