import {
  uint8,
  transform,
  bytes,
  ValueParser,
  uint16le
} from "@darkages/binary-blocks";

export function build<Shape>(
  parse: (data: Uint8Array) => Shape,
  generate: (obj: Shape) => Uint8Array
) {
  return { parse, generate };
}

const string = (size: number | ValueParser<number>) =>
  transform(
    bytes(size),
    function(value: Uint8Array) {
      return new TextDecoder("euc-kr").decode(value);
    },
    function(value: string) {
      return Buffer.from(value, "ascii");
    }
  );

export const string8 = string(uint8);
export const string16 = string(uint16le);

export const emptyPacketStructure = {
  parse: () => ({}),
  generate: () => new Uint8Array()
};

export const direction = transform(
  uint8,
  function(value) {
    return value === 0
      ? "up"
      : value === 1
      ? "right"
      : value === 2
      ? "down"
      : "left";
  },
  function(dir) {
    return dir === "up" ? 0 : dir === "right" ? 1 : dir === "down" ? 2 : 3;
  }
);
