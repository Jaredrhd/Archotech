class TraversalAttempt {
    constructor(main, answerBox) {
        this.main = main;
        this.answerBox = answerBox;

        this.traversalOrder = document.getElementById(this.main.canvas.id+":TRAVERSAL_ORDER");
        this.invalidAnswerDiv = document.getElementById(this.main.canvas.id+":invalid-answer-div");
        this.invalidAnswerSpan = document.getElementById(this.main.canvas.id+":invalid-answer-value");
        this.traversalTools = document.getElementById(this.main.canvas.id+":traversal-tools");
        this.editButton = document.getElementById(this.main.canvas.id+":edit-traversal-btn");
        this.saveButton = document.getElementById(this.main.canvas.id+":save-traversal-btn");
        
        /** Answer string for traversal question */
        this.answerArray = [];
        this.validInput = true;
    }

    configureHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }

        this.traversalTools.style.display = "flex";
        
        this.answerBox.readOnly = true;
        
        this.editButton.addEventListener("click", this.editInput.bind(this));
        this.saveButton.addEventListener("click", this.saveInput.bind(this));
        this.answerBox.addEventListener("input", this.validateInput.bind(this, this.answerBox));

        this.main.modifyTreeTools.style.display = "none";
        this.main.answerQuestionTools.style.display = "flex";
    }

    editInput() {
        this.answerBox.readOnly = false;
        this.answerBox.focus();
        this.editButton.style.display = "none";
        this.saveButton.style.display = "inline-block";
    }

    saveInput() {
        // this.validateInput.bind(this, this.answerBox);
        if(this.validInput) {
            this.answerBox.readOnly = true;
            this.displayAnswerString();
            this.editButton.style.display = "inline-block";
            this.saveButton.style.display = "none";
        }
    }

    validateInput(answerBox) {
        let regex = /^\d+(,\s\d+)*$/;
        this.validInput = regex.test(answerBox.value);

        if(answerBox.value != "") {
            if(!this.validInput) { // Input is invalid
                answerBox.style.outlineColor = "#FF0000";
                this.invalidAnswerDiv.style.display = "flex";
                this.invalidAnswerSpan.innerHTML = "The format of your answer is invalid."
            }
            else {
                answerBox.style.outlineColor = "#000000";
                this.invalidAnswerDiv.style.display = "none";

                // Convert typed answer string to array to display
                let answerString = this.answerBox.value;
                answerString.replace(" ", "");
                let tempAnswerArray = answerString.split(",");

                // Reset the answer array
                this.deselectNodes();
                this.answerArray = [];

                let newNode, newNodeValue, tempNode;
                for(let i = 0; i < tempAnswerArray.length; i++) {
                    newNodeValue = Number(tempAnswerArray[i]);
                    newNode = this.main.tree.getNode(newNodeValue);
                    if(newNode) { // If the node exists in the tree
                        this.answerArray.push(newNode);
                        newNode.selected = true;
                    }
                    else {
                        tempNode = new Node(this.main, newNodeValue, false); 
                        this.answerArray.push(tempNode);
                        
                        this.validInput = false;
                        answerBox.style.outlineColor = "#FF0000";
                        this.invalidAnswerDiv.style.display = "flex";
                        this.invalidAnswerSpan.innerHTML = "Invalid node value(s)."
                    }
                }
                this.main.redrawCanvas();
            }
        }
        else {
            answerBox.style.outlineColor = "#000000";
            this.invalidAnswerDiv.style.display = "none";
        }
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
            node.selected = false;            
        }
    }

    /** Reselects the nodes in a perform traversal question that the student had selected but not yet submitted */
    reconstructLastAnswer() {
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
}