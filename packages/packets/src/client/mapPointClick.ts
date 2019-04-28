import { compile, record, field, uint32be } from "@darkages/binary-blocks";

/**
 * Packet ID 0x3f
 */
export default compile(
  record(field("idPart1", uint32be), field("idPart2", uint32be))
);
