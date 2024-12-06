import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
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
};

const Player = ({
  rotateRight,
  rotateLeft,
  onAngleChange,
  fire,
  onFired,
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const [jetTexture, ratio, width, height] = useTexture(jetFighter);

  const reportCurrentAngle = () => {
    if (groupRef.current) {
      const angleInRadians = groupRef.current.rotation.z;
      const normalizedAngle = angleInRadians % (2 * Math.PI); // 90 degrees
      onAngleChange(normalizedAngle);
    }
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (rotateRight) {
        groupRef.current.rotation.z -= CONSTANTS.MOVEMENT.PLAYER.TURN * delta;
        reportCurrentAngle();
      }
      if (rotateLeft) {
        groupRef.current.rotation.z += CONSTANTS.MOVEMENT.PLAYER.TURN * delta;
        reportCurrentAngle();
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
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
