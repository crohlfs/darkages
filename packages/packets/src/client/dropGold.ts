import {
  compile,
  record,
  field,
  uint32be,
  uint16be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x24
 */
export default compile(
  record(field("amount", uint32be), field("x", uint16be), field("y", uint16be))
);
