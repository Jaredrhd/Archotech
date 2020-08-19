import {tree, nodeValueInput, qTypes, addRootButton, editNodeValueButton, removeNodeButton, modifyTreeTools, answerQuestionTools, 
    bstValueList, buildTreeFromString, events, redrawCanvas, board, selectedNode, mutateSelectedNode} from "./main.js";

class QuestionAttempt {
    constructor() {
        this._bst = {values: student.bstValues.split(",").map(value => parseInt(value)), undoButton: document.getElementById("bst-undo"), getIndex: this.getBstValueIndex, stack: []};
        this._bst.undoButton.addEventListener("click", this.bstUndoClicked.bind(this));        

        this._answerBox = document.getElementById("ANSWER_ID");
        this._traversalOrder = document.getElementById("TRAVERSAL_ORDER");
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

    get traversalOrder() {
        return this._traversalOrder;
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
        
        if(selectedNode === this.bst.stack[this.bst.stack.length - 1]) mutateSelectedNode(null);
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
        answerQuestionTools.style.display = "flex";
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

            if(this.answerBox.value === "-") this.answerBox.value = "";

            // var encrypted = CryptoJS.AES.encrypt(this.answerBox.value, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // console.clear();
            // console.log(encrypted.toString());
            // var decrypted = CryptoJS.AES.decrypt(encrypted, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // decrypted = decrypted.toString(CryptoJS.enc.Utf8);
            // console.log(decrypted.toString());
        }
        else {
            tree.convertToString(tree.root);
            tree.string = "";
        }
    }

    /** Reconstruct last answer (needed when student views a question they have already answered but not submitted) */
    reconstructLastAnswer() {
        if(student.qType === qTypes.TRAVERSAL) {
            this.reconstructTraversalAnswer();
        }
        else if(student.qType === qTypes.BST) {
            this.reconstructBSTAnswer();
        }
    }

    /** Reselects the nodes in a perform traversal question that the student had selected but not yet submitted */
    reconstructTraversalAnswer() {
        this.answerBox.value = lastAnswer;
        this.traversalOrder.value = lastAnswerNodeOrders;

        let nodes = lastAnswerNodeOrders.split(", "); // The node values and the order they were added to the tree to uniquely identify them in case there are nodes with the same value
        let node;
        let nodeValue;
        let nodeOrderPlaced;

        for(let i = 0; i < nodes.length; i++) {
            node = nodes[i].split(":");
            nodeValue = Number(node[0]);
            nodeOrderPlaced = Number(node[1]);

            node = tree.getNode(nodeValue, nodeOrderPlaced);
            node.selected = true;
            this.answerArray.push(node);

            redrawCanvas();
        }
    }

    /** Rebuilds the BST that the student had created but not yet submitted */
    reconstructBSTAnswer() {
        let treeString = lastAnswer.split("-");
        buildTreeFromString(treeString[1]);
        this.answerBox.value = lastAnswer;

        let bst = treeString[0];
        let nodes = bst.split(":");

        let currIndex = 1;
        let currNode;
        
        while(nodes.length !== 0) {
            for(let i = 0; i < nodes.length; i++) {
                currNode = tree.getNode(Number(nodes[i].split("#")[0]));
                if(currNode.orderPlaced === currIndex) {
                    this.bst.stack.push(currNode);
                    nodes.splice(i, 1);
                    currIndex++;
                }
            }
        }

        nodeValueInput.value = this.bst.values[this.bst.stack.length]; // Would be undefined if all the nodes from the BST value list had been added before (this.bst.stack.length === this.bst.values.length) and so nodeValueInput would be blank, otherwise will be the next value in BST value list that student hadn't added before
        addRootButton.style.display = "none";
        this.bst.undoButton.style.display = "inline-block";
    }

    buildAnswerString(node, action) {
        this.answerBox.value = "";
        this.traversalOrder.value = "";
        
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

export default QuestionAttempt;