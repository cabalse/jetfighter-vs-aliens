import ANIMATION_NAMES from "../../constants/animation-names";
import AnimatedScreenObject from "../../framework/animated-screen-object";
import useTexture from "../../hooks/use-texture";

import burner01 from "../../assets/player/burner/jet_burner_frame_1.png";
import burner02 from "../../assets/player/burner/jet_burner_frame_2.png";
import burner03 from "../../assets/player/burner/jet_burner_frame_3.png";
import burner04 from "../../assets/player/burner/jet_burner_frame_4.png";
import burner05 from "../../assets/player/burner/jet_burner_frame_5.png";
import burner06 from "../../assets/player/burner/jet_burner_frame_6.png";
import CONSTANTS from "../../constants";

const scale = 15;
const animationFrameSpeed = 2; // 0.07;

const Burner = () => {
  const [b01, frameRatio, width, height] = useTexture(burner01);
  const [b02, , ,] = useTexture(burner02);
  const [b03, , ,] = useTexture(burner03);
  const [b04, , ,] = useTexture(burner04);
  const [b05, , ,] = useTexture(burner05);
  const [b06, , ,] = useTexture(burner06);

  const animations = [
    {
      name: ANIMATION_NAMES.IDLE,
      frames: [b01, b02, b03, b04, b05, b06],
    },
  ];

  return (
    <group position={[-67, -4, 0]}>
      <AnimatedScreenObject
        dimensions={{ width: width, height: height }}
        position={[0, 0, CONSTANTS.Z_POSITION.PLAYER]}
        scale={scale}
        animationFrames={animations}
        textureRatio={frameRatio}
        animation={ANIMATION_NAMES.IDLE}
        animationFrameSpeed={animationFrameSpeed}
        onAnimationCycleEnd={() => {
          console.log("Burner animation cycle end");
        }}
      />
      <AnimatedScreenObject
        dimensions={{ width: width, height: height }}
        position={[0, 8, CONSTANTS.Z_POSITION.PLAYER]}
        scale={scale}
        animationFrames={animations}
        textureRatio={frameRatio}
        animation={ANIMATION_NAMES.IDLE}
        animationFrameSpeed={animationFrameSpeed}
      />
    </group>
  );
};

export default Burner;
