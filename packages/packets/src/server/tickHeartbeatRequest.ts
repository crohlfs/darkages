import { compile, record, field, uint32be } from "@darkages/binary-blocks";

/**
 * Packet ID 0x68
 */
export default compile(record(field("timestamp", uint32be)));
