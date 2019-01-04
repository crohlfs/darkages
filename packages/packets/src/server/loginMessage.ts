import { compile, record, field, uint8 } from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x02
 */
export default compile(record(field("code", uint8), field("message", string8)));
