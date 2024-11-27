function generateRandomCoordinates(maxX: number, maxY: number, amount: number) {
  const coordinates: { x: number; y: number }[] = [];

  while (coordinates.length < amount) {
    const x = Math.random() * (2 * maxX) - maxX;
    const y = Math.random() * (2 * maxY) - maxY;

    coordinates.push({ x, y });
  }

  return coordinates;
}

export default generateRandomCoordinates;
