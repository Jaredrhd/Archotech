class TraversalAttempt {
    constructor(main, answerBox) {
        this.main = main;
        this.answerBox = answerBox;

        this.traversalOrder = document.getElementById(this.main.canvas.id+":TRAVERSAL_ORDER");
        this.invalidAnswerIcon = document.getElementById(this.main.canvas.id+":invalid-answer-icon");
        this.invalidAnswerValue = document.getElementById(this.main.canvas.id+":invalid-answer-value");
        
        /** Answer string for traversal question */
        this.answerArray = [];
        this.validInput = true;
    }

    configureHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }
        
        this.answerBox.style.width = document.getElementsByTagName("canvas").width;
        
        if(this.main.databaseMisc.disabletraversalinput) this.answerBox.readOnly = true;
        else {
            this.answerBox.addEventListener("input", this.validateInput.bind(this, this.answerBox));
            this.answerBox.addEventListener("change", this.clearInvalidInput.bind(this));
        }
        
        this.main.modifyTreeTools.style.display = "none";
        this.main.answerQuestionTools.style.display = "flex";

        /** Configure help text */
        this.main.tooltipText.innerHTML = this.main.helpText.traversal;
    }

    validateInput(answerBox) {
        let regex = /^\d+(,\s\d+)*$/;
        this.validInput = regex.test(answerBox.value);

        if(answerBox.value !== "") {
            if(!this.validInput) { // Input is invalid
                answerBox.style.outlineColor = "#FF0000";
                this.invalidAnswerValue.innerHTML = "The format of your answer is invalid."
                this.invalidAnswerIcon.style.display = "flex";
            }
            else {
                answerBox.style.outlineColor = "#000000";
                this.invalidAnswerValue.innerHTML = " ";
                this.invalidAnswerIcon.style.display = "none";

                // Convert typed answer string to array to display
                let answerString = this.answerBox.value;
                answerString.replace(" ", "");
                let tempAnswerArray = answerString.split(",");

                // Reset the answer array
                this.deselectNodes();
                this.answerArray = [];

                let newNode, newNodeValue;
                for(let i = 0; i < tempAnswerArray.length; i++) {
                    newNodeValue = Number(tempAnswerArray[i]);
                    newNode = this.main.tree.getNode(newNodeValue);
                    if(newNode && !newNode.selected) { // If the node exists in the tree and is not already selected
                        this.answerArray.push(newNode);
                        newNode.selected = true;
                    }
                    else {
                        this.validInput = false;
                        answerBox.style.outlineColor = "#FF0000";
                        this.invalidAnswerValue.innerHTML = "Invalid node value(s).";
                        this.invalidAnswerIcon.style.display = "flex";
                    }
                }
                this.main.redrawCanvas();
            }
        }
        else {
            this.deselectNodes();
            this.answerArray = [];
            this.main.redrawCanvas();
            this.validInput = true;
            answerBox.style.outlineColor = "#000000";
            this.invalidAnswerValue.innerHTML = " ";
            this.invalidAnswerIcon.style.display = "none";
        }
    }

    clearInvalidInput() {
        this.displayAnswerString();
        this.validInput = true;
        this.answerBox.style.outlineColor = "#000000";
        this.invalidAnswerValue.innerHTML = " ";
        this.invalidAnswerIcon.style.display = "none";
    }

    buildAnswerString(node, action) {        
        if(action === this.main.events.SELECT) {
            this.answerArray.push(node);
        }
        else if(action === this.main.events.DESELECT) {
            let indexToRemove = this.answerArray.indexOf(node);
            this.answerArray.splice(indexToRemove, 1);
        }
        
        this.displayAnswerString();        
    }
    
    displayAnswerString() {
        this.answerBox.value = "";
        this.traversalOrder.value = "";

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

    deselectNodes() {
        for (const node of this.answerArray) {
            if(node) node.selected = false;            
        }
    }

    /** Reselects the nodes in a perform traversal question that the student had selected but not yet submitted */
    reconstructLastAnswer() {
        this.answerBox.value = this.main.databaseMisc.lastanswer;

        let nodes = this.main.databaseMisc.lastanswer.split(", "); // The node values and the order they were added to the tree to uniquely identify them in case there are nodes with the same value
        let node;
        let nodeValue;

        for(let i = 0; i < nodes.length; i++) {
            nodeValue = Number(nodes[i]);

            node = this.main.tree.getNode(nodeValue);
            node.selected = true;
            this.answerArray.push(node);

            this.main.redrawCanvas();
        }
    }
}