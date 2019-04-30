export function decompress(hpfBytes: Uint8Array) {
  var k = 7;
  var val = 0;
  var l = 0;

  var int_odd: number[] = [];
  var int_even: number[] = [];
  var byte_pair = new Array<number>(513);

  for (let i = 0; i < 256; i++) {
    const base = 2 * i + 1;
    int_odd.push(base);
    int_even.push(base + 1);
    byte_pair[base] = i;
    byte_pair[base + 1] = i;
  }

  const result = [];

  while (val !== 0x100) {
    val = 0;

    while (val <= 0xff) {
      if (k === 7) {
        l++;
        k = 0;
      } else {
        k++;
      }

      if ((hpfBytes[4 + l - 1] & (1 << k)) != 0) {
        val = int_even[val];
      } else {
        val = int_odd[val];
      }
    }

    var val3 = val;
    var val2 = byte_pair[val];

    while (val3 != 0 && val2 != 0) {
      var i = byte_pair[val2];
      var j = int_odd[i];

      if (j == val2) {
        j = int_even[i];
        int_even[i] = val3;
      } else {
        int_odd[i] = val3;
      }

      if (int_odd[val2] == val3) {
        int_odd[val2] = j;
      } else {
        int_even[val2] = j;
      }

      byte_pair[val3] = i;
      byte_pair[j] = val2;
      val3 = i;
      val2 = byte_pair[val3];
    }

    val += 0xffffff00;

    if (val > 0xffffffff) {
      val -= 0x100000000;
    }

    result.push(val);
  }

  return new Uint8Array(result);
}
