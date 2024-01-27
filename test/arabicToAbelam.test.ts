import { arabicToAbelam } from "../src/main";

test('test', () => {
    expect(arabicToAbelam(1)).toBe("nakyrak");
    // expect(arabicToAbelam(29)).toBe("tammba tammba vyndyk vyndyk");
    expect(arabicToAbelam(29)).toBe("vyndyk vyndyk tammba tammba vyndyk vyndyk");
    expect(arabicToAbelam(67)).toBe("vyndyk tammba kymbyk tammba vyndyk");
    expect(arabicToAbelam(224)).toBe("vyndyk vyndyk vyndyk tammba tammba vyndyk vyndyk tammba vyndyk vyndyk");
    expect(arabicToAbelam(852)).toBe("tammba kymbyk vyndyk vyndyk tammba tammba vyndyk tammba tammba vyndyk");
    expect(arabicToAbelam(974)).toBe("tammba vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba vyndyk vyndyk tammba vyndyk vyndyk");
    expect(arabicToAbelam(2024)).toBe("vyndyk vyndyk tammba vyndyk vyndyk tammba tammba vyndyk vyndyk tammba vyndyk vyndyk");
    expect(arabicToAbelam(102)).toBe("vyndyk vyndyk tammba tammba vyndyk");
    expect(arabicToAbelam(93)).toBe("kymbyk tammba kymbyk tammba kymbyk");
    expect(arabicToAbelam(205)).toBe("vyndyk vyndyk vyndyk tammba tammba tammba");
    expect(arabicToAbelam(1472)).toBe("vyndyk tammba vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba vyndyk vyndyk tammba vyndyk");
    expect(arabicToAbelam(31)).toBe("tammba nakyrak tammba nakyrak");
    expect(arabicToAbelam(456)).toBe("vyndyk vyndyk vyndyk vyndyk tammba tammba vyndyk tammba nakyrak tammba nakyrak");
    expect(arabicToAbelam(1337)).toBe("vyndyk tammba kymbyk vyndyk vyndyk tammba tammba tammba vyndyk tammba vyndyk");
})