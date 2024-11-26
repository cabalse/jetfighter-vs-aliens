import { useEffect, useState } from "react";
import Animation from "../types/animation";
import { useFrame } from "@react-three/fiber";
import { Texture } from "three";
import ANIMATION_NAMES from "../constants/animation-names";

const useFrameAnimation = (
  animations: Animation[],
  defaultAnimation: ANIMATION_NAMES,
  animationFrameSpeed: number
): [
  () => Texture,
  (animationName: ANIMATION_NAMES) => void,
  ANIMATION_NAMES
] => {
  const [animationFrames] = useState<Animation[]>(animations); // All animations
  const [currentAnimation, setCurrentAnimation] = useState<Texture[]>([]); // Current animation that the current frame is returned from.
  const [currentAnimationName, setCurrentAnimationName] =
    useState<ANIMATION_NAMES>(defaultAnimation); // Current animation name
  const [currentFrame, setCurrentFrame] = useState<number>(0); // Current frame of the current animation

  useEffect(() => {
    const defaultAnimationFrames = animationFrames.find(
      (animation) => animation.name === defaultAnimation
    );
    if (defaultAnimationFrames) {
      setCurrentAnimation(defaultAnimationFrames.frames);
    }
  }, [animationFrames, defaultAnimation]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const newFrame =
      Math.floor(time / animationFrameSpeed) % currentAnimation.length;
    setCurrentFrame(newFrame);
  });

  const setAnimation = (animationName: ANIMATION_NAMES) => {
    if (animationFrames.length === 0) return;

    const newAnimation = animationFrames.find(
      (animation) => animation.name === animationName
    );
    if (newAnimation) {
      setCurrentAnimationName(animationName);
      setCurrentAnimation(newAnimation.frames);
    }
  };

  const getCurrentFrame = () => {
    return currentAnimation[currentFrame];
  };

  return [getCurrentFrame, setAnimation, currentAnimationName];
};

export default useFrameAnimation;
