export interface FileEntry {
  o: number;
  s: number;
}

export interface FileMap {
  [name: string]: FileEntry;
}

export function list(buffer: Buffer) {
  const count = buffer.readUInt32LE(0);

  let lastOffset = -1;
  let lastName = "";

  const files: FileMap = {};

  for (let i = 0; i < count; i++) {
    const start = 4 + i * 17;

    const offset = buffer.readUInt32LE(start);
    let name = buffer
      .slice(start + 4, start + 17)
      .toString("ascii")
      .toLowerCase();

    const nullIndex = name.indexOf("\0");

    if (nullIndex != -1) {
      name = name.substring(0, nullIndex);
    }

    if (lastOffset != -1) {
      const s = offset - lastOffset;
      files[lastName] = { o: lastOffset, s };
    }

    lastOffset = offset;
    lastName = name;
  }

  return files;
}
