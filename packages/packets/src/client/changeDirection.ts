import {
  compile,
  record,
  field,
  uint8,
  transform
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x11
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
            : "left";
        },
        function(dir) {
          return dir === "up"
            ? 0
            : dir === "right"
            ? 1
            : dir === "down"
            ? 2
            : 3;
        }
      )
    )
  )
);
