import { compile, record, field } from "@darkages/binary-blocks";
import { direction } from "../shared";

/**
 * Packet ID 0x11
 */
export default compile(record(field("direction", direction)));
