function not(a) {
    if (a == 0)
        return 1;
    return 0;
}

function and(a, b){
    if (a == 1 && b == 1)
        return 1;
    return 0;
}

function nand(a, b){
    if (a == 1 && b == 1)
        return 0;
    return 1;  
}

function or(a, b) {
    if(a == 1 || b == 1)
        return 1;
    return 0;
}

function nor(a, b) {
    if(a == 0 && b == 0)
        return 1;
    return 0;
}

function xor(a, b) {
    if(a != b)
        return 1;
    return 0;
}

function xnor(a, b) {
    if(a == b)
        return 1;
    return 0;
}

function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function pythagDistance(p1, p2) {
    return Math.sqrt( Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2) );
}

function midpoint(p1, p2) {
    return [(p1.x + p2.x)/2, (p1.y + p2.y)/2];
}

function vectorMagnitude(u) {
    return Math.sqrt(Math.pow(u.x, 2) + Math.pow(u.y, 2)); 
}

function addVectors(u, v) {
    return [u.x + v.x, u.y + v.y];
}

function dotProduct(u, v) {
    return (u.x * v.x) + (u.y * v.y);
}

function dotProductTheta(u, v, theta) {
    return Math.round( (Math.sqrt(Math.pow(u.x, 2) + Math.pow(u.y, 2)) * Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2)) * Math.cos(theta)) * 100 ) / 100;
}

function minkowskiDistance(p1, p2, n) {
    return Math.round( (Math.pow( Math.pow((p1.x - p2.x), n) + Math.pow((p1.y - p2.y), n), 1/n )) * 100 ) / 100;
}

function findDirectionVector(p1, p2) {
    return [p2.x - p1.x, p2.y - p1.y];
}

function subtractVectors(u, v) {
    return [u.x - v.x, u.y - v.y];
}

function calculateAngle(u, v) {
    let dot = u.x * v.x + u.y * v.y;
    let normU = Math.sqrt( Math.pow(u.x, 2) + Math.pow(u.y, 2) );
    let normV = Math.sqrt( Math.pow(v.x, 2) + Math.pow(v.y, 2) );
    return Math.round( Math.acos(dot / (normU * normV)) * 100) / 100;
}

function orthogonalVectors(u, v) {
    let dot = u.x * v.x + u.y * v.y;
    return dot == 0;
}

function xorAnd(a, b, c) {
    return and(xor(a, b), c);
}

function xnorAnd(a, b, c) {
    return and(xnor(a, b), c);
}

function xorNor(a, b, c) {
    return nor(xor(a, b), c);
}

function xnorNor(a, b, c) { 
    return nor(xnor(a, b), c);
}

function xorNand(a, b, c) {
    return nand(xor(a, b), c);
}

function orNand(a, b, c) {
    return nand(or(a, b), c);
}

function orXnor(a, b, c) {
    return xnor(or(a, b), c);
}

function orAnd(a, b, c) {
    return and(or(a, b), c);
}

function checkOrthogonalAfterSum(v1, v2, v3, v4) {
    let u = {x: addVectors(v1, v2)[0], y: addVectors(v1, v2)[1]};
    let v = {x: addVectors(v3, v4)[0], y: addVectors(v3, v4)[1]};

    return orthogonalVectors(u, v);
}

module.exports = { not, and, nand, or, nor, xor, xnor, manhattanDistance, 
                   pythagDistance, midpoint, vectorMagnitude, addVectors, dotProduct, dotProductTheta,
                   minkowskiDistance, findDirectionVector, subtractVectors, calculateAngle, orthogonalVectors, xorAnd, 
                   xnorAnd, xorNor, xnorNor, xorNand, orNand, orXnor, orAnd, checkOrthogonalAfterSum };