class Tree {
    constructor(rootValue) {
        // Create matrix for nodes
        this._nodes = new Array(ROWS);
        for(let i = 0; i < this._nodes.length; i++) {
            this._nodes[i] = new Array(COLS);
        }

        this._root = new Node(rootValue);
        this._root.parent = null;
        this._root.draw(null, (COLS - 1) * 0.5, 0); // board, parent, cellX, cellY
        this._nodes[this._root.cellCoords.y][this._root.cellCoords.x] = this._root;

        this._numNodes = 1;

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

    get numNodes() {
        return this._numNodes;
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

    set nodes(value) {
        this._nodes = value;
    }

    set numNodes(value) {
        this._numNodes = value;
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

    addChild(selectedNode, childType, childValue, childCellX, childCellY) {
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

        newChild.draw(selectedNode, childCellX, childCellY);
        this.nodes[childCellY][childCellX] = newChild;

        this.numNodes++;
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
            this.root = null;
            this.numNodes = 0;
        }
    }

    setNewRoot(rootValue) {
        this.root = new Node(rootValue);
        this.root.parent = null;
        this.root.draw(null, (COLS - 1) * 0.5, 0); // board, parent, cellX, cellY
        this.nodes[this.root.cellCoords.y][this.root.cellCoords.x] = this.root;
        this.numNodes++;
    }

    preOrderTraversal(node) {
        if(!node) return;
        
        this.preOrder += node.value + this.addDelimeter(this.preOrder);
        //this.addDelimeter(this.preOrder);

        this.preOrderTraversal(node.children.leftChild);
        this.preOrderTraversal(node.children.rightChild);
    }
    
    inOrderTraversal(node) {
        if(!node) return;

        this.inOrderTraversal(node.children.leftChild);

        this.inOrder += node.value + this.addDelimeter(this.inOrder);
        //this.addDelimeter(this.inOrder);

        this.inOrderTraversal(node.children.rightChild);
    }
    
    postOrderTraversal(node) {
        if(!node) return;
    
        this.postOrderTraversal(node.children.leftChild);
        this.postOrderTraversal(node.children.rightChild);

        this.postOrder += node.value + this.addDelimeter(this.postOrder);
    }

    addDelimeter(string) {
        let delimeter = "";

        if(!string && this.numNodes > 1) { // This accounts for adding at least one non-empty delimeter so that if there is more than one node, the second condition can be checked correctly
            delimeter = ",";
        }
        else {
            if(string.split(",").length < this.numNodes) { // Not the last node so add non-empty delimeter
                delimeter = ",";
            }
        }

        return delimeter;
    }

    /** TESTING */
    printTree() {
        let tree = "";
        for(let i = 0; i < ROWS; i++) {
            for(let j = 0; j < COLS; j++) {
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

    remake() {
        /** Create temp matrix for nodes */
        let tempMatrix = new Array(ROWS);
        for(let i = 0; i < tempMatrix.length; i++) {
            tempMatrix[i] = new Array(COLS);
        }
        
        /** Shift every node one unit over */
        for(let i = 0; i < tempMatrix.length - 2; i++) {
            for(let j = 0; j < tempMatrix[0].length - 2; j++) {
                if(typeof this.nodes[i][j] !== "undefined") {
                    tempMatrix[i][j+1] = this.nodes[i][j];
                    this.nodes[i][j].cellCoords.x += 1;
                }               
            }   
        }
        this.nodes = tempMatrix;
    }
}