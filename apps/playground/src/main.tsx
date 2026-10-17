import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import demos from "./demos.json";
import styles from "./playground.module.css";

function selectedSlug() {
  const slug = window.location.hash.slice(1);
  return demos.find((demo) => demo.slug === slug)?.slug ?? "apple-animation";
}

function Playground() {
  const previewRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [slug, setSlug] = useState(selectedSlug);
  const [revision, setRevision] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const demo = demos.find((item) => item.slug === slug);
  useEffect(() => {
    const update = () => setSlug(selectedSlug());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    document.title = `${demo?.title ?? "Animations"} | Animation playground`;
  }, [demo]);
  if (!demo) throw new Error("The selected demo is missing from the catalog.");
  const url = `./${demo.slug}/`;
  return (
    <div className={styles.shell}>
      <a
        className={styles.skip}
        href="#preview"
        onClick={(event) => {
          event.preventDefault();
          previewRef.current?.focus();
        }}
      >
        Skip to preview
      </a>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="#apple-animation">
          Animations<span>{demos.length} studies in motion</span>
        </a>
        <button
          ref={menuRef}
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="demo-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Choose a demo <span>{menuOpen ? "−" : "+"}</span>
        </button>
        <nav
          id="demo-navigation"
          aria-label="Animation demos"
          className={styles.navigation}
          data-open={menuOpen}
        >
          <p className={styles.label}>
            Index <span>01 / {String(demos.length).padStart(2, "0")}</span>
          </p>
          <ol>
            {demos.map((item, index) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  aria-current={slug === item.slug ? "page" : undefined}
                  onClick={() => {
                    setMenuOpen(false);
                    if (menuOpen) menuRef.current?.focus();
                  }}
                >
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.heading}>
          <h1>{demo.title}</h1>
          <p>{demo.description}</p>
        </header>
        <section
          id="preview"
          ref={previewRef}
          tabIndex={-1}
          aria-label="Interactive preview"
          className={styles.preview}
        >
          <div className={styles.toolbar}>
            <fieldset aria-label="Preview width">
              <button aria-pressed={!narrow} onClick={() => setNarrow(false)}>
                Fit
              </button>
              <button aria-pressed={narrow} onClick={() => setNarrow(true)}>
                390px
              </button>
            </fieldset>
            <div>
              <button onClick={() => setRevision(revision + 1)}>Reload preview</button>
              <a href={url} target="_blank" rel="noreferrer">
                Open demo <span className={styles.srOnly}>(new tab)</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={styles.stage}>
            <iframe
              key={`${slug}-${revision}`}
              className={styles.frame}
              data-narrow={narrow}
              src={url}
              title={`${demo.title} interactive demo`}
            />
          </div>
        </section>
        <p className={styles.instruction}>{demo.interaction}</p>
        <details className={styles.details} key={slug}>
          <summary>
            About this animation <span aria-hidden="true">+</span>
          </summary>
          <div className={styles.notes}>
            <section>
              <h2>How it works</h2>
              <p>{demo.how}</p>
            </section>
            <section>
              <h2>Motion and access</h2>
              <p>{demo.accessibility}</p>
              <p>
                The preview follows your system’s reduced motion setting. The 390px setting changes
                its width, not its input device.
              </p>
            </section>
          </div>
        </details>
        <footer className={styles.footer}>
          <a href={`https://github.com/dvkam/Animations/tree/HEAD/apps/${demo.slug}`}>
            Source and credits ↗
          </a>
        </footer>
      </main>
    </div>
  );
}
const root = document.getElementById("root");
if (!root) throw new Error("The playground root is missing.");
createRoot(root).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
