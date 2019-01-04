import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  transform
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x17
 */
export default compile(
  record(
    field("slot", uint8),
    field("icon", uint16be),
    field(
      "isTargetted",
      transform(
        uint8,
        function(value) {
          return value !== 5;
        },
        function(value) {
          return value ? 2 : 5;
        }
      )
    ),
    field("name", string8),
    field("prompt", string8) /* Not sure about this one */,
    field("lines", uint8)
  )
);
