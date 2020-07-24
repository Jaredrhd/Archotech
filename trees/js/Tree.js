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

        this._inOrder = "";
        this._preOrder = "";
        this._postOrder = "";
    }

    get root() {
        return this._root;
    }

    get nodes() {
        return this._nodes;
    }

    get inOrder() {
        return this._inOrder;
    }

    get preOrder() {
        return this._preOrder;
    }

    get postOrder() {
        return this._postOrder;
    }

    set root(value) {
        this._root = value;
    }

    set inOrder(value) {
        this._inOrder = value;
    }

    set preOrder(value) {
        this._preOrder = value;
    }

    set postOrder(value) {
        this._postOrder = value;
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

    inOrderTraversal(node) {
        if(!node) return;
    
        this.inOrderTraversal(node.children.leftChild);
        this.inOrder += node.value + " ";
        this.inOrderTraversal(node.children.rightChild);
    }
    
    preOrderTraversal(node) {
        if(!node) return;
    
        this.preOrder += node.value + " ";
        this.preOrderTraversal(node.children.leftChild);
        this.preOrderTraversal(node.children.rightChild);
    }
    
    postOrderTraversal(node) {
        if(!node) return;
    
        this.postOrderTraversal(node.children.leftChild);
        this.postOrderTraversal(node.children.rightChild);
        this.postOrder += node.value + " ";
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

    remake(board) {
        /** Create temp matrix for nodes */
        let tempMatrix = new Array(board.rows);
        for(let i = 0; i < tempMatrix.length; i++) {
            tempMatrix[i] = new Array(board.columns);
        }
        
        /** Shift every node one unit over */
        for(let i = 0; i < tempMatrix.length - 2; i++) {
            for(let j = 0; j < tempMatrix[0].length - 2; j++) {
                if(typeof this._nodes[i][j] !== "undefined") {
                    tempMatrix[i][j+1] = this._nodes[i][j];
                    this._nodes[i][j].cellCoords.x += 1;
                }               
            }   
        }
        this._nodes = tempMatrix;
    }
}