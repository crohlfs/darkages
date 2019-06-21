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
      ? "DEX"
      : value === 4
      ? "INT"
      : value === 8
      ? "WIS"
      : value === 16
      ? "CON"
      : "STR";
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
