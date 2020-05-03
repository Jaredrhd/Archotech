const not = require("./logic.js");

test("Takes in 1 input and applies NOT gate logic", () => {
    expect(not(0)).toBe(1);
    expect(not(1)).toBe(0);
});