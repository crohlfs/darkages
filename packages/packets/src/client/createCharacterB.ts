import { compile, record, field, uint8 } from "@darkages/binary-blocks";

/**
 * Packet ID 0x04
 * This packet should be preceded by the packet containing the username and password
 */
export default compile(
  record(
    field("hairStyle", uint8),
    field("gender", uint8),
    field("hairColor", uint8)
  )
);
