import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import Clouds from "./clouds";

type Props = {
  movementX: number;
  movementY: number;
  onMove: (x: number, y: number) => void;
};

const Background = ({ movementX, movementY, onMove }: Props) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x += movementX * delta;
      groupRef.current.position.y += movementY * delta;
      onMove(groupRef.current.position.x, groupRef.current.position.y);
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
