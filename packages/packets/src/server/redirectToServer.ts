import {
  compile,
  record,
  field,
  uint8,
  transform,
  array,
  uint16be,
  uint32be,
  writeOnly
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
    field(
      "serverType",
      transform(
        uint8,
        function(value) {
          return value === 0x19 ? "game" : "login";
        },
        function(type) {
          return type === "game" ? 0x19 : 0x1b;
        }
      )
    ),
    field("seed", uint8),
    field("key", array({ of: uint8, length: uint8 })),
    field("name", string8),
    field("id", uint32be)
  )
);
