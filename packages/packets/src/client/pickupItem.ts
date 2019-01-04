import {
  compile,
  record,
  field,
  uint8,
  uint16be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x07
 */
export default compile(
  record(field("slot", uint8), field("x", uint16be), field("y", uint16be))
);
