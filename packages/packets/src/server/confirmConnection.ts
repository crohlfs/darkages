import { build } from "../shared";

/**
 * Packet ID 0x7e
 */
export default build(
  data => ({ message: "CONNECTED SERVER\n" }),
  obj => {
    const data = new Uint8Array(18);

    data[0] = 0x1b;
    data.set(Buffer.from("CONNECTED SERVER\n", "ascii"), 1);

    return data;
  }
);
