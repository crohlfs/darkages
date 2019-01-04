import {
  compile,
  record,
  field,
  uint8,
  uint16be
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x29
 */
export default compile(
  record(field("slot", uint8), field("icon", uint16be), field("name", string8))
);
