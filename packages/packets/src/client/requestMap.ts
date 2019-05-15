import { compile, record, field, uint8, skip } from "@darkages/binary-blocks";

/**
 * Packet ID 0x05
 */
export default compile(
  record(skip(4), field("width", uint8), field("height", uint8))
);
