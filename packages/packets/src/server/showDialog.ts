import {
  compile,
  record,
  field,
  uint8,
  uint32be,
  transform,
  skip,
  uint16be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x60
 * TODO
 */
export default compile(
  record(
    field("type", uint8),
    field(
      "objectType",
      transform(
        uint8,
        function(val) {
          return val === 1
            ? ("creature" as "creature")
            : val === 2
            ? ("item" as "item")
            : ("reactor" as "reactor");
        },
        function(val) {
          return val === "creature" ? 1 : val === "item" ? 2 : 4;
        }
      )
    ),
    field("targetId", uint32be),
    skip(),
    field("sprite", uint16be),
    field("color", uint8),
    field("type", uint8),
    field("type", uint8),
    field("crc", uint32be)
  )
);
