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
const encoder = new TextEncoder();
words.sort((a_, b_) => {
    const a = encoder.encode(a_.entry.form);
    const b = encoder.encode(b_.entry.form);
    const min = Math.min(a.length, b.length);

    for (let i = 0; i < min; ++i) {
        if (a[i] !== b[i]) {
            return a[i] - b[i];
        }
    }
    
    if (a.length !== b.length) {
        return a.length - b.length;
    }
    return 0;
})

Deno.writeTextFileSync('./output.json', JSON.stringify(Otmjson, null, 2));
