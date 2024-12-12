import * as THREE from "three";
import { useRef } from "react";
import useTexture from "../../hooks/use-texture";

import carrier from "../../assets/carrier";

const scale = 70;

const Carrier = () => {
  const [texture, ratio, ,] = useTexture(carrier);
  const materialRef = useRef(null);
  const rotationRef = useRef<THREE.Group>(null);

  return (
    <group ref={rotationRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <mesh>
        <planeGeometry args={[scale * ratio, scale]} />
        <meshBasicMaterial ref={materialRef} map={texture} transparent={true} />
      </mesh>
    </group>
  );
};

export default Carrier;
