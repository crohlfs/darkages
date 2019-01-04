import { compile, record, field } from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x19
 */
export default compile(
  record(field("target", string8), field("message", string8))
);
