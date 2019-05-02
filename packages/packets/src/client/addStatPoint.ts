import {
  compile,
  record,
  field,
  uint8,
  transform
} from "@darkages/binary-blocks";

const statType = transform(
  uint8,
  function(value) {
    return value === 2
      ? ("DEX" as "DEX")
      : value === 4
      ? ("INT" as "INT")
      : value === 8
      ? ("WIS" as "WIS")
      : value === 16
      ? ("CON" as "CON")
      : ("STR" as "STR");
  },
  function(stat) {
    return stat === "STR"
      ? 1
      : stat === "DEX"
      ? 2
      : stat === "INT"
      ? 4
      : stat === "WIS"
      ? 8
      : 16;
  }
);

/**
 * Packet ID 0x47
 */
export default compile(record(field("stat", statType)));
