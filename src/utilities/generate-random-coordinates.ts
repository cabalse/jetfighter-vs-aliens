function generateRandomCoordinates(
  maxX: number,
  maxY: number,
  rangeMin: number,
  rangeMax: number,
  amount: number
) {
  const coordinates: { x: number; y: number }[] = [];

  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  while (coordinates.length < amount) {
    const x = Math.random() * (2 * maxX) - maxX;
    const y = Math.random() * (2 * maxY) - maxY;

    coordinates.push({ x, y });
  }

  return coordinates;
}

export default generateRandomCoordinates;
