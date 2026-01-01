import Otmjson from "./vl_ja.json" with { type: "json" };

const words = Otmjson.words;

for (const word of words) {
    const pro = word.contents.find((c) => c.title === 'Pronunciation');
    if (!pro) {
        continue;
    }
    const prev = pro.text;
    pro.text = prev.replaceAll('ɤ', 'ə').replaceAll('aɪ', 'ɐɪ').replaceAll('aʊ', 'ɑʊ');
}

Deno.writeTextFileSync('./output.json', JSON.stringify(Otmjson, null, 2));
