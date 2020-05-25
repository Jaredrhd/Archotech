const { not, and, nand, or, nor, xor, xnor, manhattanDistance, pythagDistance, vectorMagnitude, addVectors } = require("./logic.js");

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

test("Takes in 2 inputs and applies XNOR gate", () => {
    expect(xnor(0, 0)).toBe(1);
    expect(xnor(1, 0)).toBe(0);
    expect(xnor(0, 1)).toBe(0);
    expect(xnor(1, 1)).toBe(1);
});

test("Takes in 2 points and returns the Manhattan distance", () => {
    let p1 = {x: 3.5, y: 6};
    let p2 = {x: -4.2, y: 10};
    expect(manhattanDistance(p1, p2)).toBe(11.7);
});

test("Takes in 2 points and calculates the Pythagorean distance", () => {
    let p1 = {x: 5, y: 3};
    let p2 = {x: 15, y: 2};
    expect(pythagDistance(p1, p2)).toBe(Math.sqrt(101));
});

test("Takes in a vector and returns the magnitude of the vector", () => {
    let u = {u1: 12, u2: 5};
    expect(vectorMagnitude(u)).toBe(13);
});

test("Takes in two vectors and returns their sum", () => {
    let u = {u1: 6, u2: 2.5};
    let v = {v1: 7.25, v2: 1};
    expect(addVectors(u, v)).toStrictEqual([13.25, 3.5]);
});