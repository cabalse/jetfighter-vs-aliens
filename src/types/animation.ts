import { Texture } from "three";
import ANIMATION_NAMES from "../constants/animation-names";

type Animation = {
  name: ANIMATION_NAMES;
  frames: Texture[];
};

export default Animation;
