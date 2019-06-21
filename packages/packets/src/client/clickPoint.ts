import {
  compile,
  record,
  field,
  uint32be,
  uint16be
} from "@darkages/binary-blocks";
import { build } from "../shared";

const entityStructure = compile(
  record(field("type", "ENTITY"), field("entityId", uint32be))
);

const mapTileStructure = compile(
  record(field("type", "MAP_TILE"), field("x", uint16be), field("y", uint16be))
);

/**
 * Packet ID 0x43
 */
export default build(
  data =>
    data[0] === 3
      ? mapTileStructure.parse(data.subarray(1))
      : entityStructure.parse(data.subarray(1)),
  obj => {
    const data = new Uint8Array(5);

    if (obj.type === "MAP_TILE") {
      data[0] = 3;
      mapTileStructure.generateTo(1, data, obj);
    } else {
      data[0] = 1;
      entityStructure.generateTo(1, data, obj);
    }

    return data;
  }
);
