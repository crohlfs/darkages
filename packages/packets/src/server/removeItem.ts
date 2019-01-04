import { compile, record, field, uint8, skip } from "@darkages/binary-blocks";

/**
 * Packet ID 0x10
 */
export default compile(
  record(field("slot", uint8), skip(3) /* TODO: What is being skipped? */)
);
