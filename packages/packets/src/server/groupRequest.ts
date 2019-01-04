import {
  compile,
  record,
  field,
  uint8,
  skip,
  writeOnly
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x63
 */
export default compile(
  record(writeOnly(uint8, 1), field("name", string8), skip(2))
);
