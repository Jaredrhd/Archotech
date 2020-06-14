const { not, and, nand, or, nor, xor, xnor, manhattanDistance, 
        pythagDistance, midpoint, vectorMagnitude, addVectors, dotProduct, dotProductTheta,
        minkowskiDistance, findDirectionVector, subtractVectors, calculateAngle, orthogonalVectors,
        xorAnd, xnorAnd, xorNor, xnorNor, checkOrthogonalAfterSum } = require("./logic.js");

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

test("Takes in 2 points and calculates the midpoint between them", () => {
    let p1 = {x: 17, y: 4};
    let p2 = {x: 7, y: 21};
    expect(midpoint(p1, p2)).toStrictEqual([12, 12.5]);
});

test("Takes in a vector and returns the magnitude of the vector", () => {
    let u = {x: 12, y: 5};
    expect(vectorMagnitude(u)).toBe(13);
});

test("Takes in two vectors and returns their sum", () => {
    let u = {x: 6, y: 2.5};
    let v = {x: 7.25, y: 1};
    expect(addVectors(u, v)).toStrictEqual([13.25, 3.5]);
});

test("Takes in two vectors and returns the dot product", () => {
    let u = {x: 4, y: 9};
    let v = {x: 13, y: 3.75};
    expect(dotProduct(u, v)).toBe(85.75);
});

test("Takes in two vectors and the angle between them and returns the dot product", () => {
    let u = {x: 7, y: 5};
    let v = {x: 19, y: 12};
    let theta = Math.PI/4;
    expect(dotProductTheta(u, v, theta)).toBe(136.69);
});

test("Takes in 2 points and an order n and returns the Minkowski distance", () => {
    let p1 = {x: 7.6, y: -3};
    let p2 = {x: -1.1, y: 4.2};
    let n = 3;
    expect(minkowskiDistance(p1, p2, n)).toBe(6.58);
});

test("Takes in 2 points p1 and p2 and returns a direction vector from p1 to p2", () => {
    let p1 = {x: 5, y: -2};
    let p2 = {x: -1, y: 8};
    expect(findDirectionVector(p1, p2)).toStrictEqual([-6, 10]);
});

test("Takes in 2 vectors u and v and subtracts them", () => {
    let u = {x: 10, y: -4.5};
    let v = {x: 3, y: 12};
    expect(subtractVectors(u, v)).toStrictEqual([7, -16.5]);
});

test("Takes in 2 vectors and returns the angle between them in radians", () => {
    let u = {x: -5, y: 2};
    let v = {x: 10, y: -3};
    expect(calculateAngle(u, v)).toBe(3.05);
});

test("Takes in 2 vectors and returns whether they are orthogonal", () => {
    let u = {x: 3, y: 5};
    let v = {x: 6, y: 2};
    expect(orthogonalVectors(u, v)).toBe(false);
});

test("Takes in 3 inputs, applies xor gate to first two and and gate to final expression", () => {
    expect(xorAnd(0, 1, 1)).toBe(1);
    expect(xorAnd(1, 1, 1)).toBe(0);
    expect(xorAnd(1, 1, 0)).toBe(0);
});

test("Takes in 3 inputs, applies xnor gate to first two and and gate to final expression", () => {
    expect(xnorAnd(1, 1, 0)).toBe(0);
    expect(xnorAnd(0, 0, 1)).toBe(1);
    expect(xnorAnd(0, 1, 1)).toBe(0);
});

test("Takes in 3 inputs, applies xor gate to first two and nor gate to final expression", () => {
    expect(xorNor(1, 0, 0)).toBe(0);
    expect(xorNor(1, 1, 0)).toBe(1);
    expect(xorNor(0, 1, 0)).toBe(0);
});

test("Takes in 3 inputs, applies xnor gate to first two and nor gate to final expression", () => {
    expect(xnorNor(1, 0, 0)).toBe(1);
    expect(xnorNor(1, 1, 0)).toBe(0);
    expect(xnorNor(0, 0, 1)).toBe(0);
});

test("Takes in 4 vectors, sums pairs of vectors and checks their orthogonality after summing", () => {
    let v1 = {x: 4, y: -1};
    let v2 = {x: 3, y: 5};
    let v3 = {x: 12, y: -5};
    let v4 = {x: 5, y: 8};
    expect(checkOrthogonalAfterSum(v1, v2, v3, v4)).toBe(false);

    v1 = {x: 0, y: -1};
    v2 = {x: 1, y: 1};
    v3 = {x: -4, y: 1};
    v4 = {x: 4, y: 0};
    expect(checkOrthogonalAfterSum(v1, v2, v3, v4)).toBe(true);
});