
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
