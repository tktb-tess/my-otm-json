import otmjson from "./vl_ja.json" with { type: "json" };

otmjson.words.sort((a, b) => a.entry.id - b.entry.id);
otmjson.examples.sort((a, b) => a.id - b.id);

await Deno.mkdir('./out', { recursive: true });
Deno.writeTextFileSync(`./out/vl_ja_${Date.now()}.json`, JSON.stringify(otmjson, null, 2));