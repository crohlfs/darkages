import {
  compile,
  record,
  field,
  uint16be,
  uint32be,
  uint8,
  boolean,
  transform
} from "@darkages/binary-blocks";
import { direction, string8 } from "../shared";

/**
 * Packet ID 0x33
 */
const displayUser = compile(
  transform(
    record(
      field("x", uint16be),
      field("y", uint16be),
      field("direction", direction),
      field("id", uint32be),
      field("helmet", uint16be),
      field("pantsAndGender", uint8),
      field("arms", uint16be),
      field("boots", uint8),
      field("armor", uint16be),
      field("shield", uint8),
      field("weapon", uint16be),
      field("hairColor", uint8),
      field("bootsColor", uint8),
      field("firstAccessoryColor", uint8),
      field("firstAccessory", uint16be),
      field("secondAccessoryColor", uint8),
      field("secondAccessory", uint16be),
      field("thirdAccessoryColor", uint8),
      field("thirdAccessory", uint16be),
      field("lanternSize", uint8),
      field("restPosition", uint8),
      field("overcoat", uint16be),
      field("overcoatColor", uint8),
      field("skinColor", uint8),
      field("invisible", boolean),
      field("faceShape", uint8),
      field("nameStyle", uint8),
      field("name", string8),
      field("groupName", string8)
    ),
    function(val) {
      const { arms, pantsAndGender, ...output } = val;

      const isFemale = pantsAndGender >= 32;

      return {
        ...output,
        gender: isFemale ? ("w" as const) : ("m" as const),
        pants: pantsAndGender - (isFemale ? 32 : 16)
      };
    },
    function(val) {
      return {
        ...val,
        arms: val.armor,
        pantsAndGender: (val.gender === "m" ? 16 : 32) + val.pants
      };
    }
  )
);

export default displayUser;
