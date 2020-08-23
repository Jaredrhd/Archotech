class QuestionAttempt {
    constructor(main) {
        this.main = main;

        this.bst = {values: this.main.databaseMisc.bstvalues.split(",").map(value => parseInt(value)), undoButton: document.getElementById(this.main.canvas.id+":bst-undo"), getIndex: this.getBstValueIndex.bind(this, this.main), stack: []};
        this.bst.undoButton.addEventListener("click", this.bstUndoClicked.bind(this));        

        this.answerBox = document.getElementById(this.main.canvas.id+":ANSWER_ID");
        this.traversalOrder = document.getElementById(this.main.canvas.id+":TRAVERSAL_ORDER");
        if(this.main.databaseMisc.qtype === this.main.qTypes.TRAVERSAL) {
            this.answerBox.readOnly = true;
        }
        /** Answer string for traversal question */
        this.answerArray = [];

        this.configureHTML();
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
        
        this.handleEvent(this.main.events.UNDO);
    }

    /** Configure respective html on student's side */
    configureHTML() {
        switch(this.main.databaseMisc.qtype) {
            case this.main.qTypes.TRAVERSAL: this.configureTraversalHTML(); break;
            case this.main.qTypes.BST: this.configureBstHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }
        this.main.modifyTreeTools.style.display = "none";
        this.main.answerQuestionTools.style.display = "flex";
    }

    configureBstHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }

        this.main.bstValueList.value = this.main.databaseMisc.bstvalues; // Set the bstValueList from the database value
        this.main.bstValueList.style.display = "block";

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

    treeToString() {
        if(this.main.databaseMisc.qtype === this.main.qTypes.BST) {
            this.answerBox.value = "";

            this.main.tree.convertToStringForBST(this.main.tree.root);
            this.answerBox.value = this.main.tree.string;
            this.main.tree.string = "";

            this.main.tree.convertToString(this.main.tree.root);
            this.answerBox.value += "-" + this.main.tree.string;
            this.main.tree.string = "";

            if(this.answerBox.value === "-") this.answerBox.value = "";

            // var encrypted = CryptoJS.AES.encrypt(this.answerBox.value, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // console.clear();
            // console.log(encrypted.toString());
            // var decrypted = CryptoJS.AES.decrypt(encrypted, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // decrypted = decrypted.toString(CryptoJS.enc.Utf8);
            // console.log(decrypted.toString());
        }
        else {
            this.main.tree.convertToString(this.main.tree.root);
            this.main.tree.string = "";
        }
    }

    /** Reconstruct last answer (needed when student views a question they have already answered but not submitted) */
    reconstructLastAnswer() {
        if(this.main.databaseMisc.qtype === this.main.qTypes.TRAVERSAL) {
            this.reconstructTraversalAnswer();
        }
        else if(this.main.databaseMisc.qtype === this.main.qTypes.BST) {
            this.reconstructBSTAnswer();
        }
    }

    /** Reselects the nodes in a perform traversal question that the student had selected but not yet submitted */
    reconstructTraversalAnswer() {
        this.answerBox.value = this.main.databaseMisc.lastanswer;
        this.traversalOrder.value = this.main.databaseMisc.lastanswernodeorders;

        let nodes = this.main.databaseMisc.lastanswernodeorders.split(", "); // The node values and the order they were added to the tree to uniquely identify them in case there are nodes with the same value
        let node;
        let nodeValue;
        let nodeOrderPlaced;

        for(let i = 0; i < nodes.length; i++) {
            node = nodes[i].split(":");
            nodeValue = Number(node[0]);
            nodeOrderPlaced = Number(node[1]);

            node = this.main.tree.getNode(nodeValue, nodeOrderPlaced);
            node.selected = true;
            this.answerArray.push(node);

            this.main.redrawCanvas();
        }
    }

    /** Rebuilds the BST that the student had created but not yet submitted */
    reconstructBSTAnswer() {
        let treeString = this.main.databaseMisc.lastanswer.split("-");
        this.main.buildTreeFromString(treeString[1]);
        this.answerBox.value = this.main.databaseMisc.lastanswer;

        let bst = treeString[0];
        let nodes = bst.split(":");

        let currIndex = 1;
        let currNode;
        
        while(nodes.length !== 0) {
            for(let i = 0; i < nodes.length; i++) {
                currNode = this.main.tree.getNode(Number(nodes[i].split("#")[0]));
                if(currNode.orderPlaced === currIndex) {
                    this.bst.stack.push(currNode);
                    nodes.splice(i, 1);
                    currIndex++;
                }
            }
        }

        this.main.nodeValueInput.value = this.bst.values[this.bst.stack.length]; // Would be undefined if all the nodes from the BST value list had been added before (this.bst.stack.length === this.bst.values.length) and so nodeValueInput would be blank, otherwise will be the next value in BST value list that student hadn't added before
        this.main.addRootButton.style.display = "none";
        this.bst.undoButton.style.display = "inline-block";
    }

    buildAnswerString(node, action) {
        this.answerBox.value = "";
        this.traversalOrder.value = "";
        
        if(action === this.main.events.SELECT) {
            this.answerArray.push(node);
        }
        else if(action === this.main.events.DESELECT) {
            let indexToRemove = this.answerArray.indexOf(node);
            this.answerArray.splice(indexToRemove, 1);
        }
    
        for (const node of this.answerArray) {
            if(node === this.answerArray[this.answerArray.length-1]) {
                this.answerBox.value += node.value;
                this.traversalOrder.value += node.value + ":" + node.orderPlaced;
            }
            else {
                this.answerBox.value += node.value + ", ";
                this.traversalOrder.value += node.value + ":" + node.orderPlaced + ", ";
            }
        }
    }

    handleEvent(event) {
        switch(event) {
            case this.main.events.ADDROOT: this.addRootEvent(); break;
            case this.main.events.ADDCHILD: this.addChildEvent(); break;
            case this.main.events.DRAG: this.dragEvent(); break;
            case this.main.events.UNDO: this.undoEvent(); break;
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