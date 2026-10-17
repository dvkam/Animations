import styles from "./App.module.css";

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate incidunt praesentium, rerum voluptatem in reiciendis officia harum repudiandae tempore suscipit ex ea, adipisci ab porro.";
const words = text.split(" ");
const animatedWords = words.map((word, index) => ({
  word,
  offset: words
    .slice(0, index)
    .reduce((length, previous) => length + Array.from(previous).length + 1, 0),
}));

export default function App() {
  return (
    <p className={styles.text}>
      <span className={styles.accessibleText}>{text}</span>
      {animatedWords.map(({ word, offset }, wordIndex) => (
        <span key={wordIndex} className={styles.word} aria-hidden="true">
          {Array.from(word).map((letter, index) => (
            <span
              key={index}
              className={styles.letter}
              style={{ animationDelay: `${6 * (offset + index + 1)}ms` }}
            >
              {letter}
            </span>
          ))}{" "}
        </span>
      ))}
    </p>
  );
}
