import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import "./app.css";
import CONSTANTS from "./constants";
import Player from "./components/player/player";

function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  return (
    <>
      <div className="canvas-container">
        <Canvas orthographic={true}>
          <Suspense fallback={null}></Suspense>
          <Player />
        </Canvas>
      </div>
      <canvas
        width={CONSTANTS.SCREEN_WIDTH}
        height={CONSTANTS.SCREEN_HEIGHT}
        ref={ref}
        style={{
          position: "absolute",
          top: "6px",
          left: "7px",
          border: "2px solid red",
        }}
      />
    </>
  );
}

export default App;
