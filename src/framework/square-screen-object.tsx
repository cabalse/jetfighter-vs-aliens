type Props = {
  width: number;
  height: number;
};

const SquareScreenObject = ({ width, height }: Props) => {
  return (
    <mesh>
      {/* Plane geometry with equal width and height (a square) */}
      <planeGeometry args={[width, height]} />{" "}
      {/* Width and height of 2 units */}
      <meshBasicMaterial color="orange" />
    </mesh>
  );
};

export default SquareScreenObject;
