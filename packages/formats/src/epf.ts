export function load(epf: Uint8Array) {
  const frameCount = epf[0] | (epf[1] << 8);
  const width = epf[2] | (epf[3] << 8);
  const height = epf[4] | (epf[5] << 8);
  const tocOffset =
    (epf[8] | (epf[9] << 8) | (epf[10] << 16) | (epf[11] << 24)) + 0x0c;

  const frames = [];

  for (let i = 0; i < frameCount; i++) {
    const offset = tocOffset + i * 16;

    const top = epf[offset] | (epf[offset + 1] << 8);
    const left = epf[offset + 2] | (epf[offset + 3] << 8);

    const height = (epf[offset + 4] | (epf[offset + 5] << 8)) - top;
    const width = (epf[offset + 6] | (epf[offset + 7] << 8)) - left;

    const start =
      (epf[offset + 8] |
        (epf[offset + 9] << 8) |
        (epf[offset + 10] << 16) |
        (epf[offset + 11] << 24)) +
      0x0c;

    // File seems to specify "end" but this is not required
    // const end =
    //   (epf[offset + 12] |
    //     (epf[offset + 13] << 8) |
    //     (epf[offset + 14] << 16) |
    //     (epf[offset + 15] << 24)) +
    //   0x0c;

    const bytes = epf.slice(start, start + height * width);

    frames.push({ top, left, width, height, bytes });
  }

  return { width, height, frames };
}
