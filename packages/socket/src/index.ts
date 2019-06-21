// copying this https://github.com/mozilla/libdweb#tcpsocket-api
import { Socket, SocketConnectOpts } from "net";
const BufferCollection = require("buffer-collection");

const HEADER_SIZE = 3;

export default class DarkagesSocket {
  socket: Socket;
  queue: Uint8Array[] = [];
  callback?: (buffer: Uint8Array) => void;

  constructor(socket: Socket) {
    this.socket = socket;

    const handlePayload = (buffer: Uint8Array) => {
      if (this.callback) {
        this.callback(buffer);
        this.callback = undefined;
      } else {
        this.queue.push(buffer);
      }
    };

    let buffers = new BufferCollection();

    function tryTakePacketFromBuffers() {
      if (buffers.readUInt8(0) != 0xaa) {
        console.error("Bad packet");
      }

      const payloadSize = buffers.readUInt16BE(1);
      const packetSize = payloadSize + HEADER_SIZE;

      if (buffers.length == packetSize) {
        const buff = buffers.shiftBuffer();
        handlePayload(buff.subarray(HEADER_SIZE));
      } else if (buffers.length > packetSize) {
        handlePayload(buffers.slice(HEADER_SIZE, packetSize).toBuffer());
        buffers = buffers.slice(packetSize);
        tryTakePacketFromBuffers();
      }
    }

    socket.on("data", data => {
      buffers.push(data);
      tryTakePacketFromBuffers();
    });
  }

  static connect(opts: SocketConnectOpts) {
    var socket = new Socket();

    return new Promise<DarkagesSocket>(resolve => {
      socket.connect(opts, () => {
        resolve(new DarkagesSocket(socket));
      });
    });
  }

  read() {
    const existing = this.queue.shift();

    if (existing) {
      return Promise.resolve(existing);
    } else {
      return new Promise<Uint8Array>(resolve => {
        this.callback = resolve;
      });
    }
  }

  write(data: Uint8Array) {
    return new Promise<Error | undefined>(resolve => {
      this.socket.write(
        Buffer.concat(
          [Uint8Array.from([0xaa, data.length >> 8, data.length]), data],
          data.length + 3
        ),
        resolve
      );
    });
  }
}
