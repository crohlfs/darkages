import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint32be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x33
 */
export default compile(
  record(
    field("x", uint16be),
    field("y", uint16be),
    field("direction", uint8),
    field("id", uint32be),
    field("helmet", uint16be)
  )
);
