class PropertiesQuestion {
    constructor(main) {
        this.main = main;

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
        this.degreeCheckbox = document.querySelector('[property_name="node:degree"]');
        this.levelCheckbox = document.querySelector('[property_name="node:level"]');

        this.nodePropertyFunctions = {
            height: this.getNodeHeight.bind(this),
            depth: this.getNodeDepth.bind(this),
            degree: this.getNodeDegree.bind(this)
        }

        this.propertyOptions = [this.treePropertiesCheckbox, this.nodePropertiesCheckbox];
        this.propertyList = [this.numLeavesCheckbox, this.numEdgesCheckbox, this.numInternalNodesCheckbox, 
                                this.heightCheckbox, this.depthCheckbox, this.degreeCheckbox, this.levelCheckbox];
        this.checkedProperties = [];
        
        this.propertyAnswers = {
            num_leaves: "",
            num_edges: "",
            num_internal_nodes: "",
            height: "",
            depth: "",
            degree: "",
            level: ""
        }

        this.radio.addEventListener("change", this.updateQuestionType.bind(this));

        for(const option of this.propertyOptions) {
            option.parentElement.style.marginLeft += "30px";
        }

        for(const property of this.propertyList) {
            property.parentElement.style.marginLeft += "60px";
            property.addEventListener("change", this.propertyChecked.bind(this, property));
        }
    }

    /** Called when 'Tree Properties' radio button is checked */
    updateQuestionType() {
        if(this.main.setup.currQuestion.BST) {
            this.main.bstTools.style.display = "none";
        }

        this.main.setup.updateCurrentQuestion("PROPERTIES");
        // this.main.propertyTools.style.display = "inline-block";
        // this.updatePropertiesButton.style.display = "inline-block";
        // this.updatePropertiesButton.addEventListener("click", this.updatePropertyAnswers.bind(this));
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

        this.sortCheckedProperties();
        this.requestedProperties.value = this.checkedProperties.toString();
        this.updatePropertyAnswers();
    }

    updatePropertyAnswers() {
        //#region 
        // var addLeafNumberLabel = document.getElementById("leaf-num-label");
        // var addLeafNumberBox = document.getElementById("leaf-num-count");
        // var addEdgeNumberLabel = document.getElementById("edge-num-label");
        // var addEdgeNumberBox = document.getElementById("edge-num-count");
        // var addInternalNodeNumberLabel = document.getElementById("internal-node-num-label");
        // var addInternalNodeNumberBox = document.getElementById("internal-node-num-count");
        // var addNodeDegreeNumberLabel = document.getElementById("node-degree-num-label");
        // var addNodeDegreeNumberBox = document.getElementById("node-degree-num-count");

        // if(this.numLeavesCheckbox.checked && this.treePropertiesCheckbox.checked && this.radio.checked){
        //     addLeafNumberLabel.style.display = "inline-block";
        //     addLeafNumberBox.style.display = "inline-block";
        //     this.calculateLeafNumber(addLeafNumberBox);
        // }
        // else{
        //         addLeafNumberLabel.style.display = "none";
        //         addLeafNumberBox.style.display = "none";
        // } 
        // if(this.numEdgesCheckbox.checked && this.treePropertiesCheckbox.checked && this.radio.checked){
        //         addEdgeNumberLabel.style.display = "inline-block";
        //         addEdgeNumberBox.style.display = "inline-block";
        //         this.calculateEdgeNumber(addEdgeNumberBox);
        // }
        // else{
        //         addEdgeNumberLabel.style.display = "none";
        //         addEdgeNumberBox.style.display = "none";
        // }
        // if(this.numInternalNodesCheckbox.checked && this.treePropertiesCheckbox.checked && this.radio.checked){
        //         addInternalNodeNumberLabel.style.display = "inline-block";
        //         addInternalNodeNumberBox.style.display = "inline-block";
        //         this.calculateInternalNodeNumber(addInternalNodeNumberBox);
        // }
        // else{
        //         addInternalNodeNumberLabel.style.display = "none";
        //         addInternalNodeNumberBox.style.display = "none";
        // }
        // if(this.degreeCheckbox.checked && this.nodePropertiesCheckbox.checked && this.radio.checked && this.main.selectedNode){
        //         addNodeDegreeNumberLabel.style.display = "inline-block";
        //         addNodeDegreeNumberBox.style.display = "inline-block";
        //         this.calculateNodeDegreeNumber(addNodeDegreeNumberBox);
        // }
        // else{
        //     addNodeDegreeNumberLabel.style.display = "none";
        //     addNodeDegreeNumberBox.style.display = "none";
        // }
        //#endregion

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

        /** Loop through all nodes in the tree and generate the answer string for the given node property (nodePropertyName) */
        for(const node of this.main.tree.nodeArray) { // The node property string for the given node property is arranged by the order that the nodes were added to the tree
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
        console.log(this.main.tree.nodeArray);
        let string = "";
        
        let checkedPropertyInfo;
        let checkedPropertyName;

        for(const checkedProperty of this.checkedProperties) { // The serialized answer string is arranged in the same order as the properties appear in propertyAnswers
            checkedPropertyInfo = checkedProperty.split(":");
            checkedPropertyName = checkedPropertyInfo[1];

            for(const propertyName in this.propertyAnswers) {
                if(propertyName === checkedPropertyName) {
                    if(checkedProperty !== this.checkedProperties[this.checkedProperties.length - 1]) { // If the current checked property in the list of checked properties is not the last one in the list, add a delimeter
                        string += propertyName + "." + this.propertyAnswers[propertyName] + "|";
                    }
                    else {
                        string += propertyName + "." + this.propertyAnswers[propertyName];
                    }
                }
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
        return 999;
    }

    getNodeDepth(node) {
        return 999;
    }

    getNodeDegree(node) {
        let nodeDegree = 0;

        if(node.hasLeftChild() && node.hasRightChild()) {
            nodeDegree = 2;
        }
        else if(node.hasLeftChild() || node.hasRightChild()) {
            nodeDegree = 1;
        }

        return nodeDegree;
    }
}