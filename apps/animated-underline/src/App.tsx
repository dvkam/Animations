import { useInView } from "@animations/demo-runtime";
import styles from "./App.module.css";

export default function App() {
  const { ref, active } = useInView<HTMLHeadingElement>();
  return (
    <div className={styles.demo}>
      <p className={styles.spacer}>Scroll down to draw the underline.</p>
      <h2 ref={ref} className={styles.title}>
        Animated{" "}
        <span className={styles.word}>
          Underline!
          <svg className={styles.underline} aria-hidden="true" viewBox="0 0 174 15" fill="none">
            <path
              className={styles.path}
              data-active={active}
              d="M2.184 7.404c17.923 0 24.462-2.474 40.922-2.943 8.028-.229 59.438-1.148 64.175-1.368 14.133-.657 36.013-1.744 62.608 4.311 8.092 1.843-25.485-.13-36.391 1.046-15.655 1.69-32.732 2.346-49.015 2.85-13.589.421-53.558.512-64.376.786"
            />
          </svg>
        </span>
      </h2>
      <p className={styles.spacer}>Scroll up to replay.</p>
    </div>
  );
}
