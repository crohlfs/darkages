import {
  compile,
  record,
  field,
  uint16be,
  uint32be
} from "@darkages/binary-blocks";
import { direction } from "../shared";

/**
 * Packet ID 0x33
 */
const displayUser = compile(
  record(
    field("x", uint16be),
    field("y", uint16be),
    field("direction", direction),
    field("id", uint32be),
    field("helmet", uint16be)
  )
);

export default displayUser;

export type DisplayUser = ReturnType<typeof displayUser.parse>;
