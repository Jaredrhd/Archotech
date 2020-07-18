class Tree {
    constructor(rootValue, board) {
        // Create matrix for nodes
        this._nodes = new Array(board.rows);
        for(let i = 0; i < this._nodes.length; i++) {
            this._nodes[i] = new Array(board.columns);
        }

        this._root = new Node(rootValue);
        this._root.parent = null;
        this._root.draw(board, null, (board.columns - 1) * 0.5, 0); // board, parent, cellX, cellY
        this._nodes[this._root.cellCoords.y][this._root.cellCoords.x] = this._root;
    }

    get root() {
        return this._root;
    }

    get nodes() {
        return this._nodes;
    }

    addChild(selectedNode, board, childType, childValue, childCellX, childCellY) {
        let newChild;

        if(childType === "left") {
            selectedNode.children.leftChild = new Node(childValue, false);
            selectedNode.children.leftChild.parent = selectedNode;
            newChild = selectedNode.children.leftChild;
        }
        else {
            selectedNode.children.rightChild = new Node(childValue, false);
            selectedNode.children.rightChild.parent = selectedNode;
            newChild = selectedNode.children.rightChild;
        }

        newChild.draw(board, selectedNode, childCellX, childCellY);
        this._nodes[childCellY][childCellX] = newChild;
    }

}