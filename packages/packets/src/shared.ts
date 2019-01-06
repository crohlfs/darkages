import { string, uint8, transform } from "@darkages/binary-blocks";

export function build<Shape>(
  parse: (data: Uint8Array) => Shape,
  generate: (obj: Shape) => Uint8Array
) {
  return { parse, generate };
}

export const string8 = string(uint8, "euc-kr");

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
