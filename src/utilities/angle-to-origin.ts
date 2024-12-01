function angleToOrigin(x: number, y: number) {
  const angle = Math.atan2(y, x);

  return angle;
}

export default angleToOrigin;
