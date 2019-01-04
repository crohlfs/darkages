import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x4d
 */
export default compile(record(field("lines", uint8)));
