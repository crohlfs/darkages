import {
  compile,
  record,
  field,
  uint8,
  uint32be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x0f
 */
export default compile(record(field("slot", uint8), field("target", uint32be)));
