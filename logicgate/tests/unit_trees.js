let string = "";

function convertToString(nodes, node, numNodes, ROWS, COLS) {
    if(!node) return string;

    if(node.isRoot) {
        string += ROWS + "," + COLS + ":" + node.value + ":ROOT:" + node.cellCoords.y + "," + node.cellCoords.x;
    }
    else {
        string += node.value + ":" + generateChildPosition(node) + ":" + node.cellCoords.y + "," + node.cellCoords.x;
    }

    if(string.split("#").length !== numNodes) {
        string += "#";
    }
    
    convertToString(nodes, getNode(nodes, null, node.orderPlaced + 1), numNodes, ROWS, COLS);
}

function getNode(nodes, value, order = null) {
    for(const node of nodes) {
        if(value && order) {
            if(node.value === value && node.orderPlaced === order) return node;
        }
        else if(value) {
            if(node.value === value) return node;
        }
        else if(order) {
            if(node.orderPlaced === order) return node;
        }
        else {
            break; // Nothing specified - return null
        }
    }

    return null;
}

function convertToStringForBST(nodes, numNodes) {
    let string = "";

    for(const node of nodes) {
        if(node.isRoot) {
            string += node.value;
        }
        else {
            string += node.value + "#" + generateChildPosition(node);
        }

        if(string.split(":").length !== numNodes) {
            string += ":";
        }
    }

    return string;
}

function generateChildPosition(node) {
    let childPos = "";

    while(!node.isRoot) {
        if(node.parent === node.root) {
            childPos += node.childType();
        }
        else {
            childPos += node.childType() + ".";
        }

        node = node.parent;
    }

    childPos = childPos.split("").reverse().join(""); // Get child position from root to child instead of from child to root e.g. LLR not RLL

    if(childPos === "") childPos = "ROOT";

    return childPos;
}

function callToConvert(nodes, node, numNodes, ROWS, COLS) {
    convertToString(nodes, node, numNodes, ROWS, COLS);
    return string;
}

module.exports = {convertToString, getNode, convertToStringForBST, generateChildPosition, callToConvert};