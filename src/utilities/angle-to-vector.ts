function angleToVector(
  angleInRadians: number,
  speed: number
): { x: number; y: number } {
  const x = Math.cos(angleInRadians) * speed;
  const y = Math.sin(angleInRadians) * speed;

  return { x, y };
}

export default angleToVector;
