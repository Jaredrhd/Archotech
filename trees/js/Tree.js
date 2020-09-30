class Tree {
    constructor(main, rootValue, draw=true) {
        this.main = main;

        // Create matrix for nodes
        this.nodes = new Array(this.main.ROWS);
        for(let i = 0; i < this.nodes.length; i++) {
            this.nodes[i] = new Array(this.main.COLS);
        }

        this.root = new Node(this.main, rootValue);
        this.root.parent = null;
        this.numNodes = 1;
        this.nodeArray = [];
        if(draw) {
            this.root.draw(null, (this.main.COLS - 1) * 0.5, 0); // parent, cellX, cellY
            this.nodes[this.root.cellCoords.y][this.root.cellCoords.x] = this.root;
            this.nodeArray.push(this.root);
            this.root.orderPlaced = this.numNodes;
        }

        this.string = "";
        this.childPos = "";
    }

    addChild(selectedNode, childType, childValue, childCellX, childCellY) {
        let newChild;

        if(childType === "L") {
            selectedNode.children.leftChild = new Node(this.main, childValue, false);
            selectedNode.children.leftChild.parent = selectedNode;
            newChild = selectedNode.children.leftChild;
        }
        else {
            selectedNode.children.rightChild = new Node(this.main, childValue, false);
            selectedNode.children.rightChild.parent = selectedNode;
            newChild = selectedNode.children.rightChild;
        }

        newChild.draw(selectedNode, childCellX, childCellY);
        this.nodes[childCellY][childCellX] = newChild;

        this.nodeArray.push(newChild);

        this.numNodes++;
        newChild.orderPlaced = this.numNodes;
    }

    addChildNoDraw(parentNode, childType, childValue) {
        let newChild;

        if(childType === "L") {
            parentNode.children.leftChild = new Node(this.main, childValue, false);
            parentNode.children.leftChild.parent = parentNode;
            newChild = parentNode.children.leftChild;
        }
        else {
            parentNode.children.rightChild = new Node(this.main, childValue, false);
            parentNode.children.rightChild.parent = parentNode;
            newChild = parentNode.children.rightChild;
        }

        this.numNodes++;
        newChild.orderPlaced = this.numNodes;
        
        return newChild;
    }

    /** Returns the first node whose value (and potentially order) matches the argument(s) */
    getNode(value, order = null) {
        for(const node of this.nodeArray) {
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

    removeNodeAndChildren(selectedNode) {
        if(!selectedNode) return; // selectedNode is child of leaf node (i.e. doesn't exist)

        this.removeNodeAndChildren(selectedNode.children.leftChild);
        this.removeNodeAndChildren(selectedNode.children.rightChild);

        this.nodes[selectedNode.cellCoords.y][selectedNode.cellCoords.x] = undefined;

        this.nodeArray.splice(this.nodeArray.findIndex(node => node === selectedNode), 1);

        if(!selectedNode.isRoot) {
            if(selectedNode.childType() === "L") {
                selectedNode.parent.children.leftChild = null;
            }
            else {
                selectedNode.parent.children.rightChild = null;
            }
            this.numNodes--;

            let currOrder = 0;
            for(const node of this.nodeArray) { // Reset the order that each node was placed by starting at 1 for the root and incrementing by 1 (this is so that we can use getNodeByOrder in convertToString)
                currOrder++;
                node.orderPlaced = currOrder;
            }

            selectedNode = null;
        }
        else { // Deleting the root
            this.root = null;
            this.numNodes = 0;
        }
    }

    setNewRoot(rootValue, draw=true) {
        this.root = new Node(this.main, rootValue);
        this.root.parent = null;
        if(draw) {
            this.root.draw(null, (this.main.COLS - 1) * 0.5, 0); // parent, cellX, cellY
            this.nodes[this.root.cellCoords.y][this.root.cellCoords.x] = this.root;
            this.nodeArray.push(this.root);
            this.numNodes = 1;
            this.root.orderPlaced = this.numNodes;
        }
    }

    /** TESTING */
    printTree() {
        let tree = "";
        for(let i = 0; i < this.main.ROWS; i++) {
            for(let j = 0; j < this.main.COLS; j++) {
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

    remake(direction) {
        /** Create temp matrix for nodes */
        let tempMatrix = new Array(this.main.ROWS);
        for(let i = 0; i < tempMatrix.length; i++) {
            tempMatrix[i] = new Array(this.main.COLS);
        }

        let resizeFactor = direction === "grow" ? 1 : -1;
        
        /** Shift every node one unit over */
        for(let i = 0; i < tempMatrix.length - 2; i++) {
            for(let j = 0; j < tempMatrix[0].length - 2; j++) {
                if(typeof this.nodes[i][j] !== "undefined") {
                    tempMatrix[i][j+resizeFactor] = this.nodes[i][j];
                    this.nodes[i][j].cellCoords.x += resizeFactor;
                }               
            }   
        }
        this.nodes = tempMatrix;
    }

    /** Generates a string representation of the tree so that it can be reconstructed. Nodes are arranged by order placed */
    convertToString(node) {
        if(!node) return;

        if(node.isRoot) {
            this.string += this.main.ROWS + "," + this.main.COLS + ":" + node.value + ":ROOT:" + node.cellCoords.y + "," + node.cellCoords.x;
        }
        else {
            this.string += node.value + ":" + this.generateChildPosition(node) + ":" + node.cellCoords.y + "," + node.cellCoords.x;
        }

        if(this.string.split("#").length !== this.numNodes) {
            this.string += "#";
        }
        
        this.convertToString(this.getNode(null, node.orderPlaced + 1));
    }

    convertToStringForBST(nodeStack) {
        for(const node of nodeStack) {
            if(node.isRoot) {
                this.string += node.value;
            }
            else {
                this.string += node.value + "#" + this.generateChildPosition(node);
            }

            if(this.string.split(":").length !== this.numNodes) {
                this.string += ":";
            }
        }
    }

    generateChildPosition(node) {
        let childPos = "";

        while(node !== this.root) {
            if(node.parent === this.root) {
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

    isDuplicateValue(nodeValue) {
        for(const node of this.nodeArray) {
            if(nodeValue === node.value) return true;
        }

        return false;
    }

    allowedValueForAVL(newNodeValue, childType) {
        let attemptedPlacement = "";
        let correctPlacement = "";
        let currNode = this.root;
        
        /** The new node's position in the tree */
        if(this.main.selectedNode === this.root) {
            attemptedPlacement = childType;
        }
        else {
            attemptedPlacement = this.generateChildPosition(this.main.selectedNode) + "." + childType;
        }

        /** Where the node should be placed */
        let leftOrRight = "";
        while(currNode) {
            if(newNodeValue < currNode.value) {
                leftOrRight = "L";
                currNode = currNode.children.leftChild;
            }
            else {
                leftOrRight = "R";
                currNode = currNode.children.rightChild;
            }

            if(correctPlacement === "") correctPlacement += leftOrRight;
            else correctPlacement += "." + leftOrRight;
        }

        if(attemptedPlacement === correctPlacement) return true; // If they are equal, the BST property is maintained and so this is a valid new node

        return false;
    }
}