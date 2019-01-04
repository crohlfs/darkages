import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x19
 */
export default compile(record(field("sound", uint8)));
