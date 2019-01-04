import {
  compile,
  record,
  field,
  uint16be,
  writeOnly
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x04
 */
export default compile(
  record(
    field("x", uint16be),
    field("y", uint16be),
    writeOnly(uint16be, 11),
    writeOnly(uint16be, 11)
  )
);
