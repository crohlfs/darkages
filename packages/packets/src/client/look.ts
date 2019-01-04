import { compile, record, field, uint16be } from "@darkages/binary-blocks";

/**
 * Packet ID 0x0a
 * Not sure what this packet is, found it in wrenbot
 */
export default compile(record(field("x", uint16be), field("y", uint16be)));
