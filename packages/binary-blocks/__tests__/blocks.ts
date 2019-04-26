import { TextDecoder } from "util";
import {
  compile,
  record,
  field,
  uint8,
  array,
  transform,
  uint16be,
  uint16le,
  uint32be,
  uint32le,
  int8,
  int16be,
  int16le,
  int32be,
  int32le,
  string,
  boolean,
  skip,
  writeOnly
} from "../src";

Object.assign(global, { TextDecoder });

test("simple uint8", () => {
  const { generate, parse } = compile(record(field("id", uint8)));

  expect(parse(new Uint8Array([10]))).toEqual({ id: 10 });
  expect(generate({ id: 10 }).toString()).toEqual("10");
});

test("two uint8s", () => {
  const { generate, parse } = compile(
    record(field("id", uint8), field("id2", uint8))
  );

  expect(parse(new Uint8Array([10, 15]))).toEqual({ id: 10, id2: 15 });
  expect(generate({ id: 10, id2: 15 }).toString()).toEqual("10,15");
});

test("array", () => {
  const { generate, parse } = compile(
    record(field("vals", array({ of: uint8, length: 2 })))
  );

  expect(parse(new Uint8Array([10, 15]))).toEqual({ vals: [10, 15] });
  expect(generate({ vals: [10, 15] }).toString()).toEqual("10,15");
});

test("array with reading length", () => {
  const { generate, parse } = compile(
    record(field("vals", array({ of: uint8, length: uint16be })))
  );

  expect(parse(new Uint8Array([0, 2, 10, 15]))).toEqual({ vals: [10, 15] });
  expect(generate({ vals: [10, 15] }).toString()).toEqual("0,2,10,15");
});

test("transformed array", () => {
  const { generate, parse } = compile(
    record(
      field(
        "id",
        transform(
          array({ of: uint8, length: 4 }),
          function(val) {
            return val.join("-");
          },
          function(val) {
            return val.split("-").map(parseFloat);
          }
        )
      )
    )
  );

  expect(parse(new Uint8Array([10, 15, 0, 55]))).toEqual({ id: "10-15-0-55" });
  expect(generate({ id: "10-15-0-55" }).toString()).toEqual("10,15,0,55");
});

test("uint16be", () => {
  const { generate, parse } = compile(record(field("id", uint16be)));

  expect(parse(new Uint8Array([0x0a, 0x0b]))).toEqual({ id: 0x0a0b });
  expect(generate({ id: 0x0a0b }).toString()).toEqual("10,11");
});

test("uint16le", () => {
  const { generate, parse } = compile(record(field("id", uint16le)));

  expect(parse(new Uint8Array([0x0b, 0x0a]))).toEqual({ id: 0x0a0b });
  expect(generate({ id: 0x0a0b }).toString()).toEqual("11,10");
});

test("uint32be", () => {
  const { generate, parse } = compile(record(field("id", uint32be)));

  expect(parse(new Uint8Array([0x0a, 0x0b, 0x0c, 0x0d]))).toEqual({
    id: 0x0a0b0c0d
  });
  expect(generate({ id: 0x0a0b0c0d }).toString()).toEqual("10,11,12,13");
});

test("uint32le", () => {
  const { generate, parse } = compile(record(field("id", uint32le)));

  expect(parse(new Uint8Array([0x0a, 0x0b, 0x0c, 0x0d]))).toEqual({
    id: 0x0d0c0b0a
  });
  expect(generate({ id: 0x0d0c0b0a }).toString()).toEqual("10,11,12,13");
});

test("skip", () => {
  const { generate, parse } = compile(record(skip(2), field("id", uint8)));

  expect(parse(new Uint8Array([0, 0, 10]))).toEqual({ id: 10 });
  expect(generate({ id: 10 }).toString()).toEqual("0,0,10");
});

test("string", () => {
  const { generate, parse } = compile(record(field("message", string(uint8))));

  expect(
    parse(
      new Uint8Array([11, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])
    )
  ).toEqual({ message: "Hello world" });
  expect(generate({ message: "Hello world" }).toString()).toEqual(
    "11,72,101,108,108,111,32,119,111,114,108,100"
  );
});

