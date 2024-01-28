import { parseAbelam, Digit } from "../src/main";

test('test', () => {
    expect(parseAbelam("vyndyk tammba kymbyk tammba vyndyk")).toEqual([ //67
        [
            {
                variable: [
                    {
                        variable: "vyndyk",
                        chunk: "tammba",
                        vvalue: 2,
                    },
                    {
                        variable: "kymbyk",
                        chunk: "",
                        vvalue: 3,
                    }
                ],
                chunk: "tammba",
                vvalue: 13,
            },
            {
                variable: "vyndyk",
                chunk: "",
                vvalue: 2,
            }
        ]
    ] satisfies Digit[][]);
    expect(parseAbelam("vyndyk vyndyk tammba tammba vyndyk vyndyk")).toEqual([ //29, 104
        [
            {
                variable: "vyndyk vyndyk",
                chunk: "tammba",
                vvalue: 4,
            },
            {
                variable: "",
                chunk: "tammba",
                vvalue: 1,
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "",
                vvalue: 4,
            }
        ],
        [
            {
                variable: "",
                chunk: "vyndyk vyndyk tammba tammba",
                vvalue: 1,
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "",
                vvalue: 4,
            }
        ]
    ] satisfies Digit[][]);
    expect(parseAbelam("tammba vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba vyndyk vyndyk tammba vyndyk vyndyk")).toEqual([
        [
            {
                variable: [
                    {
                        variable: "",
                        chunk: "tammba",
                        vvalue: 1,
                    },
                    {
                        variable: "vyndyk vyndyk",
                        chunk: "",
                        vvalue: 4,
                    },
                ],
                chunk: "vyndyk vyndyk tammba tammba",
                vvalue: 9,
            },
            {
                variable: [
                    {
                        variable: "vyndyk",
                        chunk: "tammba",
                        vvalue: 2,
                    },
                    {
                        variable: "vyndyk vyndyk",
                        chunk: "",
                        vvalue: 4,
                    },
                ],
                chunk: "tammba",
                vvalue: 14,
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "",
                vvalue: 4,
            }
        ]
    ] satisfies Digit[][]);

    //     expect(abelamToArabic("vyndyk vyndyk vyndyk tammba tammba vyndyk vyndyk tammba vyndyk vyndyk")).toBe([224]);
    //     expect(abelamToArabic("tammba kymbyk vyndyk vyndyk tammba tammba vyndyk tammba tammba vyndyk")).toBe([852]);
    //     expect(abelamToArabic("tammba vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba vyndyk vyndyk tammba vyndyk vyndyk")).toBe([974]);
    //     expect(abelamToArabic("vyndyk vyndyk tammba vyndyk vyndyk tammba tammba vyndyk vyndyk tammba vyndyk vyndyk")).toBe([2024]);
    //     expect(abelamToArabic("vyndyk vyndyk tammba tammba vyndyk")).toBe([27, 102]);
    //     expect(abelamToArabic("kymbyk tammba kymbyk tammba kymbyk")).toBe([93]);
    //     expect(abelamToArabic("vyndyk vyndyk vyndyk tammba tammba tammba")).toBe([205]);
    //     expect(abelamToArabic("vyndyk tammba vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba vyndyk vyndyk tammba vyndyk")).toBe([1472]);
    //     expect(abelamToArabic("tammba nakyrak tammba nakyrak")).toBe([31]);
    //     expect(abelamToArabic("vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba nakyrak tammba nakyrak")).toBe([456]);
    //     expect(abelamToArabic("vyndyk tammba kymbyk vyndyk vyndyk tammba tammba tammba vyndyk tammba vyndyk")).toBe([1337]);
});