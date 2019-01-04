import {
  compile,
  record,
  field,
  uint8,
  uint32be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x11
 */
export default compile(
  record(field("id", uint32be), field("direction", uint8))
);
