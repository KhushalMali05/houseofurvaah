const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function cropPNG(filePath) {
  const buffer = fs.readFileSync(filePath);
  
  // Read PNG signature and chunks
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  let idatBuffers = [];

  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    const data = buffer.slice(pos + 8, pos + 8 + length);
    pos += 12 + length;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatBuffers.push(data);
    }
  }

  console.log(`Original PNG info for ${path.basename(filePath)}: ${width}x${height}, BitDepth: ${bitDepth}, ColorType: ${colorType}`);

  if (colorType !== 6 || bitDepth !== 8) {
    console.log('Not RGBA 8-bit, skipping manual byte trim.');
    return false;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatBuffers));
  const rowBytes = width * 4 + 1;

  const raw = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(width * 4);

  for (let y = 0; y < height; y++) {
    const filter = decompressed[y * rowBytes];
    const srcRow = decompressed.slice(y * rowBytes + 1, (y + 1) * rowBytes);
    const dstRow = raw.slice(y * width * 4, (y + 1) * width * 4);

    for (let x = 0; x < width * 4; x++) {
      let val = srcRow[x];
      const left = x >= 4 ? dstRow[x - 4] : 0;
      const up = prevRow[x];
      const upLeft = x >= 4 ? prevRow[x - 4] : 0;

      if (filter === 1) { // Sub
        val = (val + left) & 0xff;
      } else if (filter === 2) { // Up
        val = (val + up) & 0xff;
      } else if (filter === 3) { // Average
        val = (val + Math.floor((left + up) / 2)) & 0xff;
      } else if (filter === 4) { // Paeth
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr = left;
        if (pb < pa && pb <= pc) pr = up;
        else if (pc < pa && pc <= pb) pr = upLeft;
        val = (val + pr) & 0xff;
      }
      dstRow[x] = val;
    }
    prevRow = dstRow;
  }

  // Find non-transparent bounding box (alpha > 10)
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let hasVisiblePixels = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = raw[(y * width + x) * 4 + 3];
      if (alpha > 10) {
        hasVisiblePixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasVisiblePixels) {
    console.log('No visible pixels found.');
    return false;
  }

  console.log(`Bounding box found: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  console.log(`Cropped dimensions: ${cropW}x${cropH} (Reduced from ${width}x${height})`);

  // Create cropped uncompressed buffer
  const croppedUnfiltered = Buffer.alloc(cropH * (cropW * 4 + 1));
  for (let y = 0; y < cropH; y++) {
    croppedUnfiltered[y * (cropW * 4 + 1)] = 0; // Filter 0 (None)
    const srcStart = ((minY + y) * width + minX) * 4;
    const srcEnd = srcStart + cropW * 4;
    raw.copy(croppedUnfiltered, y * (cropW * 4 + 1) + 1, srcStart, srcEnd);
  }

  const compressedIDAT = zlib.deflateSync(croppedUnfiltered);

  // Helper CRC32
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function createChunk(type, data) {
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const typeAndData = Buffer.concat([typeBuf, data]);
    const crcVal = crc32(typeAndData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([lenBuf, typeAndData, crcBuf]);
  }

  // Build cropped PNG
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(cropW, 0);
  ihdrData.writeUInt32BE(cropH, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', compressedIDAT);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const outBuffer = Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(filePath, outBuffer);
  console.log(`Successfully saved tightly cropped PNG to ${filePath}`);
  return true;
}

const targetPath = path.join(__dirname, '../public/assets/logo/house_of_urvaah_logo.png');
const rootPath = path.join(__dirname, '../Logo/house_of_urvaah_logo.png');

cropPNG(targetPath);
cropPNG(rootPath);
