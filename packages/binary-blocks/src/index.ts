export type ValueParser<Value> = (
  context: Context
) => {
  get: string;
  put: string;
};

const getFunctionBody = (funcString: string) => {
  return funcString.slice(
    funcString.indexOf("{") + 1,
    funcString.lastIndexOf("}")
  );
};

function getArgs(funcString: string) {
  return funcString
    .replace(/[/][/].*$/gm, "")
    .replace(/\s+/g, "")
    .replace(/[/][*][^/*]*[*][/]/g, "")
    .split("){", 1)[0]
    .replace(/^[^(]*[(]/, "")
    .replace(/=[^,]+/g, "")
    .split(",")
    .filter(Boolean);
}

function setupTransformFunction(
  func: Function,
  argName: string,
  returnName: string
) {
  const funcString = func + "";

  const [valueArg] = getArgs(funcString);

  const val = getFunctionBody(funcString)
    .replace(new RegExp(`\\b${valueArg}\\b`), argName)
    .replace("return", returnName + " =");

  return val;
}

const createUintParser = (
  context: Context,
  bytes: number,
  endianness: "little" | "big"
) => {
  const keys = [...new Array(bytes).keys()];

  if (endianness === "big") {
    keys.reverse();
  }

  const valueVariable = context.availableVariables.shift()!;

  const get =
    context.output +
    " = " +
    keys
      .map(i => `data[offset++]${i === 0 ? "" : ` * 2 ** ${8 * i}`}`)
      .join(" + ") +
    ";";

  const put = `
let ${valueVariable} = ${context.input};
${keys
    .map(
      i => `data[offset${i > 0 ? ` + ${i}` : ""}] = ${valueVariable};
${valueVariable} = ${valueVariable} >>> 8;`
    )
    .join("\r\n")}
offset += ${bytes};`;

  return {
    get,
    put
  };
};

export const uint8: ValueParser<number> = context =>
  createUintParser(context, 1, "big");

export const uint16be: ValueParser<number> = context =>
  createUintParser(context, 2, "big");

export const uint16le: ValueParser<number> = context =>
  createUintParser(context, 2, "little");

export const uint32be: ValueParser<number> = context =>
  createUintParser(context, 4, "big");

export const uint32le: ValueParser<number> = context =>
  createUintParser(context, 4, "little");

export const int8: ValueParser<number> = context => {
  const uintParser = createUintParser(context, 1, "big");
  const valueVariable = context.availableVariables.shift()!;

  return {
    get: `
  const ${valueVariable} = data[offset++];
  ${
    context.output
  } = ${valueVariable} | (${valueVariable} & 2 ** 7) * 0x1fffffe;`,
    put: uintParser.put
  };
};

export const int16be: ValueParser<number> = context => {
  const uintParser = createUintParser(context, 2, "big");
  const valueVariable = context.availableVariables.shift()!;

  return {
    get: `
const ${valueVariable} = data[offset++] * 2 ** 8 + data[offset++];
${context.output} = ${valueVariable} | (${valueVariable} & 2 ** 15) * 0x1fffe;`,
    put: uintParser.put
  };
};

export const int16le: ValueParser<number> = context => {
  const uintParser = createUintParser(context, 2, "little");
  const valueVariable = context.availableVariables.shift()!;

  return {
    get: `
const ${valueVariable} = data[offset++] + data[offset++] * 2 ** 8;
${context.output} = ${valueVariable} | (${valueVariable} & 2 ** 15) * 0x1fffe;`,
    put: uintParser.put
  };
};

export const int32be: ValueParser<number> = context => {
  const uintParser = createUintParser(context, 4, "big");

  return {
    get: `${
      context.output
    } = (data[offset++] <<  24) + data[offset++] * 2 ** 16 + data[offset++] * 2 ** 8 + data[offset++];`,
    put: uintParser.put
  };
};

export const int32le: ValueParser<number> = context => {
  const uintParser = createUintParser(context, 4, "little");

  return {
    get: `${
      context.output
    } = data[offset++] + data[offset++] * 2 ** 8 + data[offset++] * 2 ** 16 + (data[offset++] <<  24);`,
    put: uintParser.put
  };
};

export const boolean: ValueParser<boolean> = context => ({
  get: `${context.output} = !!data[offset++];`,
  put: `data[offset++] = ${context.input} ? 1 : 0;`
});

export function skip(bytesToSkip = 1): ValueParser<{}> {
  const body = `offset += ${bytesToSkip};`;
  return () => ({
    get: body,
    put: body
  });
}

export function writeOnly<V extends string | number>(
  writer: ValueParser<V>,
  value: V
): ValueParser<{}> {
  return context => {
    const throwawayVariable = context.availableVariables.shift()!;

    const writerParser = writer({
      ...context,
      input: throwawayVariable,
      output: throwawayVariable
    });

    return {
      get: `
let ${throwawayVariable};
${writerParser.get}
`,
      put: `
const ${throwawayVariable} = ${JSON.stringify(value)};
${writerParser.put}
`
    };
  };
}

export interface Context {
  output: string;
  input: string;
  availableVariables: string[];
}

const addToContext = (context: Context, val: string) => ({
  ...context,
  output: context.output + val,
  input: context.input + val
});

export const array = <Value>(opts: {
  length: number | ValueParser<number>;
  of: ValueParser<Value>;
}) =>
  (context => {
    const itemVariable = context.availableVariables.shift()!;
    const itemParser = opts.of({
      ...context,
      input: itemVariable,
      output: itemVariable
    });

    const arrayVariable = context.availableVariables.shift()!;
    const lengthVariable = context.availableVariables.shift()!;

    let lengthParser;
    if (typeof opts.length !== "number") {
      lengthParser = opts.of({
        ...context,
        input: lengthVariable,
        output: lengthVariable
      });
    }

    const get = `
const ${arrayVariable} = [];
${lengthParser ? lengthParser.get : `const ${lengthVariable} = ${opts.length};`}
for (let i = 0; i < ${lengthVariable}; i++) {
  let ${lengthVariable};
  ${itemParser.get}
  ${arrayVariable}.push(${itemVariable});
}
${context.output} = ${arrayVariable}`;

    const put = `
${
      lengthParser
        ? `
const ${lengthVariable} = ${context.input}.length;
${lengthParser.put}
`
        : ""
    }
for (const ${itemVariable} of ${context.input}) {
  ${itemParser.put}
}
`;

    return {
      get,
      put
    };
  }) as ValueParser<Value[]>;

export const string = (
  length: ValueParser<number>,
  encoding: string = "utf8"
) =>
  (context => {
    const lengthVariable = context.availableVariables.shift()!;
    const outputTempVariable = context.availableVariables.shift()!;

    const lengthContext = {
      ...context,
      input: lengthVariable,
      output: lengthVariable
    };
    const { get: getLength, put: setLength } = length(lengthContext);

    const get = `
let ${lengthVariable};
${getLength}
${context.output}
  = new TextDecoder("${encoding}").decode(data.slice(offset, offset += ${lengthVariable}));`;

    const put = `
const ${lengthVariable} = ${context.input}.length;
${setLength}
const ${outputTempVariable}
  = Buffer.from(${context.input}, "ascii");

data.set(${outputTempVariable}, offset);
offset += ${context.input}.length;
  `;

    return {
      get,
      put
    };
  }) as ValueParser<string>;

export const transform = <Input, Output>(
  v: ValueParser<Input>,
  to: (val: Input) => Output,
  from: (val: Output) => Input
) =>
  (context => {
    const valueVariable = context.availableVariables.shift()!;

    const valueParser = v({
      ...context,
      input: valueVariable,
      output: valueVariable
    });

    const get = `
let ${valueVariable};
${valueParser.get}
${setupTransformFunction(to, valueVariable, context.output)}
`;

    const put = `
let ${valueVariable};
${setupTransformFunction(from, context.input, valueVariable)}
${valueParser.put}
`;

    return {
      get,
      put
    };
  }) as ValueParser<Output>;

export function field<N extends string, V extends string | number | boolean>(
  name: N,
  value: V
): ValueParser<{ [name in N]: V }>;
export function field<N extends string, V>(
  name: N,
  value: ValueParser<V>
): ValueParser<{ [name in N]: V }>;
export function field<N extends string, V>(
  name: N,
  value: any
): ValueParser<any> {
  return context =>
    typeof value === "function"
      ? value(addToContext(context, "." + name))
      : {
          get: `${context.output}.${name} = ${JSON.stringify(value)};`,
          put: ``
        };
}

export function record<V1>(field1: ValueParser<V1>): ValueParser<V1>;
export function record<V1, V2>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>
): ValueParser<V1 & V2>;
export function record<V1, V2, V3>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>
): ValueParser<V1 & V2 & V3>;
export function record<V1, V2, V3, V4>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>,
  field4: ValueParser<V4>
): ValueParser<V1 & V2 & V3 & V4>;
export function record<V1, V2, V3, V4, V5>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>,
  field4: ValueParser<V4>,
  field5: ValueParser<V5>
): ValueParser<V1 & V2 & V3 & V4 & V5>;
export function record<V1, V2, V3, V4, V5, V6>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>,
  field4: ValueParser<V4>,
  field5: ValueParser<V5>,
  field6: ValueParser<V6>
): ValueParser<V1 & V2 & V3 & V4 & V5 & V6>;
export function record<V1, V2, V3, V4, V5, V6, V7>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>,
  field4: ValueParser<V4>,
  field5: ValueParser<V5>,
  field6: ValueParser<V6>,
  field7: ValueParser<V7>
): ValueParser<V1 & V2 & V3 & V4 & V5 & V6 & V7>;
export function record<V1, V2, V3, V4, V5, V6, V7, V8>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>,
  field4: ValueParser<V4>,
  field5: ValueParser<V5>,
  field6: ValueParser<V6>,
  field7: ValueParser<V7>,
  field8: ValueParser<V8>
): ValueParser<V1 & V2 & V3 & V4 & V5 & V6 & V7 & V8>;
export function record<V1, V2, V3, V4, V5, V6, V7, V8, V9>(
  field1: ValueParser<V1>,
  field2: ValueParser<V2>,
  field3: ValueParser<V3>,
  field4: ValueParser<V4>,
  field5: ValueParser<V5>,
  field6: ValueParser<V6>,
  field7: ValueParser<V7>,
  field8: ValueParser<V8>,
  field9: ValueParser<V9>
): ValueParser<V1 & V2 & V3 & V4 & V5 & V6 & V7 & V8 & V9>;
export function record(...fields: ValueParser<any>[]) {
  return (context: Context) =>
    fields.reduce(
      (result, f) => {
        const field = f(context);
        return {
          get: result.get + field.get + "\r\n",
          put: result.put + field.put + "\r\n"
        };
      },
      { get: `${context.output} = {};`, put: "" }
    );
}

export function compile<Shape>(objectParser: ValueParser<Shape>) {
  const builtParser = objectParser({
    availableVariables: Array.from(Array(100).keys()).map(i => `tmp_${i}`),
    input: "obj",
    output: "obj"
  });

  let parse;
  let generateTo: (offset: number, data: Uint8Array, obj: Shape) => number;

  const parseFuncBody = `
  let offset = 0;
  let obj;
  ${builtParser.get}
  return obj;
    `;

  try {
    parse = new Function("data", parseFuncBody) as (data: Uint8Array) => Shape;
  } catch (ex) {
    console.info(parseFuncBody);
    throw ex;
  }

  const generateFuncBody = `
${builtParser.put}
return offset;
  `;

  try {
    generateTo = new Function("offset", "data", "obj", generateFuncBody) as any;
  } catch (ex) {
    console.info(parseFuncBody);
    throw ex;
  }

  return {
    parse,
    generate: (obj: Shape) => {
      let offset = 0;
      let data = new Uint8Array(2048);
      offset = generateTo(offset, data, obj);
      return data.subarray(0, offset);
    },
    generateTo
  };
}
