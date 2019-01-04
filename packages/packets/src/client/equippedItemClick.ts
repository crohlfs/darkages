import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x44
 */
export default compile(record(field("slot", uint8)));
