import Position2D from "../types/position-2d";
import ThreePositionElement from "../constants/constant-three-position-element";

const getRightElement = (posObj: {
  left: Position2D;
  middle: Position2D;
  right: Position2D;
}) => {
  if (posObj.left.x > posObj.middle.x && posObj.left.x > posObj.right.x) {
    return ThreePositionElement.LEFT;
  }

  if (posObj.middle.x > posObj.left.x && posObj.middle.x > posObj.right.x) {
    return ThreePositionElement.CENTER;
  }

  if (posObj.right.x > posObj.left.x && posObj.right.x > posObj.middle.x) {
    return ThreePositionElement.RIGHT;
  }
};

export default getRightElement;
