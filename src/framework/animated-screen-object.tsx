import { useEffect, useState } from "react";
import { Body, Box, System } from "detect-collisions";

import useToDetectCoords from "../hooks/use-to-detect-coords";
import CONSTANTS from "../constants";
import ANIMATION_NAMES from "../constants/animation-names";
import useFrameAnimation from "../hooks/use-frame-animation";
import Animation from "../types/animation";

type Props = {
  dimensions: { width: number; height: number };
  position: [number, number, number];
  scale: number;
  textureRatio: number;
  animation: ANIMATION_NAMES;
  animationFrames: Animation[];
  animationFrameSpeed: number;
  detection?: System<Body>;
  beginAnimation?: boolean;
  onAnimationEnd?: () => void;
  onAnimationCycleEnd?: () => void;
};

const AnimatedScreenObject = ({
  dimensions,
  position,
  scale,
  textureRatio,
  animationFrames,
  animation,
  animationFrameSpeed,
  detection,
  beginAnimation = true,
  onAnimationEnd,
  onAnimationCycleEnd,
}: Props) => {
  const [, setDetectionZone] = useState<Box>();
  const [getCurrentFrame] = useFrameAnimation(
    animationFrames,
    animation,
    animationFrameSpeed,
    onAnimationCycleEnd
  );

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
    <mesh position={position}>
      <planeGeometry args={[textureRatio * scale, scale]} />
      <meshBasicMaterial map={getCurrentFrame()} transparent={true} />
    </mesh>
  );
};

export default AnimatedScreenObject;
