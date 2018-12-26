export function load(mpf: Uint8Array) {
  const hasFFHeader =
    mpf[0] === 0xff && mpf[1] === 0xff && mpf[2] === 0xff && mpf[3] === 0xff;

  let offset = hasFFHeader ? 8 : 0;

  let frameCount = mpf[offset];
  const width = mpf[offset + 1] | (mpf[offset + 2] << 8);
  const height = mpf[offset + 3] | (mpf[offset + 4] << 8);

  const expectedDataSize =
    mpf[offset + 5] |
    (mpf[offset + 6] << 8) |
    (mpf[offset + 7] << 16) |
    (mpf[offset + 8] << 24);

  const walkStart = mpf[offset + 9];
  const walkEnd = mpf[offset + 10];

  const isNewFormat = (mpf[offset + 11] | (mpf[offset + 12] << 8)) === 0xffff;

  let frameInfo;

  if (isNewFormat) {
    const [
      idleStart,
      idleLength,
      idleSpeed,
      walkSpeed,
      attack1Start,
      attack1Length,
      attack2Start,
      attack2Length,
      attack3Start,
      attack3Length
    ] = mpf.subarray(offset + 13, offset + 23);
    frameInfo = {
      idleStart,
      idleLength,
      idleSpeed,
      walkSpeed,
      attack1Start,
      attack1Length,
      attack2Start,
      attack2Length,
      attack3Start,
      attack3Length
    };
    offset += 23;
  } else {
    const [
      attack1Start,
      attack1Length,
      idleStart,
      idleLength,
      idleSpeed,
      walkSpeed
    ] = mpf.subarray(offset + 11, offset + 17);
    frameInfo = {
      attack1Start,
      attack1Length,
      idleStart,
      idleLength,
      idleSpeed,
      walkSpeed
    };
    offset += 17;
  }

  const dataStart = mpf.length - expectedDataSize;

  const frames = [];

  let paletteId = 0;

  for (let i = 0; i < frameCount; i++) {
    const di = offset + i * 16;

    const left = mpf[di] | (mpf[di + 1] << 8);
    const top = mpf[di + 2] | (mpf[di + 3] << 8);
    const right = mpf[di + 4] | (mpf[di + 5] << 8);
    const bottom = mpf[di + 6] | (mpf[di + 7] << 8);

    const width = right - left;
    const height = bottom - top;

    const xOffset = mpf[di + 8] | (mpf[di + 9] << 8);
    const yOffset = mpf[di + 10] | (mpf[di + 11] << 8);

    const startAddress =
      mpf[di + 12] |
      (mpf[di + 13] << 8) |
      (mpf[di + 14] << 16) |
      (mpf[di + 15] << 24);

    if (left === 0xffff && right === 0xffff) {
      paletteId = startAddress % 1000;
      frameCount--;
    } else {
      paletteId = 0;
    }

    if (height > 0 && width > 0) {
      const frameDataOffset = dataStart + startAddress;
      const bytes = mpf.slice(
        frameDataOffset,
        frameDataOffset + height * width
      );

      frames.push({ top, left, width, height, xOffset, yOffset, bytes });
    }
  }

  return { width, height, paletteId, frameInfo, walkStart, walkEnd, frames };
}
