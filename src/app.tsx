import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import CONSTANTS from "./constants";
import Player from "./components/player/player";
import DetectKeyPress from "./framework/detect-key-press";
import Background from "./components/background/background";
import angleToVector from "./utilities/angle-to-vector";
import PowerBar from "./components/player/power-bar";

import "./app.css";
import useExecuteByInterval from "./hooks/use-execute-by-interval";
import CenterDirection from "./components/player/center-direction";
import angleToOrigin from "./utilities/angle-to-origin";

function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState({
    rotateRight: false,
    rotateLeft: false,
    moveForward: false,
    action: "moving",
    fire: false,
    score: 0,
    health: 100,
    energy: CONSTANTS.PLAYER.MAX_ENERGY,
    gameOver: false,
  });

  const [backgroundMovement, setBackgroundMovement] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const [directionToCenter, setDirectionToCenter] = useState(0);

  useEffect(() => {
    setDirectionToCenter(
      angleToOrigin(backgroundPosition.x, backgroundPosition.y) - Math.PI / 2
    );
  }, [backgroundPosition]);

  const turnRight = (value: boolean) => {
    setGameState((prev) => {
      const newState = structuredClone(prev);
      newState.rotateRight = value;
      return { ...prev, rotateRight: value };
    });
  };

  const turnLeft = (value: boolean) => {
    setGameState((prev) => {
      const newState = structuredClone(prev);
      newState.rotateLeft = value;
      console.log(newState);
      return { ...prev, rotateLeft: value };
    });
  };

  const land = () => {
    setGameState((prev) => {
      const newState = structuredClone(prev);
      newState.rotateLeft = false;
      newState.rotateRight = false;
      newState.fire = false;
      newState.action = "landing";

      return newState;
    });
  };

  const takeOff = () => {
    setGameState((prev) => {
      const newState = structuredClone(prev);
      newState.rotateLeft = false;
      newState.rotateRight = false;
      newState.fire = false;
      newState.action = "takingOff";

      return newState;
    });
  };

  const resetActions = () => {
    setGameState((prev) => {
      const newState = structuredClone(prev);
      newState.rotateLeft = false;
      newState.rotateRight = false;
      newState.fire = false;
      newState.action = "moving";

      return newState;
    });
  };

  const PlayerFire = () => {
    setGameState((prev) => {
      if (prev.energy <= 0) return prev;

      const newState = structuredClone(prev);
      newState.fire = true;
      newState.energy = prev.energy - CONSTANTS.PLAYER.ENERGY_PER_SHOT;
      return newState;
    });
  };

  const PlayerFired = () => {
    setGameState((prev) => {
      const newState = structuredClone(prev);
      newState.fire = false;
      return newState;
    });
  };

  // Reload Energy
  useExecuteByInterval(CONSTANTS.PLAYER.ENERGY_RELOAD_INTERVAL, () => {
    setGameState((prev) => {
      if (prev.energy >= CONSTANTS.PLAYER.MAX_ENERGY) return prev;
      const newState = structuredClone(prev);
      newState.energy = prev.energy + CONSTANTS.PLAYER.ENERGY_RELOAD;
      if (newState.energy > CONSTANTS.PLAYER.MAX_ENERGY) newState.energy = 100;
      return newState;
    });
  });

  return (
    <>
      <div className="canvas-container">
        <DetectKeyPress
          onKeyPress={(key, value) => {
            if (key === "a") turnLeft(value);
            if (key === "d") turnRight(value);
            if (key === "l") land();
            if (key === "t") takeOff();
            if (key === " ") PlayerFire();
          }}
        />
        <Canvas orthographic={true} camera={{ zoom: 1, position: [0, 0, 10] }}>
          <Suspense fallback={null}></Suspense>
          <Player
            rotateLeft={gameState.rotateLeft}
            rotateRight={gameState.rotateRight}
            onAngleChange={(angle) =>
              setBackgroundMovement(
                angleToVector(angle, CONSTANTS.MOVEMENT.PLAYER.SPEED)
              )
            }
            fire={gameState.fire}
            onFired={PlayerFired}
            action={gameState.action}
            onActionEnd={resetActions}
          />
          <CenterDirection
            position={[-320, -180, CONSTANTS.Z_POSITION.PLAYER]}
            angle={directionToCenter}
          />
          <PowerBar value={gameState.energy} />
          <Background
            movementX={-backgroundMovement.x}
            movementY={-backgroundMovement.y}
            onMove={(x, y) => {
              setBackgroundPosition({ x, y });
            }}
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
