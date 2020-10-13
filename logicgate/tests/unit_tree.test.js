const {getNode, convertToStringForBST, generateChildPosition, callToConvert} = require("./unit_trees.js");

/** UNIT + INTEGRATION TESTS */

let node1 = {isRoot: true, parent: null, value: 25, orderPlaced: 1, childType: () => {return ""}, cellCoords: {x: 6, y: 0}, root: null};
let node2 = {isRoot: false, parent: node1, value: 12, orderPlaced: 2, childType: () => {return "L"}, cellCoords: {x: 4, y: 3}, root: node1};
let node3 = {isRoot: false, parent: node1, value: 32, orderPlaced: 3, childType: () => {return "R"}, cellCoords: {x: 9, y: 4}, root: node1};
let node4 = {isRoot: false, parent: node3, value: 27, orderPlaced: 4, childType: () => {return "L"}, cellCoords: {x: 7, y: 6}, root: node1};

let nodes = [node1, node2, node3, node4];
let numNodes = nodes.length;

test("Takes in a value and / or order and returns the matching node", () => {
    expect(getNode(nodes, 25, 1)).toBe(node1);
    expect(getNode(nodes, 32, 1)).toBe(null);
    expect(getNode(nodes, 12)).toBe(node2);
    expect(getNode(nodes, null, 4)).toBe(node4);
});

test("Generates a tree string for reconstruction of a tree object", () => {
    expect(callToConvert(nodes, node1, numNodes, 15, 15)).toBe("15,15:25:ROOT:0,6#12:L:3,4#32:R:4,9#27:R.L:6,7");
});

test("Takes in a node and generates its position relative to the root", () => {
    expect(generateChildPosition(nodes[0])).toBe("ROOT");
    expect(generateChildPosition(nodes[1])).toBe("L");
    expect(generateChildPosition(nodes[2])).toBe("R");
    expect(generateChildPosition(nodes[3])).toBe("R.L");
});

test("Takes in all nodes and constructs a string representing the BST", () => {
    expect(convertToStringForBST(nodes, numNodes)).toBe("25:12#L:32#R:27#R.L");
});