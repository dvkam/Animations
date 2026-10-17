import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

export function useInView<T extends HTMLElement>(threshold = 0.75) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setActive(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, active };
}

function Demo({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  return (
    <>
      <fieldset className="demo-controls">
        <legend className="sr-only">Animation controls</legend>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "Resume autoplay" : "Pause autoplay"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPaused(false);
            setReplay(replay + 1);
          }}
        >
          Restart demo
        </button>
      </fieldset>
      <div className="demo-content" data-paused={paused} key={replay}>
        {children}
      </div>
    </>
  );
}

export function mountDemo(content: ReactNode) {
  const root = document.getElementById("root");
  if (!root) throw new Error("The demo requires a #root element.");
  createRoot(root).render(
    <StrictMode>
      <Demo>{content}</Demo>
    </StrictMode>,
  );
}
