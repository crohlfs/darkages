import { string, uint8 } from "@darkages/binary-blocks";

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
