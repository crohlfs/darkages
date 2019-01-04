import {
  compile,
  record,
  field,
  uint8,
  transform,
  array,
  uint16be,
  skip,
  uint32be
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x03
 */
export default compile(
  record(
    field(
      "ip",
      transform(
        array({ of: uint8, length: 4 }),
        function(bytes) {
          return bytes.reverse().join(".");
        },
        function(ipAddress) {
          return ipAddress
            .split(".")
            .reverse()
            .map(parseFloat);
        }
      )
    ),
    field("port", uint16be),
    skip(),
    field("seed", uint8),
    field("key", array({ of: uint8, length: uint8 })),
    field("name", string8),
    field("id", uint32be)
  )
);
