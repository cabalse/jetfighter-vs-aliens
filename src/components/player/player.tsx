import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import useTexture from "../../hooks/use-texture";
import ScreenObject from "../../framework/screen-object";
import Burner from "./burner";

import jetFighter from "../../assets/player/jet-top-down-grey.png";

const scale = 75;

const Player = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [jetTexture, ratio, width, height] = useTexture(jetFighter);

  // Rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[200, 0, 0]} rotation={[0, 0, 0]}>
      <ScreenObject
        dimensions={{ width: width, height: height }}
        position={[0, 0, 0]}
        scale={scale}
        texture={jetTexture}
        textureRatio={ratio}
      />
      <Burner />
    </group>
  );
};

export default Player;
