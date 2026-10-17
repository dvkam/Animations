import styles from "./App.module.css";

const text =
  "There are no limits to what you can accomplish, except the limits you place on your own thinking.";

export default function App() {
  return (
    <h2 className={styles.text} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className={styles.word}
          aria-hidden="true"
          style={{ animationDelay: `${(index + 1) / 10}s` }}
        >
          {word}{" "}
        </span>
      ))}
    </h2>
  );
}
