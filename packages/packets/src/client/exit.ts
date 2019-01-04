import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x0b
 */
export default compile(record(field("endSignal", uint8)));
