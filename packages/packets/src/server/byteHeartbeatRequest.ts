import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x3b
 */
export default compile(record(field("high", uint8), field("low", uint8)));
