import Position2D from "../types/position-2d";
import ThreePositionElement from "../constants/constant-three-position-element";

const getMiddleElement = (posObj: {
  b1: Position2D;
  middle: Position2D;
  right: Position2D;
}) => {
  if (
    (posObj.b1.x < posObj.middle.x && posObj.middle.x < posObj.right.x) ||
    (posObj.right.x < posObj.middle.x && posObj.middle.x < posObj.b1.x)
  ) {
    return ThreePositionElement.CENTER;
  }

  if (
    (posObj.middle.x < posObj.b1.x && posObj.b1.x < posObj.right.x) ||
    (posObj.right.x < posObj.b1.x && posObj.b1.x < posObj.middle.x)
  ) {
    return ThreePositionElement.LEFT;
  }

  if (
    (posObj.b1.x < posObj.right.x && posObj.right.x < posObj.middle.x) ||
    (posObj.middle.x < posObj.right.x && posObj.right.x < posObj.b1.x)
  ) {
    return ThreePositionElement.RIGHT;
  }
};

export default getMiddleElement;
