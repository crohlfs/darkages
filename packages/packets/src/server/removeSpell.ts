import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x18
 */
export default compile(record(field("slot", uint8)));
