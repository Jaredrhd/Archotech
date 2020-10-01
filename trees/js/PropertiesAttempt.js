class PropertiesAttempt {
    constructor(main, answerBox) {
        this.main = main;
        this.answerBox = answerBox;

        /** String arrays storing what properties the student got correct and incorrect */
        this.treePropertyResults = [];
        this.nodePropertyResults = [];

        /** Array of all required nodes to enter node properties for */
        this.requiredNodes = [];

        /** String arrays storing the requested tree and node property names */
        this.requestedTreeProperties = [];
        this.requestedNodeProperties = [];
        this.requestedProperties = []; // Names of all requested properties

        this.numRequestedTreeProperties = 0;
        this.numRequestedNodeProperties = 0;

        this.propertyAnswers = {
            num_leaves: "",
            num_edges: "",
            num_internal_nodes: "",
            height: "",
            depth: "",
            num_children: ""
        }

        this.propertyTools = document.getElementById(this.main.canvas.id+":property-tools");
        
        /** TREE PROPERTIES */
        this.treePropertiesDiv = document.getElementById(this.main.canvas.id+":tree-properties"); // Parent div
        this.numLeavesInput = document.getElementById(this.main.canvas.id+":num_leaves");
        this.numEdgesInput = document.getElementById(this.main.canvas.id+":num_edges");
        this.numIntNodesInput = document.getElementById(this.main.canvas.id+":num_internal_nodes");
        this.treePropertyInputs = {num_leaves: this.numLeavesInput, num_edges: this.numEdgesInput, num_internal_nodes: this.numIntNodesInput};
        
        /** NODE PROPERTIES */
        this.nodePropertiesHeading = document.getElementById(this.main.canvas.id+":node-properties-label");
        this.nodePropertiesDiv = document.getElementById(this.main.canvas.id+":node-properties"); // Parent div
        this.nodeHeightInput = document.getElementById(this.main.canvas.id+":height");
        this.nodeDepthInput = document.getElementById(this.main.canvas.id+":depth");
        this.numChildrenInput = document.getElementById(this.main.canvas.id+":num_children");
        this.nodePropertyInputs = {height: this.nodeHeightInput, depth: this.nodeDepthInput, num_children: this.numChildrenInput};
    }

    configureHTML() {
        if(this.main.databaseMisc.treestring === "") return;
        this.main.buildTreeFromString(this.main.databaseMisc.treestring);

        this.main.helpIcon.style.marginTop = "-50px";
        this.main.helpIcon.style.marginBottom = "20px";
        
        let requestedPropertiesAndRequiredNodes = this.main.databaseMisc.properties.split("/");
        let requestedProperties = requestedPropertiesAndRequiredNodes[0];

        let propertyInfo;

        for(const property of requestedProperties.split(",")) { // For every property the lecturer has requested
            propertyInfo = property.split(":"); // propertyInfo[0] is either tree or node, propertyInfo[1] is the actual property name

            if(propertyInfo[0] === "tree") { // Display any tree property input boxes immediately
                this.treePropertyInputs[propertyInfo[1]].parentElement.style.display = "inline-block"; // Get the actual input box for the tree property that the lecturer included and display it and its label

                this.requestedTreeProperties.push(propertyInfo[1]);
                this.numRequestedTreeProperties++;
            }
            else if(propertyInfo[0] === "node") {
                this.requestedNodeProperties.push(propertyInfo[1]);
                this.numRequestedNodeProperties++;
            }

            this.requestedProperties.push(propertyInfo[1]);
        }

        this.fillRequiredNodesArray(requestedPropertiesAndRequiredNodes[1]);

        this.fillIntialNodePropertyAnswers();
        this.serializePropertyAnswers();

        /** Add event listeners to input boxes */
        for(const item in this.treePropertyInputs) {
            this.treePropertyInputs[item].addEventListener("change", this.treePropertyInputChanged.bind(this, this.treePropertyInputs[item], this.treePropertyInputs[item].id.split(":")[2]));
        }

        for(const item in this.nodePropertyInputs) {
            this.nodePropertyInputs[item].addEventListener("input", this.nodePropertyInputChanged.bind(this, this.nodePropertyInputs[item], this.nodePropertyInputs[item].id.split(":")[2]));
        }

        this.main.modifyTreeTools.style.display = "none";
        this.propertyTools.style.display = "block";            
        if(this.numRequestedTreeProperties === 0) {
            this.treePropertiesDiv.style.display = "none";        
        }

        if(this.main.databaseMisc.disablepropertytools) {
            this.disableInputs();
        }

        if(this.main.databaseMisc.propertiescorrectness !== "") { // A marked record of what the student answered. Will have a value if we are showing the student whether they were correct
            this.populateResults();
            this.colourTreePropertyInputBoxes(); // Colour the tree property input boxes immediately. Colouring of node property input boxes handled when a node is actually selected
            this.colourNodes(); // Fill the actual nodes with the student's results
        }

        /** Configure help text */
        this.main.tooltipText.innerHTML = this.main.helpText.properties;
    }

    /** Fills requiredNodes array with the nodes that the lecturer selected */
    fillRequiredNodesArray(requiredNodesString) {
        if(this.numRequestedNodeProperties > 0) { // There were actually node properties requested
            if(requiredNodesString) { // Only those nodes specified in requiredNodesString are required nodes
                let nodeInfo;
                let nodeValue;
                let nodeOrder;

                for(const node of requiredNodesString.split("#")) {
                    nodeInfo = node.split(":");
                    nodeValue = Number(nodeInfo[0]);
                    nodeOrder = Number(nodeInfo[1]);

                    this.requiredNodes.push(this.main.tree.getNode(nodeValue, nodeOrder));
                }

            }
            else { // All nodes are required nodes
                this.requiredNodes = this.main.tree.nodeArray;
            }

            for(const requiredNode of this.requiredNodes) {
                requiredNode.properties.required = true;
            }

            this.main.redrawCanvas();
        }
        else {
            this.requiredNodes = null;
        }
    }

    /** Disables input for all input boxes */
    disableInputs() {
        for(const treePropertyInput in this.treePropertyInputs) {
            this.treePropertyInputs[treePropertyInput].readOnly = true;
        }

        for(const nodePropertyInput in this.nodePropertyInputs) {
            this.nodePropertyInputs[nodePropertyInput].readOnly = true;
        }
    }

    /** Fill arrays with the student's results (correct / incorrect) for the requested tree and node properties */
    populateResults() {
        let properties = this.main.databaseMisc.propertiescorrectness.split("|");
        let propertyName;

        for(const property of properties) {
            propertyName = property.split(".")[0];

            if(this.requestedTreeProperties.includes(propertyName)) { // Tree property
                this.treePropertyResults.push(property);
            }
            else { // Node property
                this.nodePropertyResults.push(property);
            }
        }
    }

    /** Colours the tree property input boxes indicating whether the answer was correct or not*/
    colourTreePropertyInputBoxes() {
        let treePropertyInfo;
        let treePropertyName;
        let result;
        
        for(const treeProperty of this.treePropertyResults) {
            treePropertyInfo = treeProperty.split(".");
            treePropertyName = treePropertyInfo[0];
            result = treePropertyInfo[1];

            if(result === "1") { // Correct
                this.treePropertyInputs[treePropertyName].style.backgroundColor = "#a0eca5";
            }
            else { // Incorrect
                this.treePropertyInputs[treePropertyName].style.backgroundColor = "#f0afaa";
            }
        }
    }

    /** Colours the actual nodes on the board indicating whether or not the student answered all node properties for that node correctly */
    colourNodes() {
        let key;

        let nodePropertyInfo;
        let nodePropertyName;
        let nodePropertyNodeList;

        let index;

        for(const node of this.requiredNodes) {
            key = node.value + "-" + node.orderPlaced;

            for(const nodeProperty of this.nodePropertyResults) {
                nodePropertyInfo = nodeProperty.split(".");
                nodePropertyName = nodePropertyInfo[0];

                nodePropertyNodeList = nodePropertyInfo[1].split("#");
                index = nodePropertyNodeList.findIndex(nodeEntry => nodeEntry.split(":")[0] === key); // Find node in nodePropertyNodeList
                
                if(nodePropertyNodeList[index].split(":")[1] === "0") node.properties.correct = false; // The student input an incorrect property value for this node (defaults to true)
            }
        }

        this.main.redrawCanvas();
    }

    /** Colours the node property input boxes indicating whether the answer was correct or not */
    colourNodePropertyInputBoxes() {
        let key = this.main.selectedNode.value + "-" + this.main.selectedNode.orderPlaced;

        let nodePropertyInfo;
        let nodePropertyName;
        let nodePropertyNodeList;

        let nodeInfo;
        let nodeValueAndOrder;
        let result;

        for(const nodeProperty of this.nodePropertyResults) {
            nodePropertyInfo = nodeProperty.split(".");
            nodePropertyName = nodePropertyInfo[0];

            nodePropertyNodeList = nodePropertyInfo[1].split("#");
            for(const node of nodePropertyNodeList) {
                nodeInfo = node.split(":");
                nodeValueAndOrder = nodeInfo[0];
                result = nodeInfo[1];

                if(nodeValueAndOrder === key) { // If the node value and order match the selected node
                    if(result === "1") { // Correct
                        this.nodePropertyInputs[nodePropertyName].style.backgroundColor = "#a0eca5";
                    }
                    else { // Incorrect
                        this.nodePropertyInputs[nodePropertyName].style.backgroundColor = "#f0afaa";
                    }
                }
            }
        }
    }

    /** Called when a node is selected on a properties question. Displays the node property input boxes that the lecturer included and fills in any previously entered values */
    displayNodePropertyInputs(show) {
        let nodePropertyInput;

        let answerArrayForProperty;
        let nodeValue;
        let nodeOrder;

        let nodeEntry;
        let nodeEntryValue;
        let nodeEntryOrder;

        let index;

        for(const nodePropertyName of this.requestedNodeProperties) {
            nodePropertyInput = this.nodePropertyInputs[nodePropertyName]; // Get the actual input box for the node property that the lecturer included
           
            if(show) {
                /** Fill in previously filled in value for the current property of the currently selected node */
                answerArrayForProperty = this.propertyAnswers[nodePropertyName].split("#");
                nodeValue = this.main.selectedNode.value;
                nodeOrder = this.main.selectedNode.orderPlaced;
            
                index = answerArrayForProperty.findIndex((item) => {
                    nodeEntry = item.split(":");
                    nodeEntryValue = Number(nodeEntry[0].split("-")[0]); // Have to split up node value and node order and cast to a Number now since we are comparing with the actual selected node's value and order
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
                this.nodePropertiesHeading.style.display = "inline-block";
            }
            else {
                nodePropertyInput.parentElement.style.display = "none"; // Hide the input box and its label
                this.nodePropertiesHeading.style.display = "none";
            }
        }

        if(this.main.databaseMisc.propertiescorrectness !== "") {
            this.colourNodePropertyInputBoxes();
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
     * Called when the input box of one of the node properties receives new input. This function is not called if the input is invalid i.e. NaN
     * @param {object} nodePropertyInput The actual input box of the property receiving new input
     * @param {string} nodePropertyName The name of this node property
     */
    nodePropertyInputChanged(nodePropertyInput, nodePropertyName) {
        let newEntry = this.main.selectedNode.value + "-" + this.main.selectedNode.orderPlaced + ":" + nodePropertyInput.value; // Each entry is uniquely identified by the node value and the node order

        let answerArrayForProperty = this.propertyAnswers[nodePropertyName].split("#"); // Array of all entries for the current node property
        let index = answerArrayForProperty.findIndex((nodeEntry) => nodeEntry.split(":")[0] === newEntry.split(":")[0]); // Find the index of the new entry in the node property answer string identified with the new entry's node value and order

        answerArrayForProperty[index] = newEntry; // Replace the previosu entry matching the new entry's node order and value
        this.propertyAnswers[nodePropertyName] = answerArrayForProperty.join("#"); // Update the property answer string for the current node property

        this.serializePropertyAnswers();

        if(this.selectedNodeHasAllProperties(this.main.selectedNode)) { // If the student has entered all requested node properties for the selected node, indicate this visually on the board
            this.main.selectedNode.properties.hasAllProperties = true;
        }
        else {
            this.main.selectedNode.properties.hasAllProperties = false;
        }

        this.main.redrawCanvas();

        // console.log(nodePropertyName + ": " + this.propertyAnswers[nodePropertyName]);
    }

    /** Called when the HTML for the properties question is being configured. Fills up every requested node property with all existing nodes but empty property values so that even if the student doesn't answer anything, their submission can still be compared to the model answer */
    fillIntialNodePropertyAnswers() {
        let string = "";

        for(const nodeProperty of this.requestedNodeProperties) {
            for(const node of this.requiredNodes) {
                string = node.value + "-" + node.orderPlaced + ":";
                
                if(this.propertyAnswers[nodeProperty] === "") {
                    this.propertyAnswers[nodeProperty] = string;
                }
                else {
                    this.propertyAnswers[nodeProperty] += "#" + string;
                }
            }
        }
    }

    /** Called whenever a property string from propertyAnswers is updated. Constructs the actual answer string from propertyAnswers */
    serializePropertyAnswers() {
        let string = "";

        for(const requestedProperty of this.requestedProperties) {
            if(requestedProperty !== this.requestedProperties[this.requestedProperties.length - 1]) {
                string += requestedProperty + "." + this.propertyAnswers[requestedProperty] + "|";
            }
            else {
                string += requestedProperty + "." + this.propertyAnswers[requestedProperty];
            }
        }

        this.answerBox.value = string;
    }

    /** Called when a node property input box is updated. Checks whether the provided node has values for all requested node properties */
    selectedNodeHasAllProperties(node) {
        let nodeString = node.value + "-" + node.orderPlaced; // String used to identify node in node property arrays

        let nodeEntry;
        let numPropertiesSpecified = 0;

        for(const nodePropertyName of this.requestedNodeProperties) {
            for(const entry of this.propertyAnswers[nodePropertyName].split("#")) {
                nodeEntry = entry.split(":");
                if(nodeEntry[0] === nodeString && nodeEntry[1] !== "") { // Found an entry for the selected node in the nodePropertyName string in propertyAnswers and the node property value was not empty
                    numPropertiesSpecified++;
                }
            }
        }

        return numPropertiesSpecified === this.numRequestedNodeProperties;
    }

    /** Reinputs the property values that the student had entered but not yet submitted */
    reconstructLastAnswer() {
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

        if(this.requiredNodes) {
            let hit = 0;
            /** Find each node in the tree and determine whether all requested node properties for it have been specified */
            for(const node of this.requiredNodes) {
                if(this.selectedNodeHasAllProperties(node)) {
                    hit++;
                    node.properties.hasAllProperties = true;
                }
            }

            if(hit > 0) { // Only redraw the canvas if at least one node has all the requested properties specified
                this.main.redrawCanvas();
            }   
        }
    }
}