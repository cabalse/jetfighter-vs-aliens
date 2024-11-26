import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

import "./app.css";
import CONSTANTS from "./constants";
import Player from "./components/player/player";
import DetectKeyPress from "./framework/detect-key-press";
import Background from "./components/background";
import angleToVector from "./utilities/angle-to-vector";

const speed = 5;

function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [playeControls, setPlayerControls] = useState({
    rotateRight: false,
    rotateLeft: false,
    moveForward: false,
  });
  const [backgroundMovement, setBackgroundMovement] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  return (
    <>
      <div className="canvas-container">
        <DetectKeyPress
          onKeyPress={(key, value) => {
            if (key === "a")
              setPlayerControls((prev) => ({ ...prev, rotateLeft: value }));
            if (key === "d")
              setPlayerControls((prev) => ({ ...prev, rotateRight: value }));
            if (key === "w")
              setPlayerControls((prev) => ({ ...prev, moveForward: value }));
          }}
        />
        <Canvas orthographic={true}>
          <Suspense fallback={null}></Suspense>
          <Player
            rotateLeft={playeControls.rotateLeft}
            rotateRight={playeControls.rotateRight}
            onAngleChange={(angle) =>
              setBackgroundMovement(angleToVector(angle, speed))
            }
          />
          <Background
            move={playeControls.moveForward}
            movementX={backgroundMovement.x}
            movementY={backgroundMovement.y}
          />
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
