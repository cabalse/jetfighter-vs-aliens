import * as THREE from "three";

import ANIMATION_NAMES from "../../constants/animation-names";
import AnimatedScreenObject from "../../framework/animated-screen-object";
import useTexture from "../../hooks/use-texture";

import { useLoader } from "@react-three/fiber";

import powerBarTop from "../../assets/power-bar/triangle_bar_top.png";
import powerBarMid from "../../assets/power-bar/triangle_bar_mid.png";
import powerBarBackground from "../../assets/power-bar/triangle_bar_back.png";
import mask from "../../assets/power-bar/mask.png";
import CONSTANTS from "../../constants";
import { useEffect, useRef } from "react";

const scale = 75;

type Props = {
  value: number;
};

const PowerBar = ({ value }: Props) => {
  const midMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const [topTexture, ratio, ,] = useTexture(powerBarTop);
  const [midTexture, , ,] = useTexture(powerBarMid);
  const [backTexture, , ,] = useTexture(powerBarBackground);

  const maskTexture = useLoader(THREE.TextureLoader, mask);

  useEffect(() => {
    if (midMaterialRef.current) {
      maskTexture.offset.x = 1 - value / 100;
    }
  }, [value]);

  return (
    <>
      <group position={[225, -190, CONSTANTS.Z_POSITION.PLAYER]}>
        <mesh>
          <planeGeometry args={[ratio * scale, scale]} />
          <meshBasicMaterial map={backTexture} transparent={true} />
        </mesh>
        <mesh>
          <planeGeometry args={[ratio * scale, scale]} />
          <meshBasicMaterial
            ref={midMaterialRef}
            map={midTexture}
            transparent={true}
            alphaMap={maskTexture}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[ratio * scale, scale]} />
          <meshBasicMaterial map={topTexture} transparent={true} />
        </mesh>
      </group>
    </>
  );
};

export default PowerBar;
