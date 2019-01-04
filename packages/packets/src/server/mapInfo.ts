import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint16le
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x15
 */
export default compile(
  record(
    field("id", uint16be),
    field("widthLow", uint8),
    field("heightLow", uint8),
    field("flags", uint8),
    field("widthHigh", uint8),
    field("heightHigh", uint8),
    field("checksum", uint16le),
    field("name", string8)
  )
);
