import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x05
 */
export default compile(record(field("width", uint8), field("height", uint8)));
