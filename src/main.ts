
// atoms and chunks in Abelam
type TYPE_CHUNK = {
    type: string,
    value: number,
    form: string,
    isOneDeletion: boolean,
    range: [number, number],
}

const ATOMS = [
    "nakyrak",
    "vyndyk",
    "kymbyk",
    "vyndyk vyndyk",
]

const atomRange = ATOMS.length;

// この言語には不要なので，type = "a" の場合の実装はナシ
const CHUNKS: TYPE_CHUNK[] = [
    {
        type: "m",
        value: 5,
        form: "tammba",
        isOneDeletion: true,
        range: [1, 20],
    },
    {
        type: "m",
        value: 100,
        form: "vyndyk vyndyk tammba tammba",
        isOneDeletion: true,
        range: [1, 100],
    }
]

// Arabic numerals to Abelam numerals
export const arabicToAbelam = (total: number, isOneDeletion: boolean = false): string => {
    if (total === 0) {
        return ""
    }
    if (total === 1 && isOneDeletion) {
        return ""
    }
    if (total <= atomRange) {
        return ATOMS[total - 1];
    }

    // find a chunk with the highest value that is smaller than total
    const chunk: TYPE_CHUNK = CHUNKS.sort((a, b) => b.value - a.value).find((c) => total >= c.value)!;

    const variable = Math.floor(total / chunk.value);

    // exceptional 25
    if (chunk.value === 5 && variable === 5) {
        return `${arabicToAbelam(4, chunk.isOneDeletion)} ${chunk.form} ${chunk.form} ${arabicToAbelam(total % chunk.value)}`.trim();
    }

    return `${arabicToAbelam(variable, chunk.isOneDeletion)} ${chunk.form} ${arabicToAbelam(total % chunk.value)}`.trim();
}

export type VCLex = {
    variable: string,
    chunk: string,
}

export type Digit = {
    variable: string | Digit[],
    chunk: string,
    vvalue: number,
}

const getAtomNumber = (input: string): number | null => {
    const index = ATOMS.findIndex((atom) => atom === input);
    if (index === -1) {
        return null;
    }
    return index + 1;
}

const getChunk = (input: string): TYPE_CHUNK | null => {
    const index = CHUNKS.findIndex((chunk) => chunk.form === input);
    if (index === -1) {
        return null;
    }
    return CHUNKS[index];
}

export const vcLexer = (input: string): VCLex[][] => {
    if (input === "") {
        return [[]];
    }

    const vWithoutC = input.match(new RegExp(`^(${ATOMS.join("|")})$`, "i"));
    if (vWithoutC) {
        return [[{
            variable: vWithoutC[0],
            chunk: "",
        }]];
    }

    let candidates: VCLex[][] = [];
    // 複数の候補がある場合は，それぞれの候補を配列に入れて返す
    for (const chunk of CHUNKS) {
        const match = input.match(new RegExp(`^(?<v>${ATOMS.join("|")}|)\\s?(?<c>${chunk.form})\\s?(?<r>.*)$`, "i"));
        if (!match) {
            continue;
        }

        const { v, c, r } = match.groups as { v: string, c: string, r: string };
        // console.log(`v: ${v}, c: ${c}, r: ${r}`);
        for (const candidate of vcLexer(r)) {
            candidates.push([{
                variable: v,
                chunk: c,
            }, ...candidate]);
        }
    }
    return candidates;
}

// parse an Abelam numeral string
export const parseAbelam = (input: string): Digit[][] => {
    return vcLexer(input).map((candidate) => {
        let result: Digit[] = [];
        let minChunkValue = Infinity;
        let currentValue = 0;
        for (const vcl of candidate) {
            const atom = getAtomNumber(vcl.variable);
            const chunk = getChunk(vcl.chunk);
            if (!chunk) {
                minChunkValue = 0;
                result.push({ ...vcl, vvalue: atom || 0 });
                break;
            }
            if (minChunkValue <= chunk.value) {
                if (atom) {
                    result.push({
                        variable: vcl.variable,
                        chunk: "",
                        vvalue: atom,
                    });
                }
                for (let i = 0; i < result.length; i++) {
                    const currentVariableCandidate = result.slice(i, result.length);
                    const currentVariableCandidateValue = currentVariableCandidate.reduce((acc, cur) => {
                        return acc + cur.vvalue * (getChunk(cur.chunk)?.value || 1);
                    }, 0);

                    // 25 exception
                    if (chunk.value === 5 && !atom && currentVariableCandidateValue === 20) {
                        currentValue += chunk.value;
                        result.push({ ...vcl, vvalue: 1 });
                        break;
                    }
                    if (currentVariableCandidateValue < chunk.range[1]) {
                        result = [...result.slice(0, i), {
                            variable: currentVariableCandidate,
                            chunk: vcl.chunk,
                            vvalue: currentVariableCandidateValue
                        }]
                        break;
                    }
                }
            } else {
                currentValue += (atom || 1) * chunk.value;
                result.push({ ...vcl, vvalue: (atom || 1) });
            }
            minChunkValue = chunk.value;
        }
        return result;
    });

    // 人間の逐次的な読み方を再現する．
    // 左端から入れ子のない範囲を探す．終端は chunk.value <= nextChunk.value となる nextChunk が出てくるか，文字列の終端

    // v c*5 v c*100 v c*5 v c*5 v
    // (v c*5 v c*100 v c*5 v c*5 v
    // (v c*5 v) c*100 v c*5 v c*5 v (C*100 は (v c*5 v) を range に含むので)

    // チャンク
    // 1. 
    // (v c*5 v) c*100 (v c*5 v c*5 v
    // (v c*5 v) c*100 (v c*5 v) c*5 v (C*5 は (v c*5 v) を range に含むので)

    // 2.
    // ((v c*5 v) c*100 v c*5 v c*5 v
    // ((v c*5 v) c*100 v) c*5 v c*5 v → C*5.range に収まらないので不正

    // 現在の想定チャンクより大きいチャンクが出てきた場合，
    // e.g. ((v c*5), v) c*100|
    // e.g. ((((v c*5), v) c*5)| v) c*100|
    // e.g. (v c*5) c*5|

    // 25 exception
    // e.g. (4 c*5) c*5| or (4 c*5) (c*5)|

    // digitsCandidates.push([{
    //     variable: `${v} ${c} ${candidate[0].variable}`,
    //     chunk: candidate[0].chunk,
    // }, ...candidate.slice(1)])

}

// Abelam to Arabic numerals

// export const abelamToArabic = (input: string): number[] => {

// }