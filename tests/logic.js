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

function pythagDistance(p1, p2) {
    return Math.sqrt( Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2) );
}

module.exports = { not, and, nand, pythagDistance };