import styles from "./App.module.css";

export default function App() {
  const text = "TEXT-WAVE!";
  return (
    <main className={styles.page}>
      <h1>Look at this</h1>
      <p className={styles.wave}>
        <span className="sr-only">{text}</span>
        {Array.from(text).map((character, index) => (
          <span key={index} aria-hidden="true" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
            {character}
          </span>
        ))}
      </p>
    </main>
  );
}
