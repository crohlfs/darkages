import {
  record,
  field,
  array,
  uint8,
  uint16be,
  skip,
  string,
  uint32le,
  transform,
  compile
} from "@darkages/binary-blocks";

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
    field("key", string(uint8, "windows-949")),
    field("name", string(uint8, "windows-949")),
    field("id", uint32le)
  )
);
