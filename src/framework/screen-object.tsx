import { useEffect, useState } from "react";
import { Texture } from "three";
import { Body, Box, System } from "detect-collisions";

import useToDetectCoords from "../hooks/use-to-detect-coords";
import CONSTANTS from "../constants";

type Props = {
  dimensions: { width: number; height: number };
  position: [number, number, number];
  scale: number;
  texture: Texture;
  textureRatio: number;
  detection?: System<Body>;
};

const ScreenObject = ({
  dimensions,
  position,
  scale,
  texture,
  textureRatio,
  detection,
}: Props) => {
  const [, setDetectionZone] = useState<Box>();

  const calcDetectCoords = useToDetectCoords(
    CONSTANTS.SCREEN_WIDTH,
    CONSTANTS.SCREEN_HEIGHT,
    dimensions.width,
    dimensions.height
  );

  useEffect(() => {
    const detectCoords = calcDetectCoords(position[0], position[1]);

    if (detection) {
      setDetectionZone(
        detection.createBox(
          {
            x: detectCoords.x,
            y: detectCoords.y,
          },
          dimensions.width,
          dimensions.height
        )
      );
    }
  }, []);

  return (
    <mesh>
      <planeGeometry args={[textureRatio * scale, scale]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
};

export default ScreenObject;
