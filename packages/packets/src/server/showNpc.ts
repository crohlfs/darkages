import {
  compile,
  record,
  field,
  uint8,
  uint16be,
  uint32be,
  skip,
  transform,
  array,
  ValueParser,
  pipeToVariable
} from "@darkages/binary-blocks";
import { string8, direction } from "../shared";

export const npcType = transform(
  uint8,
  function(value) {
    return value === 0 ? "monster" : value === 1 ? "nonSolidMonster" : "npc";
  },
  function(value) {
    return value === "monster"
      ? 0
      : value === "nonSolidMonster"
      ? 1
      : value === "npc"
      ? 2
      : 3;
  }
);

/**
 * Packet ID 0x07
 */
export default compile(
  array({
    length: uint16be,
    of: record(
      field("x", uint16be),
      field("y", uint16be),
      field("id", uint32be),
      (context => {
        const [spriteVariable, spriteParser] = pipeToVariable(
          context,
          uint16be
        );

        const npcFields = [
          skip(4),
          field("direction", direction),
          skip(),
          field("npcType", npcType),
          field("name", string8)
        ].map(v => v(context));

        const skipField = skip(3)(context);

        return {
          get: `
let ${spriteVariable};
${spriteParser.get}
if ((${spriteVariable} & 0x8000) !== 0) {
  ${context.output}.type = "item";
  ${context.output}.sprite = ${spriteVariable} - 0x8000;
  ${skipField.get}
} else {
  ${context.output}.type = "npc";
  ${context.output}.sprite = ${spriteVariable} - 0x4000;
  ${npcFields.map(({ get }) => get).join(";")}
}
        `,
          put: `
if (${context.input}.type === "item") {
  const ${spriteVariable} = ${context.input}.sprite + 0x8000;
  ${spriteParser.put}
  ${skipField.put}
} else {
  const ${spriteVariable} = ${context.input}.sprite + 0x4000;
  ${spriteParser.put}
  ${npcFields.map(({ put }) => put).join(";")}
}
          `
        };
      }) as ValueParser<
        | {
            type: "npc";
            sprite: number;
            direction: "up" | "right" | "down" | "left";
            npcType: string;
            name: string;
          }
        | { type: "item"; sprite: number }
      >
    )
  })
);
