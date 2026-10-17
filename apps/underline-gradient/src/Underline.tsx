/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline text must fragment across lines; native buttons are atomic inline boxes. Keyboard activation is implemented below. */
import { useState, type ReactNode } from "react";
import styles from "./App.module.css";
export function Underline({ children, gradient }: { children: ReactNode; gradient: string }) {
  const [active, setActive] = useState(false);
  return (
    <span
      className={styles.underline}
      style={{ backgroundImage: gradient }}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      data-active={active}
      onClick={() => setActive(!active)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActive(!active);
        }
      }}
    >
      {children}
    </span>
  );
}
