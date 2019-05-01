import {
  compile,
  record,
  field,
  uint8,
  array,
  boolean
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x32
 */
export default compile(
  array({
    length: uint8,
    of: record(
      field("x", uint8),
      field("y", uint8),
      field("isClosed", boolean),
      field("isLeft", boolean)
    )
  })
);
