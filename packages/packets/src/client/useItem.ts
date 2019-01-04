import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x1c
 */
export default compile(record(field("slot", uint8)));
