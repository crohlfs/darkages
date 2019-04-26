import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint32be,
  skip,
  transform,
  writeOnly
} from "@darkages/binary-blocks";
import { string8, direction } from "../shared";

export const npcType = transform(
  uint8,
  function(value) {
    return value === 0 ? "monster" : value === 1 ? "nonSolidMonster" : "npc";
  },
  function(value) {
    return value === "monster"
      ? 0
      : value === "nonSolidMonster"
      ? 1
      : value === "npc"
      ? 2
      : 3;
  }
);

/**
 * Packet ID 0x07
 */
export default compile(
  record(
    writeOnly(uint16be, 1),
    field("x", uint16be),
    field("y", uint16be),
    field("id", uint32be),
    field("sprite", uint16be),
    skip(4),
    field("direction", direction),
    skip(),
    field("type", npcType),
    field("name", string8)
  )
);
