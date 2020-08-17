class QuestionAttempt {
    constructor() {
        this._bst = {values: student.bstValues.split(",").map(value => parseInt(value)), undoButton: document.getElementById("bst-undo"), getIndex: this.getBstValueIndex, stack: []};
        this._bst.undoButton.addEventListener("click", this.bstUndoClicked.bind(this));        

        this._answerBox = document.getElementById("ANSWER_ID");
        if(student.qType === qTypes.TRAVERSAL) {
            this._answerBox.readOnly = true;
        }
        /** Answer string for traversal question */
        this._answerArray = [];

        this.configureHTML();
    }

    get bst() {
        return this._bst;
    }

    get answerBox() {
        return this._answerBox;
    }

    get answerArray() {
        return this._answerArray;
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
                addRootButton.style.display = "inline-block";
                this.bst.undoButton.style.display = "none";
            }
        }

        if(selectedNode === this.bst.stack[this.bst.stack.length - 1]) selectedNode = null;
        tree.removeNodeAndChildren(this.bst.stack.pop());
        redrawCanvas();

        while(board.canShrink()) {
            resizeBoard("shrink");
        }
        
        this.handleEvent(events.UNDO);
    }

    /** Configure respective html on student's side */
    configureHTML() {
        switch(student.qType) {
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

        if(displayTools) {
            modifyTreeTools.style.display = "block";
        }
        answerQuestionTools.style.display = "none";

        // Set node value as the first value in the BST value list
        nodeValueInput.value = this.bst.values[0];
        nodeValueInput.disabled = true;
        nodeValueInput.style.color = "#ff0000";

        // Hide random node value option
        document.getElementById("random-tools").style.display = "none";

        /** Configure buttons for BST */
        addRootButton.style.display = "inline-block";
        editNodeValueButton.style.display = "none";
        removeNodeButton.style.display = "none";
    }

    treeToString() {
        if(student.qType === qTypes.BST) {
            this.answerBox.value = "";

            tree.convertToStringForBST(tree.root);
            this.answerBox.value = tree.string;
            tree.string = "";

            tree.convertToString(tree.root);
            this.answerBox.value += "-" + tree.string;
            tree.string = "";

            var encrypted = CryptoJS.AES.encrypt(this.answerBox.value, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            console.clear();
            console.log(encrypted.toString());
            // var decrypted = CryptoJS.AES.decrypt(encrypted, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // decrypted = decrypted.toString(CryptoJS.enc.Utf8);
            // console.log(decrypted.toString());
        }
        else {
            tree.convertToString(tree.root);
            tree.string = "";
        }
    }

    buildAnswerString(node, action) {
        this.answerBox.value = "";
        
        if(action === events.SELECT) {
            this.answerArray.push(node);
        }
        else if(action === events.DESELECT) {
            let indexToRemove = this.answerArray.indexOf(node);
            this.answerArray.splice(indexToRemove, 1);
        }
    
        for (const node of this.answerArray) {
            if(node === this.answerArray[this.answerArray.length-1]) {
                this.answerBox.value += node.value;
            }
            else {
                this.answerBox.value += node.value + ",";
            }
        }
    }

    handleEvent(event) {
        switch(event) {
            case events.ADDROOT: this.addRootEvent(); break;
            case events.ADDCHILD: this.addChildEvent(); break;
            case events.DRAG: this.dragEvent(); break;
            case events.UNDO: this.undoEvent(); break;
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