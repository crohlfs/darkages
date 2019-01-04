import {
  compile,
  record,
  field,
  uint8,
  uint32be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x29
 */
export default compile(
  record(
    field("slot", uint8),
    field("targetId", uint32be),
    field("quantity", uint8)
  )
);
