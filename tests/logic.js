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

function vectorMagnitude(u) {
    return Math.sqrt(Math.pow(u.u1, 2) + Math.pow(u.u2, 2)) 
}

module.exports = { not, and, nand, or, nor, xor, xnor, manhattanDistance, pythagDistance, vectorMagnitude };