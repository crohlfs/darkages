import {
  compile,
  record,
  field,
  uint8,
  transform
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x47
 */
export default compile(
  record(
    field(
      "stat",
      transform(
        uint8,
        function(value) {
          switch (value) {
            case 2:
              return "DEX" as "DEX";
            case 4:
              return "INT" as "INT";
            case 8:
              return "WIS" as "WIS";
            case 16:
              return "CON" as "CON";
            case 1:
            default:
              return "STR" as "STR";
          }
        },
        function(stat) {
          switch (stat) {
            case "STR":
              return 1;
            case "DEX":
              return 2;
            case "INT":
              return 4;
            case "WIS":
              return 8;
            case "CON":
              return 16;
          }
        }
      )
    )
  )
);
