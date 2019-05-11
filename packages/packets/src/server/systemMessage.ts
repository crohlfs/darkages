import { compile, record, field, uint8 } from "@darkages/binary-blocks";
import { string16 } from "../shared";

/**
 * Packet ID 0x0a
 */
export default compile(
  record(field("type", uint8), field("message", string16))
);
