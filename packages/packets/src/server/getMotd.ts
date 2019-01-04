import {
  compile,
  record,
  field,
  uint8,
  uint32be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x60
 */
export default compile(record(field("unknown", uint8), field("crc", uint32be)));
