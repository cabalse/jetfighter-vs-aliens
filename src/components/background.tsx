import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import useTexture from "../hooks/use-texture";

import cloud1 from "../assets/clouds/cloud-1.png";
import ScreenObject from "../framework/screen-object";

const scale = 75;

type Props = {
  move: boolean;
  movementX: number;
  movementY: number;
};

const Background = ({ move, movementX, movementY }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const [cloud1Texture, ratio, width, height] = useTexture(cloud1);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += movementX;
      groupRef.current.position.y += movementY;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <ScreenObject
        dimensions={{ width: width, height: height }}
        position={[0, 0, 0]}
        scale={scale}
        texture={cloud1Texture}
        textureRatio={ratio}
      />
    </group>
  );
};

export default Background;
