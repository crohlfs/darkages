import { compile, record, field, uint32be } from "@darkages/binary-blocks";
import { direction } from "../shared";

/**
 * Packet ID 0x11
 */
export default compile(
  record(field("id", uint32be), field("direction", direction))
);
