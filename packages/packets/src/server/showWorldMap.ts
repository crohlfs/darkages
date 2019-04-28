import {
  compile,
  record,
  field,
  uint8,
  array,
  uint32be,
  transform,
  uint16be
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

const mapPoint = record(
  field("xQuadrant", uint8),
  field("xOffset", uint8),
  field("yQuadrant", uint8),
  field("yOffset", uint8),
  field("name", string8),
  field("idPart1", uint32be),
  field("idPart2", uint32be)
);

const uint8With1After = transform(
  uint16be,
  function(value) {
    return value >> 8;
  },
  function(value) {
    return (value << 8) + 1;
  }
);

/**
 * Packet ID 0x2e
 */
export default compile(
  record(
    field("name", string8),
    field("points", array({ of: mapPoint, length: uint8With1After }))
  )
);
