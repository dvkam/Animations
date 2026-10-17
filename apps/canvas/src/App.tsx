import { useEffect, useRef, type PointerEvent } from "react";
import styles from "./App.module.css";

type Point = { x: number; y: number };
type Stroke = Point[];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const drawing = useRef<{ pointerId: number; stroke: Stroke } | null>(null);

  function point(event: PointerEvent<HTMLCanvasElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function paint(context: CanvasRenderingContext2D, from: Point, to: Point) {
    context.beginPath();
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "#ACD3ED";
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      for (const stroke of strokes.current) {
        stroke.forEach((current, index) => {
          const previous = stroke[index - 1] ?? current;
          paint(context, previous, current);
        });
      }
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    resize();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  function stop(event: PointerEvent<HTMLCanvasElement>) {
    if (drawing.current?.pointerId !== event.pointerId) return;
    drawing.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <main className={styles.page}>
      <header>
        <h1>Canvas drawing</h1>
        <p id="drawing-help">
          Draw with a mouse, pen, or finger. Resizing keeps your strokes. Restart or clear to erase
          them.
        </p>
        <button
          type="button"
          onClick={() => {
            strokes.current = [];
            drawing.current = null;
            const canvas = canvasRef.current;
            const context = canvas?.getContext("2d");
            if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
          }}
        >
          Clear drawing
        </button>
      </header>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        aria-label="Freehand drawing area"
        aria-describedby="drawing-help"
        onPointerDown={(event) => {
          if (drawing.current || !event.isPrimary || event.button !== 0) return;
          const start = point(event);
          const stroke = [start];
          strokes.current.push(stroke);
          drawing.current = { pointerId: event.pointerId, stroke };
          event.currentTarget.setPointerCapture(event.pointerId);
          const context = event.currentTarget.getContext("2d");
          if (context) paint(context, start, { x: start.x + 0.01, y: start.y });
        }}
        onPointerMove={(event) => {
          const current = drawing.current;
          if (!current || current.pointerId !== event.pointerId) return;
          const next = point(event);
          const previous = current.stroke.at(-1);
          const context = event.currentTarget.getContext("2d");
          if (previous && context) paint(context, previous, next);
          current.stroke.push(next);
        }}
        onPointerUp={stop}
        onPointerCancel={stop}
        onLostPointerCapture={stop}
      >
        Freehand drawing requires a browser with canvas support. Use Clear drawing to erase the
        canvas.
      </canvas>
    </main>
  );
}
