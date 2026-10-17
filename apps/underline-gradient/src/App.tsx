import { useState } from "react";
import { gradients } from "./gradients";
import { Underline } from "./Underline";
import styles from "./App.module.css";
export default function App() {
  const [gradient] = useState(
    () => gradients[Math.floor(Math.random() * gradients.length)] ?? gradients[0],
  );
  return (
    <main className={styles.page}>
      <h1>
        Look At This <Underline gradient={gradient}>Pretty</Underline> Underline
      </h1>
      <p>
        Wow this one is super incredibly cool, and this{" "}
        <Underline gradient={gradient}>one is on Multiple Lines!</Underline> I wish I had found this
        like thirty projects ago when I was representing the lollipop guild.
      </p>
    </main>
  );
}
