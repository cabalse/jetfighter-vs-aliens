import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const SetOceanBackground = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color("#0099cc");
  }, [scene]);

  return null;
};

export default SetOceanBackground;
