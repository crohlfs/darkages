import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x45
 */
export default compile(record(field("low", uint8), field("high", uint8)));
