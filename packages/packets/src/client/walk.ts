import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x06
 */
export default compile(record(field("direction", uint8)));
