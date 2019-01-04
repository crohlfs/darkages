import {
  compile,
  record,
  field,
  uint8,
  string,
  uint16le
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x0a
 */
export default compile(
  record(field("type", uint8), field("message", string(uint16le, "euc-kr")))
);
