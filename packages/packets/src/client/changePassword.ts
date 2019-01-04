import { compile, record, field } from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x26
 */
export default compile(
  record(
    field("username", string8),
    field("currentPassword", string8),
    field("newPassword", string8)
  )
);
