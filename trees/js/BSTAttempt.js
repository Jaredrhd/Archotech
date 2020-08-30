class BSTAttempt {
    constructor(qa, main, answerBox) {
        this.qa = qa;
        this.main = main;
        this.answerBox = answerBox;

        this.bst = {values: this.main.databaseMisc.bstvalues.split(",").map(value => parseInt(value)), undoButton: document.getElementById(this.main.canvas.id+":bst-undo"), getIndex: this.getBstValueIndex.bind(this, this.main), stack: []};
        this.bst.undoButton.addEventListener("click", this.bstUndoClicked.bind(this));        
    }

    configureHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }

        this.main.bstValueList.value = this.main.databaseMisc.bstvalues; // Set the bstValueList from the database value
        this.main.bstTools.style.display = "flex";

        if(this.main.databaseMisc.displaytools) {
            this.main.modifyTreeTools.style.display = "block";
        }
        this.main.answerQuestionTools.style.display = "none";

        // Set node value as the first value in the BST value list
        this.main.nodeValueInput.value = this.bst.values[0];
        this.main.nodeValueInput.disabled = true;
        this.main.nodeValueInput.style.color = "#ff0000";

        // Hide random node value option
        this.main.randNodeValueTools.style.display = "none";

        /** Configure buttons for BST */
        this.main.addRootButton.style.display = "inline-block";
        this.main.editNodeValueButton.style.display = "none";
        this.main.removeNodeButton.style.display = "none";
    }

    /**
     * Returns the index of the next or previous BST value from the list
     * @param {String} direction String indicating whether we are getting the next or previous index
     */
    getBstValueIndex(main, direction) {
        if(direction === "next" || direction === "prev") {
            // If want 0 -> if(nodeValueInput.value === "") return -1;
            let currIndex = this.bst.values.findIndex((currValue) => currValue === Number(main.nodeValueInput.value));
            if(currIndex === -1) return;

            let factor = direction === "next" ? 1 : -1;
            currIndex += factor;

            return currIndex;
        }
    }

    bstUndoClicked() {
        let newNodeIndex = this.bst.getIndex("prev");
        
        if(typeof newNodeIndex === "undefined") {
            this.main.nodeValueInput.value = this.bst.values[this.bst.values.length - 1];
        }
        else {
            this.main.nodeValueInput.value = this.bst.values[newNodeIndex];

            if(newNodeIndex === 0) {
                this.main.addRootButton.style.display = "inline-block";
                this.bst.undoButton.style.display = "none";
            }
        }
        
        if(this.main.selectedNode === this.bst.stack[this.bst.stack.length - 1]) this.main.selectedNode = null;
        this.main.tree.removeNodeAndChildren(this.bst.stack.pop());
        this.main.redrawCanvas();

        while(this.main.board.canShrink()) {
            this.main.resizeBoard("shrink");
        }
        
        this.qa.handleEvent(this.main.events.UNDO);
    }

    /** Rebuilds the BST that the student had created but not yet submitted */
    reconstructLastAnswer() {
        let treeString = this.main.databaseMisc.lastanswer.split("-"); // treeString[0] is string used for BST marking, treeString[1] is string used to reconstruct actual tree on the canvas
        this.main.buildTreeFromString(treeString[1]);
        this.answerBox.value = this.main.databaseMisc.lastanswer;

        let bst = treeString[0];
        let nodes = bst.split(":");

        let currIndex = 1;
        let currNode;
        
        while(nodes.length !== 0) {
            for(let i = 0; i < nodes.length; i++) {
                currNode = this.main.tree.getNode(Number(nodes[i].split("#")[0])); // Can get node by value since all values in BST are unique
                if(currNode.orderPlaced === currIndex) { // Add nodes to the stack in the order they were added by the student
                    this.bst.stack.push(currNode);
                    nodes.splice(i, 1);
                    currIndex++;
                }
            }
        }

        this.main.nodeValueInput.value = this.bst.values[this.bst.stack.length]; // Would be undefined if all the nodes from the BST value list had been added before (this.bst.stack.length === this.bst.values.length) and so nodeValueInput would be blank, otherwise will be the next value in BST value list that student hadn't added before
        this.main.addRootButton.style.display = "none"; // reconstructBSTAnwer is only called if there was at least one node placed by the student i.e. we already have a root
        this.bst.undoButton.style.display = "inline-block";
    }
}