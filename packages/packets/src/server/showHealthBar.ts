import {
  compile,
  record,
  field,
  uint8,
  uint32be,
  skip
} from "@darkages/binary-blocks";

/**
 * Packet ID 0x13
 */
export default compile(
  record(
    field("serial", uint32be) /* what? */,
    skip(1) /* unknown */,
    field("percent", uint8),
    field("sound", uint8)
  )
);
