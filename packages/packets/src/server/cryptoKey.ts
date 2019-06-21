import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint32be,
  array
} from "@darkages/binary-blocks";
import { string8, build } from "../shared";

const okStructure = compile(
  record(
    field("versionMatch", "OK"),
    field("serverTableChecksum", uint32be),
    field("seed", uint8),
    field("encryptionKey", array({ of: uint8, length: uint8 }))
  )
);

const tooLowStructure = compile(
  record(
    field("versionMatch", "TOO_LOW"),
    field("expectedVersion", uint16be),
    field("patchUrl", string8)
  )
);

/**
 * Packet ID 0x00
 */
export default build(
  data => {
    switch (data[0]) {
      case 1:
        return { versionMatch: "TOO_HIGH" as const };
      case 2:
        return tooLowStructure.parse(data.subarray(1));
      default:
        return okStructure.parse(data.subarray(1));
    }
  },
  obj => {
    if (obj.versionMatch === "TOO_HIGH") {
      return new Uint8Array([1]);
    } else if (obj.versionMatch === "TOO_LOW") {
      const data = new Uint8Array(259);
      data[0] = 2;
      const length = tooLowStructure.generateTo(1, data, obj);
      return data.subarray(0, length);
    } else {
      const data = new Uint8Array(260);
      data[0] = 0;
      const length = okStructure.generateTo(1, data, obj);
      return data.subarray(0, length);
    }
  }
);
