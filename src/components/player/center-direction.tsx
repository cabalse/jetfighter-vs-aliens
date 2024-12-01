import * as THREE from "three";

import { useRef } from "react";
import useTexture from "../../hooks/use-texture";
import spritesheetOffset from "../../utilities/spritesheet-offset";
import arrows from "../../assets/arrows";
import { useFrame } from "@react-three/fiber";

type Props = {
  position: [number, number, number];
  angle: number;
};

const CenterDirection = ({ position, angle }: Props) => {
  const [texture, , ,] = useTexture(arrows);
  const materialRef = useRef(null);
  const rotationRef = useRef<THREE.Group>(null);

  const scale = 75;

  const [offsetX, offsetY, repeatX, repeatY] = spritesheetOffset(
    3750,
    3750,
    750,
    750,
    1,
    0
  );

  texture.repeat.set(repeatX, repeatY);
  texture.offset.set(offsetX, offsetY);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  useFrame(() => {
    if (rotationRef.current) {
      rotationRef.current.rotation.z = angle;
    }
  });

  return (
    <group ref={rotationRef} position={position} rotation={[0, 0, 0]}>
      <mesh>
        <planeGeometry args={[scale, scale]} />
        <meshBasicMaterial ref={materialRef} map={texture} transparent={true} />
      </mesh>
    </group>
  );
};

export default CenterDirection;
