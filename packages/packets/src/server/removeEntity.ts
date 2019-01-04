import {
  compile,
  record,
  field,
  skip,
  uint32be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x0e
 */
export default compile(record(field("id", uint32be), skip(3) /* ?? */));
