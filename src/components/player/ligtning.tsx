import ANIMATION_NAMES from "../../constants/animation-names";
import AnimatedScreenObject from "../../framework/animated-screen-object";
import useTexture from "../../hooks/use-texture";

import lightning1 from "../../assets/lightning/lightning-1.png";
import lightning2 from "../../assets/lightning/lightning-2.png";
import lightning3 from "../../assets/lightning/lightning-3.png";
import lightning4 from "../../assets/lightning/lightning-4.png";
import lightning5 from "../../assets/lightning/lightning-5.png";
import lightning6 from "../../assets/lightning/lightning-6.png";

import CONSTANTS from "../../constants";

const scale = 400;

type Props = {
  show: boolean;
  onAnimationCycleEnd: () => void;
};

const Lightning = ({ show = false, onAnimationCycleEnd }: Props) => {
  const [l1, frameRatio, width, height] = useTexture(lightning1);
  const [l2, , ,] = useTexture(lightning2);
  const [l3, , ,] = useTexture(lightning3);
  const [l4, , ,] = useTexture(lightning4);
  const [l5, , ,] = useTexture(lightning5);
  const [l6, , ,] = useTexture(lightning6);

  const animations = [
    {
      name: ANIMATION_NAMES.IDLE,
      frames: [l1, l2, l3, l4, l5, l6],
    },
  ];

  // Place it at the nose of the plane and rotate 90 degrees
  return (
    <>
      {show && (
        <group position={[230, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <AnimatedScreenObject
            dimensions={{ width: width, height: height }}
            position={[0, 0, CONSTANTS.Z_POSITION.WEAPONS]}
            scale={scale}
            animationFrames={animations}
            textureRatio={frameRatio / 3.5} // Make it longer
            animation={ANIMATION_NAMES.IDLE}
            animationFrameSpeed={CONSTANTS.ANIMATION_SPEED.LIGHTNING}
            onAnimationCycleEnd={onAnimationCycleEnd}
          />
        </group>
      )}
    </>
  );
};

export default Lightning;
