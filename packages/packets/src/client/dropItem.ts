import {
  compile,
  record,
  field,
  uint8,
  uint32be,
  uint16be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x08
 */
export default compile(
  record(
    field("slot", uint8),
    field("x", uint16be),
    field("y", uint16be),
    field("quantity", uint32be)
  )
);