test("boolean", () => {
  const { generate, parse } = compile(record(field("isGood", boolean)));

  expect(parse(new Uint8Array([1]))).toEqual({ isGood: true });
  expect(parse(new Uint8Array([0]))).toEqual({ isGood: false });

  expect(generate({ isGood: true }).toString()).toEqual("1");
  expect(generate({ isGood: false }).toString()).toEqual("0");
});

test("constant field", () => {
  const { generate, parse } = compile(record(field("value", "output")));

  console.info(parse + "");

  expect(parse(new Uint8Array([]))).toEqual({ value: "output" });

  expect(generate({ value: "output" }).toString()).toEqual("");
});

test("complex", () => {
  const { parse, generate } = compile(
    record(
      field(
        "ip",
        transform(
          array({ length: 4, of: uint8 }),
          function(val) {
            return val.reverse().join(".");
          },
          function(val) {
            return val
              .split(".")
              .reverse()
              .map(parseFloat);
          }
        )
      ),
      field("port", uint16be),
      skip(),
      field("seed", uint8),
      field("key", string(uint8, "euc-kr")),
      field("name", string(uint8, "euc-kr")),
      field("id", uint32le)
    )
  );

  const obj = {
    ip: "51.10.121.11",
    port: 2610,
    seed: 7,
    key: "okokDUDE",
    name: "watsMyNAMEEEE",
    id: 5438993
  };

  expect(JSON.stringify(parse(generate(obj)))).toEqual(JSON.stringify(obj));
});

test("int8", () => {
  const { generate, parse } = compile(record(field("id", int8)));

  expect(parse(new Uint8Array([246]))).toEqual({ id: -10 });
  expect(generate({ id: -10 }).toString()).toEqual("246");
});

test("int16le", () => {
  const { generate, parse } = compile(record(field("id", int16le)));

  expect(parse(new Uint8Array([187, 253]))).toEqual({ id: -581 });
  expect(generate({ id: -581 }).toString()).toEqual("187,253");
});

test("int16be", () => {
  const { generate, parse } = compile(record(field("id", int16be)));

  expect(parse(new Uint8Array([253, 187]))).toEqual({ id: -581 });
  expect(generate({ id: -581 }).toString()).toEqual("253,187");
});

test("int32le", () => {
  const { generate, parse } = compile(record(field("id", int32le)));

  expect(parse(new Uint8Array([136, 90, 166, 251]))).toEqual({ id: -72983928 });
  expect(generate({ id: -72983928 }).toString()).toEqual("136,90,166,251");
});

test("int32be", () => {
  const { generate, parse } = compile(record(field("id", int32be)));

  expect(parse(new Uint8Array([251, 166, 90, 136]))).toEqual({ id: -72983928 });
  expect(generate({ id: -72983928 }).toString()).toEqual("251,166,90,136");
});

test("nested records", () => {
  const { generate, parse } = compile(
    record(
      field("firstChild", record(field("id", uint8))),
      field("secondChild", record(field("id", uint8)))
    )
  );

  expect(parse(new Uint8Array([10, 12]))).toEqual({
    firstChild: { id: 10 },
    secondChild: { id: 12 }
  });
  expect(
    generate({
      firstChild: { id: 10 },
      secondChild: { id: 12 }
    }).toString()
  ).toEqual("10,12");
});

test("writeOnly", () => {
  const { generate, parse } = compile(
    record(writeOnly(uint16be, 3121), field("good", boolean))
  );

  expect(parse(new Uint8Array([0, 0, 1]))).toEqual({ good: true });
  expect(generate({ good: true }).toString()).toEqual("12,49,1");
});

test("direction", () => {
  const { generate, parse } = compile(
    record(
      field(
        "direction",
        transform(
          uint8,
          function(value) {
            return value === 0
              ? "up"
              : value === 1
              ? "right"
              : value === 2
              ? "down"
              : "left";
          },
          function(dir) {
            return dir === "up"
              ? 0
              : dir === "right"
              ? 1
              : dir === "down"
              ? 2
              : 3;
          }
        )
      )
    )
  );

  expect(parse(new Uint8Array([2]))).toEqual({ direction: "down" });
  expect(generate({ direction: "left" }).toString()).toEqual("3");
});
