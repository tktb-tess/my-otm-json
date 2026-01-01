import otmjson from "./vl_ja.json" with { type: "json" };

const words = otmjson.words;

for (const word of words) {
  const pro = word.contents.find((c) => c.title === "Pronunciation");
  if (!pro) {
    continue;
  }
  const prev = pro.text;
  pro.text = prev.replaceAll("ɤ", "ə").replaceAll("aɪ", "ɐɪ").replaceAll(
    "aʊ",
    "ɑʊ",
  );
}

words.sort((a, b) => a.entry.id - b.entry.id);

Deno.writeTextFileSync("./output.json", JSON.stringify(otmjson, null, 2));
