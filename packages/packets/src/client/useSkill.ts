import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x3e
 */
export default compile(record(field("slot", uint8)));
