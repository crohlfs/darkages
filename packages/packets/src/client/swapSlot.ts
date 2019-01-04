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
          switch (value) {
            case 1:
              return "SPELL" as "SPELL";
            case 2:
              return "SKILL" as "SKILL";
            case 0:
            default:
              return "ITEM" as "ITEM";
          }
        },
        function(value) {
          switch (value) {
            case "ITEM":
              return 0;
            case "SPELL":
              return 1;
            case "SKILL":
              return 2;
          }
        }
      )
    ),
    field("from", uint8),
    field("to", uint8)
  )
);
