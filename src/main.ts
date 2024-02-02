
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

// 少しアドホックな実装
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
    if (total <= 0 || Number.isInteger(total) === false) {
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

    if (!(chunk.range[0] <= variable && variable < chunk.range[1])) {
        return "";
    }

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

export const getAtomNumber = (input: string): number | null => {
    const index = ATOMS.findIndex((atom) => atom === input);
    if (index === -1) {
        return null;
    }
    return index + 1;
}

export const getChunk = (input: string): TYPE_CHUNK | null => {
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

export const getTotalValue = (digit: Digit[]) => digit.reduce((acc, cur) => {
    return acc + cur.vvalue * (getChunk(cur.chunk)?.value || 1);
}, 0);

// parse an Abelam numeral string
export const parseAbelam = (input: string): Digit[] => {
    if (input === "") {
        return [];
    }
    return vcLexer(input).map((candidate) => {
        let result: Digit[] = [];
        let minChunkValue = Infinity;
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
                let flag = false;
                for (let i = 0; i < result.length; i++) {
                    const currentVariableCandidate = result.slice(i, result.length);
                    const currentVariableCandidateValue = getTotalValue(currentVariableCandidate);

                    // 25 exception
                    if (chunk.value === 5 && !atom && currentVariableCandidateValue === 20) {
                        result.push({ ...vcl, vvalue: 1 });
                        flag = true;
                        break;
                    }
                    if (chunk.value === 5 && currentVariableCandidateValue === 5) {
                        continue;
                    }
                    if (currentVariableCandidateValue < chunk.range[1]) {
                        // 同じチャンクは同階層に共起しない
                        if (i >= 1) {
                            const prevChunk = getChunk(result[i - 1].chunk);
                            if (prevChunk && prevChunk.value <= chunk.value) {
                                continue;
                            }
                        }

                        flag = true;
                        result = [...result.slice(0, i), {
                            variable: currentVariableCandidate,
                            chunk: vcl.chunk,
                            vvalue: currentVariableCandidateValue
                        }]
                        break;
                    }
                }
                if (!flag) {
                    return undefined;
                }
            } else {
                if (atom === 1 && chunk.isOneDeletion) {
                    return undefined;
                }
                result.push({ ...vcl, vvalue: (atom || 1) });
            }
            minChunkValue = chunk.value;
        }
        return {
            variable: result,
            chunk: "",
            vvalue: getTotalValue(result),
        } as Digit;
    }).filter((v): v is Digit => (!!v));
}
