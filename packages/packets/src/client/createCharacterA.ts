import { compile, record, field } from "@darkages/binary-blocks";
import { string8 } from "../shared";

/**
 * Packet ID 0x02
 * This packet should precede the packet which contains the gender, hair style and hair colour
 */
export default compile(
  record(
    field("username", string8),
    field("password", string8),
    field("email", string8)
  )
);
