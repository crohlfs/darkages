import { compile, record, field, boolean } from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x0e
 */
export default compile(
  record(field("isShout", boolean), field("message", string8))
);
