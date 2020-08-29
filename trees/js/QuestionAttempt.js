class QuestionAttempt {
    constructor(main) {
        this.main = main;

        /** BST */
        this.bst = {values: this.main.databaseMisc.bstvalues.split(",").map(value => parseInt(value)), undoButton: document.getElementById(this.main.canvas.id+":bst-undo"), getIndex: this.getBstValueIndex.bind(this, this.main), stack: []};
        this.bst.undoButton.addEventListener("click", this.bstUndoClicked.bind(this));        

        /** PROPERTIES */
        this.propertyAnswers = {
            num_leaves: "",
            num_edges: "",
            num_internal_nodes: "",
            height: "",
            depth: "",
            degree: "",
            level: ""
        }
        this.propertyTools = document.getElementById(this.main.canvas.id+":property-tools");
        /** TREE PROPERTIES */
        this.treeProperties = document.getElementById(this.main.canvas.id+":tree-properties"); // Parent div
        this.numLeavesInput = document.getElementById(this.main.canvas.id+":num_leaves");
        this.numEdgesInput = document.getElementById(this.main.canvas.id+":num_edges");
        this.numIntNodesInput = document.getElementById(this.main.canvas.id+":num_internal_nodes");
        this.treePropertyInputs = {num_leaves: this.numLeavesInput, num_edges: this.numEdgesInput, num_internal_nodes: this.numIntNodesInput};
        /** NODE PROPERTIES */
        this.nodeProperties = document.getElementById(this.main.canvas.id+":node-properties"); // Parent div
        this.nodeHeightInput = document.getElementById(this.main.canvas.id+":height");
        this.nodeDepthInput = document.getElementById(this.main.canvas.id+":depth");
        this.nodeDegreeInput = document.getElementById(this.main.canvas.id+":degree");
        this.nodeLevelInput = document.getElementById(this.main.canvas.id+":level");
        this.nodePropertyInputs = {height: this.nodeHeightInput, depth: this.nodeDepthInput, degree: this.nodeDegreeInput, level: this.nodeLevelInput};

        this.answerBox = document.getElementById(this.main.canvas.id+":ANSWER_ID");
        this.traversalOrder = document.getElementById(this.main.canvas.id+":TRAVERSAL_ORDER");

        /** Answer string for traversal question */
        this.traversalAnswerArray = [];

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
            case this.main.qTypes.PROPERTIES: this.configurePropertiesHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }

        this.answerBox.readOnly = true;

        this.main.modifyTreeTools.style.display = "none";
        this.main.answerQuestionTools.style.display = "flex";
    }

    configureBstHTML() {
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

    configurePropertiesHTML() {
        if(this.main.databaseMisc.treestring !== "") {
            this.main.buildTreeFromString(this.main.databaseMisc.treestring);
        }
        this.main.modifyTreeTools.style.display = "none";
        this.propertyTools.style.display = "block";

        for(const property of this.main.databaseMisc.properties.split(",")) { // For every property the lecturer has included
            if(property.split(":")[0] === "tree") { // Display any tree property input boxes immediately
                let treePropertyInput = this.treePropertyInputs[property.split(":")[1]]; // Get the actual input box for the tree property that the lecturer included and display it and its label
                treePropertyInput.parentElement.style.display = "inline-block";
            }
        }

        /** Add event listeners to input boxes */
        for(const item in this.treePropertyInputs) {
            let treePropertyInput = this.treePropertyInputs[item];
            treePropertyInput.addEventListener("change", this.treePropertyInputChanged.bind(this, treePropertyInput, treePropertyInput.id.split(":")[2]));
        }

        for(const item in this.nodePropertyInputs) {
            let nodePropertyInput = this.nodePropertyInputs[item]
            nodePropertyInput.addEventListener("change", this.nodePropertyInputChanged.bind(this, nodePropertyInput, nodePropertyInput.id.split(":")[2]));
        }
    }

    /** Called when a node is selected on a properties question. Displays the node property input boxes that the lecturer included and fills in any previous entered values */
    displayNodePropertyInputs(show) {
        for(const property of this.main.databaseMisc.properties.split(",")) { // For every property the lecturer has included
            if(property.split(":")[0] === "node") {
                let nodePropertyInput = this.nodePropertyInputs[property.split(":")[1]]; // Get the actual input box for the node property that the lecturer included
                if(show) {
                    /** Fill in previously filled in value for the current property of the currently selected node */
                    let answerArrayForProperty = this.propertyAnswers[property.split(":")[1]].split("#");
                    let nodeValue = this.main.selectedNode.value;
                    let nodeOrder = this.main.selectedNode.orderPlaced;
                    
                    let nodeEntry;
                    let nodeEntryValue;
                    let nodeEntryOrder;

                    let index = answerArrayForProperty.findIndex((item) => {
                        nodeEntry = item.split(":");
                        nodeEntryValue = Number(nodeEntry[0].split("-")[0]); // Have to split up node value and node order and cast to a Number now since we are comparing with actual selected node value and order
                        nodeEntryOrder = Number(nodeEntry[0].split("-")[1]);

                        return (nodeValue === nodeEntryValue && nodeOrder === nodeEntryOrder);
                    });

                    if(index !== -1) { // The currently selected node had a previous value for the current node property
                        nodeEntry = answerArrayForProperty[index]; // Now nodeEntry is the entry in answerArrayForProperty whose values we use to fill the current property's input box
                        nodePropertyInput.value = nodeEntry.split(":")[1]; // The actual property value is in the second index of the node entry
                    }
                    else {
                        nodePropertyInput.value = "";
                    }

                    nodePropertyInput.parentElement.style.display = "inline-block"; // Show the input box and its label
                }
                else {
                    nodePropertyInput.parentElement.style.display = "none"; // Hide the input box and its label
                }
            }
        }
    }
    /**
     * Called when the input box of one of the tree properties receives new input
     * @param {object} treePropertyInput The actual input box of the property receiving new input
     * @param {string} treePropertyName The name of this tree property
     */
    treePropertyInputChanged(treePropertyInput, treePropertyName) {
        this.propertyAnswers[treePropertyName] = treePropertyInput.value; // Update the appropriate tree property in propertyAnswers with the new value
        this.serializePropertyAnswers();
    }

    /**
     * Called when the input box of one of the node properties receives new input
     * @param {object} nodePropertyInput The actual input box of the property receiving new input
     * @param {string} nodePropertyName The name of this node property
     */
    nodePropertyInputChanged(nodePropertyInput, nodePropertyName) {
        let newEntry = this.main.selectedNode.value + "-" + this.main.selectedNode.orderPlaced + ":" + nodePropertyInput.value; // Each entry is uniquely identified by the node value and the node order

        if(this.propertyAnswers[nodePropertyName] !== "") { // If the current property string isn't empty
            let answerArrayForProperty = this.propertyAnswers[nodePropertyName].split("#"); // Array of all entries for the current node property
            let index = answerArrayForProperty.findIndex((nodeEntry) => nodeEntry.split(":")[0] === newEntry.split(":")[0]); // Check if the currently selected node already has an entry in the current node property string

            if(index !== -1) { // We've found an entry i.e. the currently selected node had previously been assigned a value for the current node property and so we must remove this previous value
                answerArrayForProperty.splice(index, 1);
                this.propertyAnswers[nodePropertyName] = answerArrayForProperty.join("#"); // Join remaining entries with a delimeter
            }
        }

        if(this.propertyAnswers[nodePropertyName] !== "") {
            newEntry = "#" + newEntry;
        }

        this.propertyAnswers[nodePropertyName] += newEntry;
        this.propertyAnswers[nodePropertyName] = this.sortNodePropertyString(nodePropertyName);
        this.serializePropertyAnswers();
        // console.log(nodePropertyName + ": " + this.propertyAnswers[nodePropertyName]);
    }

    /** Called whenever a node property string from propertyAnswers is updated. Returns a string sorted by the node orders of the node entries in the appropriate node property string */
    sortNodePropertyString(nodePropertyName) {
        let answerArrayForProperty = this.propertyAnswers[nodePropertyName].split("#");
        let answerArrayForPropertyLength = answerArrayForProperty.length;
        let sortedArray = [];
        
        let nodeEntry;
        let nodeEntryOrder;

        let index;

        let currLowestNodeOrder;

        currLowestNodeOrder = this.findNextLowestNodeOrder(answerArrayForProperty);

        while(sortedArray.length !== answerArrayForPropertyLength) { // Sort entries in the current node property array by node order
         
            index = answerArrayForProperty.findIndex((item) => { // Find the index of the entry in the node property array with the current lowest node order
                nodeEntry = item.split(":");
                nodeEntryOrder = Number(nodeEntry[0].split("-")[1]);

                return nodeEntryOrder === currLowestNodeOrder;
            });

            sortedArray.push(answerArrayForProperty[index]); // Add the entry with the current lowest node order to the sorted array
            answerArrayForProperty.splice(index, 1); // Remove the entry with the current lowest node order from the node property array

            currLowestNodeOrder = this.findNextLowestNodeOrder(answerArrayForProperty);
        }

        return sortedArray.join("#");
    }

    /** Loop through the entries in the current node property array and find the lowest node order */
    findNextLowestNodeOrder(nodePropertyArray) {
        let nodeEntry;
        let nodeEntryOrder;

        let currLowestNodeOrder = -1;

        for(let i = 0; i < nodePropertyArray.length; i++) {
            nodeEntry = nodePropertyArray[i].split(":");
            nodeEntryOrder = Number(nodeEntry[0].split("-")[1]);

            if(currLowestNodeOrder === -1) { // currNodeOrder hasn't been assigned a valid starting order yet
                currLowestNodeOrder = nodeEntryOrder;
            } 
            else {
                if(nodeEntryOrder < currLowestNodeOrder) { // If there is a lower node order, replace currNodeOrder with that value
                    currLowestNodeOrder = nodeEntryOrder;
                }
            }
        }

        return currLowestNodeOrder;
    }

    /** Called whenever a property string from propertyAnswers is updated. Constructs the actual answer string from propertyAnswers */
    serializePropertyAnswers() {
        let string = "";

        let requestedProperties = this.main.databaseMisc.properties.split(",");

        for(const property of requestedProperties) { // For every property the lecturer has included
            for(const propertyAnswer in this.propertyAnswers) {
                if(propertyAnswer === property.split(":")[1]) {
                    if(property !== requestedProperties[requestedProperties.length - 1]) {
                        string += propertyAnswer + "." + this.propertyAnswers[propertyAnswer] + "|";
                    }
                    else {
                        string += propertyAnswer + "." + this.propertyAnswers[propertyAnswer];
                    }
                }
            }
        }

        this.answerBox.value = string;
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
        else if(this.main.databaseMisc.qtype === this.main.qTypes.PROPERTIES) {
            this.reconstructPropertiesAnswer();
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
            this.traversalAnswerArray.push(node);

            this.main.redrawCanvas();
        }
    }

    /** Rebuilds the BST that the student had created but not yet submitted */
    reconstructBSTAnswer() {
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

    /** Reinputs the property values that the student had entered but not yet submitted */
    reconstructPropertiesAnswer() {
        this.answerBox.value = this.main.databaseMisc.lastanswer;
        let propertyAnswers = this.main.databaseMisc.lastanswer.split("|");

        let propertyName;
        let propertyString;

        for(const propertyAnswer of propertyAnswers) {
            propertyName = propertyAnswer.split(".")[0];
            propertyString = propertyAnswer.split(".")[1];

            this.propertyAnswers[propertyName] = propertyString;

            if(typeof this.treePropertyInputs[propertyName] !== "undefined") { // propertyAnswer is the answer of a tree property. Display previously entered values for tree properties (display of previously entered values for node properties handled when a node is selected)
                this.treePropertyInputs[propertyName].value = propertyString;
            }
        }
    }

    buildAnswerString(node, action) {
        this.answerBox.value = "";
        this.traversalOrder.value = "";
        
        if(action === this.main.events.SELECT) {
            this.traversalAnswerArray.push(node);
        }
        else if(action === this.main.events.DESELECT) {
            let indexToRemove = this.traversalAnswerArray.indexOf(node);
            this.traversalAnswerArray.splice(indexToRemove, 1);
        }
    
        for (const node of this.traversalAnswerArray) {
            if(node === this.traversalAnswerArray[this.traversalAnswerArray.length-1]) {
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