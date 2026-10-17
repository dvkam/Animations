# Canvas drawing

A canvas records a freehand stroke as you drag across it.

## How it works

Pointer coordinates define rounded blue strokes in the canvas 2D context. Pointer capture keeps a stroke active outside the canvas. Stored points restore the drawing after resize, and the backing resolution follows the display pixel ratio.

## Interaction

Press and drag with a mouse, pen, or finger. Select Clear drawing or Restart demo to erase the strokes.

## Accessibility

Drawing requires a pointer. Text instructions and a named drawing area describe the interaction. Pause autoplay does not stop drawing.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/canvas dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codepen.io/rebelchris/pen/wvGbEVQ)
- [Original source 2](https://codesandbox.io/s/react-canvas-drawing-8jj0fb?file=/src/App.tsx) The review could not fetch this page.
