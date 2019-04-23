import {
  compile,
  record,
  field,
  uint16be,
  uint32be,
  skip
} from "@darkages/binary-blocks";
import { direction } from "../shared";

/**
 * Packet ID 0x0c
 */
export default compile(
  record(
    field("id", uint32be),
    field("oldX", uint16be),
    field("oldY", uint16be),
    field("direction", direction),
    skip()
  )
);
