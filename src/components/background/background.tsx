import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import Clouds from "./clouds";

type Props = {
  movementX: number;
  movementY: number;
};

const Background = ({ movementX, movementY }: Props) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += movementX;
      groupRef.current.position.y += movementY;
    }
  });

  const clouds = useMemo(() => {
    return <Clouds />;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {clouds}
    </group>
  );
};

export default Background;
