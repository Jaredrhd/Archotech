class PropertiesQuestion {
    constructor(main) {
        this.main = main;

        this.selectRequiredNodesPropertiesButton = document.getElementById("select-required-nodes-for-properties");
        this.selectingRequiredNodes = false;
        this.requiredNodes = [];
        this.radio = document.querySelector('[qtype_name="properties"]');
        this.updatePropertiesButton = document.getElementById("update-properties");

        /** Values stored in DB */
        this.requestedProperties = document.getElementById("requested_properties");
        this.propertiesString = document.getElementById("properties_string");

        /** TREE PROPERTIES */
        this.treePropertiesCheckbox = document.querySelector('[option_name="tree_properties_check"]');

        this.numLeavesCheckbox = document.querySelector('[property_name="tree:num_leaves"]');
        this.numEdgesCheckbox = document.querySelector('[property_name="tree:num_edges"]');
        this.numInternalNodesCheckbox = document.querySelector('[property_name="tree:num_internal_nodes"]');

        this.treePropertyFunctions = {
            num_leaves: this.getNumLeaves.bind(this),
            num_edges: this.getNumEdges.bind(this),
            num_internal_nodes: this.getNumInternalNodes.bind(this)
        }

        /** NODE PROPERTIES */
        this.nodePropertiesCheckbox = document.querySelector('[option_name="node_properties_check"]');
        
        this.heightCheckbox = document.querySelector('[property_name="node:height"]');
        this.depthCheckbox = document.querySelector('[property_name="node:depth"]');
        this.numChildrenCheckbox = document.querySelector('[property_name="node:num_children"]');

        this.nodePropertyFunctions = {
            height: this.getNodeHeight.bind(this),
            depth: this.getNodeDepth.bind(this),
            num_children: this.getNumChildren.bind(this)
        }

        this.propertyOptions = [this.treePropertiesCheckbox, this.nodePropertiesCheckbox];
        this.propertyList = [this.numLeavesCheckbox, this.numEdgesCheckbox, this.numInternalNodesCheckbox, 
                                this.heightCheckbox, this.depthCheckbox, this.numChildrenCheckbox];
        this.checkedProperties = [];
        
        this.propertyAnswers = {
            num_leaves: "",
            num_edges: "",
            num_internal_nodes: "",
            height: "",
            depth: "",
            num_children: ""
        }

        this.selectRequiredNodesPropertiesButton.addEventListener("click", this.selectRequiredNodesClicked.bind(this));
        this.radio.addEventListener("change", this.updateQuestionType.bind(this));

        for(const option of this.propertyOptions) {
            option.parentElement.style.marginLeft += "30px";
        }

        for(const property of this.propertyList) {
            property.parentElement.style.marginLeft += "60px";
            property.addEventListener("change", this.propertyChecked.bind(this, property));
        }
    }

    /** Called when 'Select Required Nodes' button is clicked */
    selectRequiredNodesClicked() {
        this.selectingRequiredNodes = !this.selectingRequiredNodes;

        if(this.selectingRequiredNodes) {
            this.selectRequiredNodesPropertiesButton.style.backgroundColor = "#fcdb73";
            this.selectRequiredNodesPropertiesButton.style.borderColor = "#fcdb73";

            this.main.nodeValueInput.disabled = true;
            this.main.randNodeValueCheckbox.disabled = true;
            this.main.removeNodeButton.style.display = "none";
            this.main.editNodeValueButton.style.display = "none";

            if(this.main.selectedNode) {
                this.main.selectedNode.selected = false;
                this.main.selectedNode = null;
            }
            this.main.redrawCanvas();
        }
        else {
            this.selectRequiredNodesPropertiesButton.style.backgroundColor = "#ced4da";
            this.selectRequiredNodesPropertiesButton.style.borderColor = "#ced4da";

            if(!this.main.randNodeValueCheckbox.checked) {
                this.main.nodeValueInput.disabled = false;
            }
            this.main.randNodeValueCheckbox.disabled = false;
            if(this.main.selectedNode) {
                this.main.removeNodeButton.style.display = "inline-block";
                this.main.editNodeValueButton.style.display = "inline-block";
            }
        }
    }

    /** Called when a node is selected / deselected after the 'Select Required Nodes' button is clicked */
    selectRequiredNode(node) {
        if(node.properties.required) {
            node.properties.required = false;
            this.requiredNodes.splice(this.requiredNodes.findIndex(prevSelectedNode => (prevSelectedNode.value === node.value && prevSelectedNode.orderPlaced === node.orderPlaced)), 1);
        }
        else {
            node.properties.required = true;
            this.requiredNodes.push(node);
        }

        this.updateRequestedPropertiesString();
        this.updatePropertyAnswers();
        this.main.redrawCanvas();
    }

    /** Returns a string of all the required nodes and their orders */
    serializeRequiredNodes() {
        let string = "";

        let nodeArray = this.requiredNodes.length === 0 ? this.main.tree.nodeArray : this.requiredNodes; // If there is at least one node property checked: if requiredNodes is empty, just use the tree.nodeArray (i.e. all nodes), otherwise requiredNodes

        for(const node of nodeArray) {
            string += node.value + ":" + node.orderPlaced;

            if(node !== nodeArray[nodeArray.length - 1]) string += "#";
        }

        return string;
    }

    /** Called when 'Tree Properties' radio button is checked */
    updateQuestionType() {
        if(this.main.setup.currQuestion.BST) {
            this.main.bstTools.style.display = "none";
        }

        this.main.setup.updateCurrentQuestion("PROPERTIES");
        if(this.main.tree && this.main.tree.numNodes > 0) {
            this.selectRequiredNodesPropertiesButton.style.display = "inline-block";
        }
        this.updatePropertyAnswers();
    }

    /** Sorts the array of checked properties in the same order as the properties appear in propertyAnswers */
    sortCheckedProperties() {
        let propertyNames = Object.keys(this.propertyAnswers);
        let sortedCheckedProperties = [];

        while(sortedCheckedProperties.length !== this.checkedProperties.length) {
            for(let i = 0; i < this.checkedProperties.length; i++) {
                if(this.checkedProperties[i] === ("tree:" + propertyNames[0]) || this.checkedProperties[i] === ("node:" + propertyNames[0])) { // Append the property type since values in propertyNames don't have this prefix
                    sortedCheckedProperties.push(this.checkedProperties[i]);
                    propertyNames.shift();
                }
                else if(i === this.checkedProperties.length - 1) { // propertyNames[0] isn't a checked property so remove it and start again
                    propertyNames.shift();
                }
            }
        }
        
        this.checkedProperties = sortedCheckedProperties;
    }

    propertyChecked(property) {
        if(property.checked) {
            this.checkedProperties.push(property.getAttribute("property_name")); // Add the actual property name (e.g. num_leaves) to the requested properties
        }
        else {
            let index = this.checkedProperties.findIndex((property_name) => property_name === property.getAttribute("property_name"));
            this.checkedProperties.splice(index, 1);
        }

        this.updateRequestedPropertiesString();
        this.updatePropertyAnswers();
    }

    updateRequestedPropertiesString() {
        this.sortCheckedProperties();
        this.requestedProperties.value = this.checkedProperties.toString() + "/";
        if(/node:height|node:depth|node:num_children/.test(this.requestedProperties.value)) { // At least one node property is checked
            this.requestedProperties.value += this.serializeRequiredNodes();
        }
        if(this.requestedProperties.value === "/") this.requestedProperties.value = ""; // No tree or node properties checked
    }

    updatePropertyAnswers() {
        if(!this.main.tree) return;

        let propertyInfo;
        let propertyType;
        let propertyName;

        for(const checkedProperty of this.checkedProperties) {
            propertyInfo = checkedProperty.split(":");
            propertyType = propertyInfo[0];
            propertyName = propertyInfo[1];

            if(propertyType === "tree") {
                this.propertyAnswers[propertyName] = this.getTreePropertyString(propertyName); // Update the tree property answer with the new tree property string
            }
            else {
                this.propertyAnswers[propertyName] = this.getNodePropertyString(propertyName); // Update the node property answer with the new node property string
            }
        }

        this.serializePropertyAnswers();
    }

    /** Called to generate the tree property answer for a specific tree property */
    getTreePropertyString(treePropertyName) {
        return this.treePropertyFunctions[treePropertyName]();
    }

    /** Called to generate the node property answer for a specific node property */
    getNodePropertyString(nodePropertyName) {
        let string = "";
        let nodeEntry = "";

        let nodeArray = this.requiredNodes.length === 0 ? this.main.tree.nodeArray : this.requiredNodes; // If there is at least one node property checked: if requiredNodes is empty, just use the tree.nodeArray (i.e. all nodes), otherwise requiredNodes

        /** Loop through all required nodes in the tree and generate the answer string for the given node property (nodePropertyName) */
        for(const node of nodeArray) { // The node property string for the given node property is arranged by the order that the required nodes were clicked by the lecturer
            nodeEntry = node.value + "-" + node.orderPlaced + ":" + this.nodePropertyFunctions[nodePropertyName](node);
            
            if(string === "") {
                string = nodeEntry;
            }
            else {
                string += "#" + nodeEntry;
            }
        }

        return string;
    }

    /** Called when the property answer strings are updated. Serializes the property answers into one answer string */
    serializePropertyAnswers() {
        let string = "";
        
        let checkedPropertyInfo;
        let checkedPropertyName;

        for(const checkedProperty of this.checkedProperties) { // The serialized answer string is arranged in the same order as the properties appear in propertyAnswers
            checkedPropertyInfo = checkedProperty.split(":");
            checkedPropertyName = checkedPropertyInfo[1];

            if(checkedProperty !== this.checkedProperties[this.checkedProperties.length - 1]) { // If the current checked property in the list of checked properties is not the last one in the list, add a delimeter
                string += checkedPropertyName + "." + this.propertyAnswers[checkedPropertyName] + "|";
            }
            else {
                string += checkedPropertyName + "." + this.propertyAnswers[checkedPropertyName];
            }
        }

        if(this.main.tree.numNodes === 0) string = ""; // Account for if the lecturer had previously added a node and generated some answer string, but now has removed all nodes in the tree
        this.propertiesString.value = string;
    }

    getNumLeaves() {
        let numLeaves = 0;
        for(const node of this.main.tree.nodeArray) {
            if(node.isLeaf()) {
                numLeaves++;
            }
        }

        return numLeaves;
    }

    getNumEdges() {
        let numEdges = 0;
        if(this.main.tree.nodeArray.length - 1 > 0) {
            numEdges = this.main.tree.nodeArray.length - 1;
        }

        return numEdges;
    }
    
    getNumInternalNodes() {
        let numInternalNodes = 0;
        for(const node of this.main.tree.nodeArray) {
            if(!node.isLeaf()) {
                numInternalNodes++;
            }
        }

        return numInternalNodes;
    }

    getNodeHeight(node) {
        if(node.isLeaf()) return 0;

        if(node.hasLeftChild() && node.hasRightChild()) {
            return Math.max(1 + this.getNodeHeight(node.children.leftChild), 1 + this.getNodeHeight(node.children.rightChild));
        }
        else if(node.hasLeftChild()) {
            return 1 + this.getNodeHeight(node.children.leftChild);
        }
        else {
            return 1 + this.getNodeHeight(node.children.rightChild);
        }
    }

    getNodeDepth(node) {
        let depth = 0;
        while(node.parent) {
            depth++;
            node = node.parent;
        }
        return depth;
    }

    getNumChildren(node) {
        let numChildren = 0;

        if(node.hasLeftChild() && node.hasRightChild()) {
            numChildren = 2;
        }
        else if(node.hasLeftChild() || node.hasRightChild()) {
            numChildren = 1;
        }

        return numChildren;
    }
}