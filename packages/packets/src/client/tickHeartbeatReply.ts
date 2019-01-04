import { compile, record, field, uint32be } from "@darkages/binary-blocks";

/**
 * Packet ID 0x75
 */
export default compile(
  record(field("timestamp", uint32be), field("tickCount", uint32be))
);
