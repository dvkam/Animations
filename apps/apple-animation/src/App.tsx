import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.demo}>
      <section className={styles.section} aria-label="mimicking apple's design">
        <div className={styles.top} aria-hidden="true">
          <p className={styles.muted}>mimicking</p>
          <p>apple's design</p>
        </div>
      </section>
      <section className={styles.section}>
        <p className={styles.bottom}>for the win!</p>
      </section>
    </div>
  );
}
