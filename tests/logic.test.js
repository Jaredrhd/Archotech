const { not, and, nand, or, nor, xor, pythagDistance } = require("./logic.js");

test("Takes in 1 input and applies NOT gate logic", () => {
    expect(not(0)).toBe(1);
    expect(not(1)).toBe(0);
});

test("Takes in 2 inputs and applies AND gate logic", () => {
    expect(and(0, 0)).toBe(0);
    expect(and(0, 1)).toBe(0);
    expect(and(1, 0)).toBe(0);
    expect(and(1, 1)).toBe(1);
});

test("Takes in 2 inputs and applies NAND gate logic", () => {
    expect(nand(0, 0)).toBe(1);
    expect(nand(0, 1)).toBe(1);
    expect(nand(1, 0)).toBe(1);
    expect(nand(1, 1)).toBe(0);
});

test("Takes in 2 inputs and applies OR gate", () => {
    expect(or(0, 0)).toBe(0);
    expect(or(1, 0)).toBe(1);
    expect(or(0, 1)).toBe(1);
    expect(or(1, 1)).toBe(1);
});

test("Takes in 2 inputs and applies NOR gate", () => {
    expect(nor(0, 0)).toBe(1);
    expect(nor(1, 0)).toBe(0);
    expect(nor(0, 1)).toBe(0);
    expect(nor(1, 1)).toBe(0);
});

test("Takes in 2 inputs and applies XOR gate", () => {
    expect(xor(0, 0)).toBe(0);
    expect(xor(1, 0)).toBe(1);
    expect(xor(0, 1)).toBe(1);
    expect(xor(1, 1)).toBe(0);
});

test("Takes in 2 points and calculates the Pythagorean distance", () => {
    let p1 = {x: 5, y: 3};
    let p2 = {x: 15, y: 2};
    expect(pythagDistance(p1, p2)).toBe(Math.sqrt(101));
});