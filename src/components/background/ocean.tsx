import * as THREE from "three";
import { useRef } from "react";
import useTexture from "../../hooks/use-texture";

import ocean from "../../assets/ocean";
import CONSTANTS from "../../constants";

const scale = 10000;

const Ocean = () => {
  const [texture, ratio, ,] = useTexture(ocean);
  const materialRef = useRef(null);
  const rotationRef = useRef<THREE.Group>(null);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <group
      ref={rotationRef}
      position={[0, 0, CONSTANTS.Z_POSITION.BACKGROUND]}
      rotation={[0, 0, 0]}
    >
      <mesh>
        <planeGeometry args={[scale * ratio, scale]} />
        <meshBasicMaterial ref={materialRef} map={texture} transparent={true} />
      </mesh>
    </group>
  );
};

export default Ocean;
