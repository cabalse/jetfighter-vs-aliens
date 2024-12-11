import { act, useFrame, Vector3 } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import useTexture from "../../hooks/use-texture";
import ScreenObject from "../../framework/screen-object";
import Burner from "./burner";

import jetFighter from "../../assets/player/jet-top-down-grey.png";
import CONSTANTS from "../../constants";
import Lightning from "./ligtning";

const scale = 75;

type Props = {
  rotateRight: boolean;
  rotateLeft: boolean;
  onAngleChange: (angle: number) => void;
  fire: boolean;
  onFired: () => void;
  action: string;
  onActionEnd: () => void;
};

const Player = ({
  rotateRight,
  rotateLeft,
  onAngleChange,
  fire,
  onFired,
  action,
  onActionEnd,
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const [jetTexture, ratio, width, height] = useTexture(jetFighter);
  const [groupsScale, setGroupScale] = useState<Vector3>([1, 1, 1]);
  const [actionState, setActionState] = useState<string>("moving");

  useEffect(() => {
    setActionState(action);
  }, [action]);

  const reportCurrentAngle = () => {
    if (groupRef.current) {
      const angleInRadians = groupRef.current.rotation.z;
      const normalizedAngle = angleInRadians % (2 * Math.PI); // 90 degrees
      onAngleChange(normalizedAngle);
    }
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (actionState === "moving") {
        if (rotateRight) {
          groupRef.current.rotation.z -= CONSTANTS.MOVEMENT.PLAYER.TURN * delta;
          reportCurrentAngle();
        }
        if (rotateLeft) {
          groupRef.current.rotation.z += CONSTANTS.MOVEMENT.PLAYER.TURN * delta;
          reportCurrentAngle();
        }
      }
      if (actionState === "landing") {
        setGroupScale((prev: Vector3) => {
          let newScale = [...prev];
          if (prev[0] > 0.3) {
            newScale = [prev[0] - 0.02, prev[0] - 0.02, 1];
          } else {
            onActionEnd();
            setActionState("moving");
          }
          return newScale;
        });
      }
      if (actionState === "takingOff") {
        setGroupScale((prev) => {
          let newScale = [...prev];
          if (prev[0] < 1) {
            newScale = [prev[0] + 0.02, prev[0] + 0.02, 1];
          } else {
            onActionEnd();
            setActionState("moving");
          }
          return newScale;
        });
      }
    }
  });

  return (
    <group
      ref={groupRef}
      scale={groupsScale}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <group position={[0, 0, CONSTANTS.Z_POSITION.PLAYER]}>
        <ScreenObject
          dimensions={{ width: width, height: height }}
          position={[0, 0, 1]}
          scale={scale}
          texture={jetTexture}
          textureRatio={ratio}
        />
        <Lightning show={fire} onAnimationCycleEnd={onFired} />
        <Burner />
      </group>
    </group>
  );
};

export default Player;
