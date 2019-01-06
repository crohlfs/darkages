import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  writeOnly
} from "@darkages/binary-blocks";
import { direction } from "../shared";

/**
 * Packet ID 0x0b
 */
export default compile(
  record(
    field("direction", direction),
    field("oldX", uint16be),
    field("oldY", uint16be),
    writeOnly(uint16be, 0x0b),
    writeOnly(uint16be, 0x0b),
    writeOnly(uint16be, 0x0b),
    writeOnly(uint8, 0x01)
  )
);
