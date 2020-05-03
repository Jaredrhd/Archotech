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

module.exports = { not, and, nand };