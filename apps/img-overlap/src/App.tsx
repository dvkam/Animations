import { useInView } from "@animations/demo-runtime";
import placeholder from "./placeholder.svg";
import styles from "./App.module.css";

const positions = ["left", "center", "right"];

export default function App() {
  const { ref, active } = useInView<HTMLElement>();
  return (
    <div className={styles.demo}>
      <p className={styles.spacer}>Scroll down to expand the image stack.</p>
      <div className={styles.stage}>
        <section
          ref={ref}
          className={styles.stack}
          data-active={active}
          aria-label="Three overlapping landscape cards expand in sequence as they enter view."
        >
          {positions.map((position) => (
            <figure key={position} className={styles.picture} data-position={position}>
              <img src={placeholder} alt="" width="350" height="250" />
            </figure>
          ))}
        </section>
      </div>
      <p className={styles.spacer}>Scroll up to replay.</p>
    </div>
  );
}
