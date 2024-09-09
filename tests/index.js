import fs from "node:fs/promises";
import tape from "tape";
import parseOsmChangeXML from "../index.js";

for await (const filename of fs.glob("tests/data/*.osc")) {
  tape(`testing file: ${filename}`, async (t) => {
    const input = await fs.readFile(filename);
    const expected = JSON.parse(await fs.readFile(filename.replace(".osc", ".json")));

    const actual = await parseOsmChangeXML(input);

    t.deepEqual(actual, expected);
    t.end();
  });
}
