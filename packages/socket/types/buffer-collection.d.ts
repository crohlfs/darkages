declare module "buffer-collection" {
  export class BufferCollection extends Buffer {
    constructor();

    push(buff: Buffer): any;
    compact(): void;
    count: number;
    shiftBuffer(): Buffer;
    slice(start: number, end?: number): BufferCollection;
    toBuffer(): Buffer;
  }

  // class index {
  //   static alloc(size: any, fill: any, encoding: any): any;
  //   static allocUnsafe(size: any): any;
  //   static allocUnsafeSlow(size: any): any;
  //   static byteLength(string: any, encoding: any): any;
  //   static concat(list: any, totalLength: any): any;
  //   static from(args: any): any;
  //   static isBuffer(buf: any): any;
  //   static isEncoding(encoding: any): any;
  //   static poolSize: any;
  //   compact(): any;
  //   compare(
  //     target: any,
  //     targetStart: any,
  //     targetEnd: any,
  //     sourceStart: any,
  //     sourceEnd: any
  //   ): any;
  //   copy(target: any, targetStart: any, sourceStart: any, sourceEnd: any): any;
  //   entries(): any;
  //   equals(cmpBuf: any): any;
  //   fill(value: any, offset: any, end: any, encoding: any): any;
  //   get(offset: any): any;
  //   includes(value: any, startOffset: any): any;
  //   indexOf(value: any, startOffset: any): any;
  //   inspect(): any;
  //   keys(): any;
  //   lastIndexOf(value: any, startOffset: any): any;
  //   push(obj: any): any;
  //   read(len: any): any;
  //   readDoubleBE(offset: any, noAssert: any): any;
  //   readDoubleLE(offset: any, noAssert: any): any;
  //   readFloatBE(offset: any, noAssert: any): any;
  //   readFloatLE(offset: any, noAssert: any): any;
  //   readInt16BE(offset: any, noAssert: any): any;
  //   readInt16LE(offset: any, noAssert: any): any;
  //   readInt24BE(offset: any, noAssert: any): any;
  //   readInt24LE(offset: any, noAssert: any): any;
  //   readInt32BE(offset: any, noAssert: any): any;
  //   readInt32LE(offset: any, noAssert: any): any;
  //   readInt40BE(offset: any, noAssert: any): any;
  //   readInt40LE(offset: any, noAssert: any): any;
  //   readInt48BE(offset: any, noAssert: any): any;
  //   readInt48LE(offset: any, noAssert: any): any;
  //   readInt8(offset: any, noAssert: any): any;
  //   readIntBE(offset: any, byteLength: any, noAssert: any): any;
  //   readIntLE(offset: any, byteLength: any, noAssert: any): any;
  //   readUInt16BE(offset: any, noAssert: any): any;
  //   readUInt16LE(offset: any, noAssert: any): any;
  //   readUInt24BE(offset: any, noAssert: any): any;
  //   readUInt24LE(offset: any, noAssert: any): any;
  //   readUInt32BE(offset: any, noAssert: any): any;
  //   readUInt32LE(offset: any, noAssert: any): any;
  //   readUInt40BE(offset: any, noAssert: any): any;
  //   readUInt40LE(offset: any, noAssert: any): any;
  //   readUInt48BE(offset: any, noAssert: any): any;
  //   readUInt48LE(offset: any, noAssert: any): any;
  //   readUInt8(offset: any, noAssert: any): any;
  //   readUIntBE(offset: any, byteLength: any, noAssert: any): any;
  //   readUIntLE(offset: any, byteLength: any, noAssert: any): any;
  //   set(offset: any, value: any): void;
  //   shiftBuffer(): any;
  //   slice(start: any, end: any): any;
  //   swap16(): any;
  //   swap32(): any;
  //   swap64(): any;
  //   toBuffer(): any;
  //   toJSON(): any;
  //   toString(encoding: any, start: any, end: any): any;
  //   values(): any;
  //   write(string: any, offset: any, length: any, encoding: any): any;
  //   writeDoubleBE(value: any, offset: any, noAssert: any): any;
  //   writeDoubleLE(value: any, offset: any, noAssert: any): any;
  //   writeFloatBE(value: any, offset: any, noAssert: any): any;
  //   writeFloatLE(value: any, offset: any, noAssert: any): any;
  //   writeInt16BE(value: any, offset: any, noAssert: any): any;
  //   writeInt16LE(value: any, offset: any, noAssert: any): any;
  //   writeInt32BE(value: any, offset: any, noAssert: any): any;
  //   writeInt32LE(value: any, offset: any, noAssert: any): any;
  //   writeInt8(value: any, offset: any, noAssert: any): any;
  //   writeIntBE(value: any, offset: any, byteLength: any, noAssert: any): any;
  //   writeIntLE(value: any, offset: any, byteLength: any, noAssert: any): any;
  //   writeUInt16BE(value: any, offset: any, noAssert: any): any;
  //   writeUInt16LE(value: any, offset: any, noAssert: any): any;
  //   writeUInt32BE(value: any, offset: any, noAssert: any): any;
  //   writeUInt32LE(value: any, offset: any, noAssert: any): any;
  //   writeUInt8(value: any, offset: any, noAssert: any): any;
  //   writeUIntBE(value: any, offset: any, byteLength: any, noAssert: any): any;
  //   writeUIntLE(value: any, offset: any, byteLength: any, noAssert: any): any;
  // }
}
