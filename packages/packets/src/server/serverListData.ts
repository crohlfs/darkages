import {
  compile,
  record,
  field,
  uint8,
  array,
  uint16be
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x56
 */
export default compile(
  record(field("data", array({ of: uint8, length: uint16be })))
);
