import {
  compile,
  record,
  field,
  uint8,
  uint32be,
  int16be,
  writeOnly
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x1a
 */
export default compile(
  record(
    field("id", uint32be),
    field("motion", uint8),
    field("speed", int16be),
    writeOnly(uint8, 0xff)
  )
);
