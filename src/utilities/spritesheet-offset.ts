function spritesheetOffset(
  sheetWidth: number,
  sheetHeight: number,
  textureWidth: number,
  textureHeight: number,
  row: number,
  column: number
) {
  const repeatX = textureWidth / sheetWidth;
  const repeatY = textureHeight / sheetHeight;

  const offsetX = column * repeatX;
  const offsetY = 1 - (row + 1) * repeatY;

  return [offsetX, offsetY, repeatX, repeatY];
}

export default spritesheetOffset;
