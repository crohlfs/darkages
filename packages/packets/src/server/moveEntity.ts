import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint32be,
  skip
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x0c
 */
export default compile(
  record(
    field("id", uint32be),
    field("oldX", uint16be),
    field("oldY", uint16be),
    field("direction", uint8),
    skip()
  )
);
