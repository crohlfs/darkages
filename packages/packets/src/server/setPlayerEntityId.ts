import { compile, record, field, uint32be } from "@darkages/binary-blocks";

/**
 * Packet ID 0x05
 */
export default compile(record(field("id", uint32be)));
