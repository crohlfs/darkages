import {
  compile,
  record,
  field,
  transform,
  uint8
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x30
 */
export default compile(
  record(
    field(
      "window",
      transform(
        uint8,
        function(value) {
          return value === 1 ? "SPELL" : value === 2 ? "SKILL" : "ITEM";
        },
        function(value) {
          return value === "ITEM" ? 0 : value === "SPELL" ? 1 : 2;
        }
      )
    ),
    field("from", uint8),
    field("to", uint8)
  )
);
