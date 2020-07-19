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

    set root(value) {
        this._root = value;
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

    removeNodeAndChildren(selectedNode) {
        if(!selectedNode) return; // selectedNode is child of leaf node (i.e. doesn't exist)

        this.removeNodeAndChildren(selectedNode.children.leftChild);
        this.removeNodeAndChildren(selectedNode.children.rightChild);

        tree.nodes[selectedNode.cellCoords.y][selectedNode.cellCoords.x] = undefined;

        if(!selectedNode.isRoot) {
            if(selectedNode.childType() === "left") {
                selectedNode.parent.children.leftChild = null;
            }
            else {
                selectedNode.parent.children.rightChild = null;
            }
        }
        else {
            this._root = null;
        }
    }

    setNewRoot(rootValue, board) {
        this._root = new Node(rootValue);
        this._root.parent = null;
        this._root.draw(board, null, (board.columns - 1) * 0.5, 0); // board, parent, cellX, cellY
        this._nodes[this._root.cellCoords.y][this._root.cellCoords.x] = this._root;
    }

    /** TESTING */
    printTree() {
        let tree = "";
        for(let i = 0; i < board.rows; i++) {
            for(let j = 0; j < board.columns; j++) {
                if(typeof this.nodes[i][j] !== "undefined") {
                    tree += this.nodes[i][j].value + " ";
                }
                else {
                    tree += "- ";  
                }
            }
            console.log(tree);
            tree = "";
        }

        console.log("\n\n\n");
    }
}