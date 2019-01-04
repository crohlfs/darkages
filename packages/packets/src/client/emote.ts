import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x1d
 */
export default compile(record(field("emote", uint8)));
