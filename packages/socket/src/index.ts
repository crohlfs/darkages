// copying this https://github.com/mozilla/libdweb#tcpsocket-api
import { Socket, SocketConnectOpts } from "net";

export default class DarkagesSocket {
  private readHandler?: {
    promise: Promise<Buffer>;
    resolve: (socket: Buffer) => void;
    reject: () => void;
  };

  buffer: Buffer | null = null;

  constructor(socket: Socket) {
    socket.on("data", data => {
      if (!this.buffer) {
        this.buffer = data;
      } else {
        this.buffer = Buffer.concat([this.buffer, data]);
      }

      this.consumeBuffer();
    });

    socket.on("close", () => {
      //TODO: Make this reject after awaiting a packet while the socket is closed

      if (!this.readHandler) return;

      this.readHandler.reject();
    });

    this.writeBuffer = (buffer, resolve) => socket.write(buffer, resolve);
  }

  private writeBuffer: (buffer: Buffer, cb: () => void) => boolean;

  static connect(opts: SocketConnectOpts) {
    var socket = new Socket();

    return new Promise<DarkagesSocket>(resolve => {
      socket.connect(
        opts,
        () => {
          resolve(new DarkagesSocket(socket));
        }
      );
    });
  }

  read() {
    if (this.readHandler) return this.readHandler.promise;

    var promise = new Promise<Buffer>((resolve, reject) => {
      this.readHandler = {
        promise,
        resolve,
        reject
      };

      this.consumeBuffer();
    });

    return promise;
  }

  write(data: Uint8Array) {
    return new Promise<void>(resolve => {
      this.writeBuffer(
        Buffer.concat(
          [Uint8Array.from([0xaa, data.length >> 8, data.length & 255]), data],
          data.length + 3
        ),
        resolve
      );
    });
  }

  private consumeBuffer() {
    let payloadSize: number;
    while (
      this.readHandler &&
      this.buffer &&
      (payloadSize = this.buffer.readUInt16BE(1)) <= this.buffer.length - 3
    ) {
      const endIndex = payloadSize + 3;
      const payload = this.buffer.slice(3, endIndex);

      const nextIndex = endIndex;

      this.buffer =
        this.buffer.length === nextIndex ? null : this.buffer.slice(nextIndex);

      const resolve = this.readHandler.resolve;

      this.readHandler = undefined;
      resolve(payload);
    }
  }
}
