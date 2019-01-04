import { compile, record, field } from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x4e
 */
export default compile(record(field("text", string8)));
