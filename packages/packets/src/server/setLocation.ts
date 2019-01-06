import {
  compile,
  record,
  field,
  uint16be,
  writeOnly,
  uint16le
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x04
 */
export default compile(
  record(
    field("x", uint16be),
    field("y", uint16be),
    writeOnly(uint16le, 11),
    writeOnly(uint16le, 11)
  )
);
