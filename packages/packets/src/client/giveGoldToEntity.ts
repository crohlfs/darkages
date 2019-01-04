import { compile, record, field, uint32be } from "@darkages/binary-blocks";

/**
 * Packet ID 0x2a
 */
export default compile(
  record(field("amount", uint32be), field("targetId", uint32be))
);
