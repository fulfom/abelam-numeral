import { vcLexer } from "../src/main";

test('test', () => {
    expect(vcLexer("vyndyk tammba kymbyk tammba vyndyk")).toEqual([ //67
        [
            {
                variable: "vyndyk",
                chunk: "tammba",
            },
            {
                variable: "kymbyk",
                chunk: "tammba",
            },
            {
                variable: "vyndyk",
                chunk: "",
            }
        ]
    ]);
    expect(vcLexer("vyndyk vyndyk tammba tammba vyndyk vyndyk")).toEqual([ //29, 104
        [
            {
                variable: "vyndyk vyndyk",
                chunk: "tammba",
            },
            {
                variable: "",
                chunk: "tammba",
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "",
            }
        ],
        [
            {
                variable: "",
                chunk: "vyndyk vyndyk tammba tammba",
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "",
            }
        ]
    ]);
    expect(vcLexer("tammba vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba vyndyk vyndyk tammba vyndyk vyndyk")).toEqual([
        [
            {
                variable: "",
                chunk: "tammba",
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "vyndyk vyndyk tammba tammba",
            },
            {
                variable: "vyndyk",
                chunk: "tammba",
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "tammba",
            },
            {
                variable: "vyndyk vyndyk",
                chunk: "",
            }
        ]
    ]);
});