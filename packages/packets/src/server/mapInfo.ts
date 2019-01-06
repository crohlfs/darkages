import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint16le,
  transform
} from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x15
 */
export default compile(
  transform(
    record(
      field("id", uint16be),
      field("widthLow", uint8),
      field("heightLow", uint8),
      field("flags", uint8),
      field("widthHigh", uint8),
      field("heightHigh", uint8),
      field("checksum", uint16le),
      field("name", string8)
    ),
    function(val) {
      return {
        id: val.id,
        flags: val.flags,
        checksum: val.checksum,
        name: val.name,
        width: (val.widthHigh << 8) + val.widthLow,
        height: (val.heightHigh << 8) + val.heightLow
      };
    },
    function(val) {
      return {
        id: val.id,
        flags: val.flags,
        checksum: val.checksum,
        name: val.name,
        widthHigh: val.width >>> 8,
        widthLow: val.width & 0xff,
        heightHigh: val.height >>> 8,
        heightLow: val.height & 0xff
      };
    }
  )
);
