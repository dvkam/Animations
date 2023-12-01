import React, { useEffect, useRef, useState } from "react";

const styles = {
  canvas: {
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✍️</text></svg>") 5 25,auto`,
  },
};

function App() {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(
    () => {
      // define the resize function, which uses the re
      const resize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      };

      // call resize() once.
      resize();

      // attach event listeners.
      window.addEventListener("resize", resize);

      // remove listeners on unmount.
      return () => {
        window.removeEventListener("resize", resize);
      };
    },
    [] // no dependencies means that it will be called once on mount.
  );

  return (
    <canvas
      style={styles.canvas}
      ref={canvasRef}
      onMouseDown={(e) => {
        // know that we are drawing, for future mouse movements.
        setIsDrawing(true);
        const context = e.currentTarget.getContext("2d");
        // begin path.
        if (context) {
          context.beginPath();
          context.lineWidth = 5;
          context.lineCap = "round";
          context.strokeStyle = "#ACD3ED";
          context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
      }}
      onMouseMove={(e) => {
        // only handle mouse moves when the mouse is already down.
        if (isDrawing) {
          const context = e.currentTarget.getContext("2d");
          if (context) {
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            context.stroke();
          }
        }
      }}
      onMouseUp={() => {
        // end drawing.
        setIsDrawing(false);
      }}
    />
  );
}

export default App;
