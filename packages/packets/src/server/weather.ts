import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x20
 */
export default compile(record(field("one", uint8), field("two", uint8)));
