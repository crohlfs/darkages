import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  writeOnly,
  transform
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x0b
 */
export default compile(
  record(
    field(
      "direction",
      transform(
        uint8,
        function(value) {
          return value === 0
            ? "up"
            : value === 1
            ? "right"
            : value === 2
            ? "down"
            : value === 3
            ? "left"
            : "refresh";
        },
        function(dir) {
          return dir === "up"
            ? 0
            : dir === "right"
            ? 1
            : dir === "down"
            ? 2
            : dir === "left"
            ? 3
            : 4;
        }
      )
    ),
    field("x", uint16be),
    field("y", uint16be),
    writeOnly(uint16be, 0x0b),
    writeOnly(uint16be, 0x0b),
    writeOnly(uint16be, 0x0b),
    writeOnly(uint8, 0x01)
  )
);
