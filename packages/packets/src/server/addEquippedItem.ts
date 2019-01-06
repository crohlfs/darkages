import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint32be,
  skip,
  transform
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x37
 */
export default compile(
  record(
    field("slot", uint8),
    field(
      "sprite",
      transform(
        uint16be,
        function(val) {
          return val + 0x8000;
        },
        function(val) {
          return val - 0x8000;
        }
      )
    ),
    skip(),
    field("name", string8),
    skip(),
    field("maximumDurability", uint32be),
    field("currentDurability", uint32be)
  )
);
