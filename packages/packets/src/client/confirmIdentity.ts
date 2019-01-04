import {
  compile,
  record,
  field,
  uint8,
  array,
  uint32be,
  skip
} from "@darkages/binary-blocks";

import { string8 } from "../shared";

/**
 * Packet ID 0x10
 */
export default compile(
  record(
    field("seed", uint8),
    field("key", array({ of: uint8, length: uint8 })),
    field("name", string8),
    field("id", uint32be),
    skip()
  )
);
