class QuestionAttempt {
    constructor() {
        this._bst = {values: student.bstValues.split(",").map(value => parseInt(value)), undoButton: document.getElementById("bst-undo"), getIndex: this.getBstValueIndex, stack: []};
        this._bst.undoButton.addEventListener("click", this.bstUndoClicked.bind(this));

        this._events = {
            ADDROOT: "addRoot",
            ADDCHILD: "addChild",
            DRAG: "drag",
            UNDO: "undo",
        };

        this.configureHTML();
    }

    get bst() {
        return this._bst;
    }

    get events() {
        return this._events;
    }

    /**
     * Returns the index of the next or previous BST value from the list
     * @param {String} direction String indicating whether we are getting the next or previous index
     */
    getBstValueIndex(direction) {
        if(direction === "next" || direction === "prev") {
            // If want 0 -> if(nodeValueInput.value === "") return -1;
            let currIndex = this.values.findIndex((currValue) => currValue === Number(nodeValueInput.value));
            if(currIndex === -1) return;

            let factor = direction === "next" ? 1 : -1;
            currIndex += factor;

            return currIndex;
        }
    }

    bstUndoClicked() {
        let newNodeIndex = this.bst.getIndex("prev");
        
        if(typeof newNodeIndex === "undefined") {
            nodeValueInput.value = this.bst.values[this.bst.values.length - 1];
        }
        else {
            nodeValueInput.value = this.bst.values[newNodeIndex];

            if(newNodeIndex === 0) {
                addRootButton.style.display = "block";
                this.bst.undoButton.style.display = "none";
            }
        }

        if(selectedNode === this.bst.stack[this.bst.stack.length - 1]) selectedNode = null;
        tree.removeNodeAndChildren(this.bst.stack.pop());
        redrawCanvas();

        while(board.canShrink()) {
            resizeBoard("shrink");
        }
        
        this.handleEvent(this.events.UNDO);
    }

    /** Configure respective html on student's side */
    configureHTML() {
        switch(studentQType) {
            case qTypes.TRAVERSAL: this.configureTraversalHTML(); break;
            case qTypes.BST: this.configureBstHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(student.treeString !== "") {
            buildTreeFromString(student.treeString);
        }
        modifyTreeTools.style.display = "none";
        answerQuestionTools.style.display = "block";
    }

    configureBstHTML() {
        if(student.treeString !== "") {
            buildTreeFromString(student.treeString);
        }

        bstValueList.value = student.bstValues;
        bstValueList.style.display = "block";

        modifyTreeTools.style.display = "block";
        answerQuestionTools.style.display = "none";

        // Set node value as the first value in the BST value list
        nodeValueInput.value = this.bst.values[0];
        nodeValueInput.disabled = true;
        nodeValueInput.style.color = "#ff0000";

        // Hide random node value option
        randNodeValueCheckbox.style.display = "none";

        /** Configure buttons for BST */
        addRootButton.style.display = "block";
        editNodeValueButton.style.display = "none";
        removeNodeButton.style.display = "none";
    }

    treeToString() {
        tree.convertToString(tree.root);
        if(studentQType === qTypes.BST) {
            answerID.value += "-" + tree.string;
        }
        tree.string = "";
    }

    handleEvent(event) {
        switch(event) {
            case this.events.ADDROOT: this.addRootEvent(); break;
            case this.events.ADDCHILD: this.addChildEvent(); break;
            case this.events.DRAG: this.dragEvent(); break;
            case this.events.UNDO: this.undoEvent(); break;
        }
    }

    addRootEvent() {
        this.treeToString();
    }

    addChildEvent() {
        this.treeToString();
    }

    dragEvent() {
        this.treeToString();
    }

    undoEvent() {
        this.treeToString();
    }
}