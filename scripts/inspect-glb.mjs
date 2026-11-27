// Inspect a .glb file's embedded JSON chunk (animations, materials, meshes)
// No deps beyond Node's built-in fs - safe on a near-full disk.
import fs from 'fs';

const path = process.argv[2];
const buf = fs.readFileSync(path);

// GLB header: magic(4) + version(4) + length(4) = 12 bytes
const magic = buf.toString('ascii', 0, 4);
if (magic !== 'glTF') throw new Error('Not a glb file');

let offset = 12;
let json = null;
while (offset < buf.length) {
  const chunkLength = buf.readUInt32LE(offset);
  const chunkType = buf.toString('ascii', offset + 4, offset + 8);
  const chunkData = buf.subarray(offset + 8, offset + 8 + chunkLength);
  if (chunkType === 'JSON') {
    json = JSON.parse(chunkData.toString('utf8'));
    break;
  }
  offset += 8 + chunkLength;
}

if (!json) throw new Error('No JSON chunk found');

console.log('--- animations ---');
(json.animations || []).forEach((a, i) => console.log(i, a.name));

console.log('--- materials ---');
(json.materials || []).forEach((m, i) => console.log(i, m.name));

console.log('--- meshes ---');
(json.meshes || []).forEach((m, i) => console.log(i, m.name));

console.log('--- nodes (named) ---');
(json.nodes || []).forEach((n, i) => { if (n.name) console.log(i, n.name); });

console.log('--- extras / morph target names on meshes ---');
(json.meshes || []).forEach((m, i) => {
  if (m.extras && m.extras.targetNames) console.log('mesh', i, m.name, '->', m.extras.targetNames);
});
