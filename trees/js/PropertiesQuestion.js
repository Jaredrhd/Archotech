class PropertiesQuestion {
    constructor(main) {
        this.main = main;

        this.radio = document.querySelector('[qtype_name="properties"]');

        /** Values stored in DB */
        this.requestedProperties = document.getElementById("requested_properties");
        this.propertiesString = document.getElementById("properties_string");

        /** TREE PROPERTIES */
        this.treePropertiesCheckbox = document.querySelector('[option_name="tree_properties_check"]');

        this.numLeavesCheckbox = document.querySelector('[property_name="tree:num_leaves"]');
        this.numEdgesCheckbox = document.querySelector('[property_name="tree:num_edges"]');
        this.numInternalNodesCheckbox = document.querySelector('[property_name="tree:num_internal_nodes"]');;

        /** NODE PROPERTIES */
        this.nodePropertiesCheckbox = document.querySelector('[option_name="node_properties_check"]');
        
        this.heightCheckbox = document.querySelector('[property_name="node:height"]');
        this.depthCheckbox = document.querySelector('[property_name="node:depth"]');
        this.degreeCheckbox = document.querySelector('[property_name="node:degree"]');
        this.levelCheckbox = document.querySelector('[property_name="node:level"]');

        this.propertyOptions = [this.treePropertiesCheckbox, this.nodePropertiesCheckbox];
        this.propertyList = [this.numLeavesCheckbox, this.numEdgesCheckbox, this.numInternalNodesCheckbox, 
                                this.heightCheckbox, this.depthCheckbox, this.degreeCheckbox, this.levelCheckbox];
        this.checkedProperties = [];
        
        this.properties = {
            NUM_LEAVES: "tree:num_leaves",
            NUM_EDGES: "tree:num_edges",
            NUM_INTERNAL_NODES: "tree:num_internal_nodes",
            HEIGHT: "node:height",
            DEPTH: "node:depth",
            DEGREE: "node:degree",
            LEVEL: "node:level"
        }

        this.radio.addEventListener("change", this.updateQuestionType.bind(this));

        for(const option of this.propertyOptions) {
            option.parentElement.style.marginLeft += "30px";
            option.addEventListener("change", this.propertyChecked.bind(this, option));
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
        this.main.propertyTools.style.display = "inline-block";
        this.generateString();
    }

    propertyChecked(property) {
        if(property.checked) {
            this.checkedProperties.push(property.getAttribute("property_name"));
        }
        else {
            let index = this.checkedProperties.findIndex((property_name) => property_name === property.getAttribute("property_name"));
            this.checkedProperties.splice(index, 1);
        }

        this.requestedProperties.value = this.checkedProperties.toString();
        this.generateString();
    }

    generateString() {
        var addLeafNumberLabel = document.getElementById("leaf-num-label");
        var addLeafNumberBox = document.getElementById("leaf-num-count");
        var addEdgeNumberLabel = document.getElementById("edge-num-label");
        var addEdgeNumberBox = document.getElementById("edge-num-count");
        var addInternalNodeNumberLabel = document.getElementById("internal-node-num-label");
        var addInternalNodeNumberBox = document.getElementById("internal-node-num-count");
        var addNodeDegreeNumberLabel = document.getElementById("node-degree-num-label");
        var addNodeDegreeNumberBox = document.getElementById("node-degree-num-count");

        if(this.numLeavesCheckbox.checked && this.treePropertiesCheckbox.checked && this.radio.checked){
            addLeafNumberLabel.style.display = "inline-block";
            addLeafNumberBox.style.display = "inline-block";
            this.calculateLeafNumber(addLeafNumberBox);
        }
        else{
                addLeafNumberLabel.style.display = "none";
                addLeafNumberBox.style.display = "none";
        } 
        if(this.numEdgesCheckbox.checked && this.treePropertiesCheckbox.checked && this.radio.checked){
                addEdgeNumberLabel.style.display = "inline-block";
                addEdgeNumberBox.style.display = "inline-block";
                this.calculateEdgeNumber(addEdgeNumberBox);
        }
        else{
                addEdgeNumberLabel.style.display = "none";
                addEdgeNumberBox.style.display = "none";
        }
        if(this.numInternalNodesCheckbox.checked && this.treePropertiesCheckbox.checked && this.radio.checked){
                addInternalNodeNumberLabel.style.display = "inline-block";
                addInternalNodeNumberBox.style.display = "inline-block";
                this.calculateInternalNodeNumber(addInternalNodeNumberBox);
        }
        else{
                addInternalNodeNumberLabel.style.display = "none";
                addInternalNodeNumberBox.style.display = "none";
        }
        if(this.degreeCheckbox.checked && this.nodePropertiesCheckbox.checked && this.radio.checked && this.main.selectedNode){
                addNodeDegreeNumberLabel.style.display = "inline-block";
                addNodeDegreeNumberBox.style.display = "inline-block";
                this.calculateNodeDegreeNumber(addNodeDegreeNumberBox);
        }
    else{
            addNodeDegreeNumberLabel.style.display = "none";
            addNodeDegreeNumberBox.style.display = "none";
    }
            for(const checkedProperty of this.checkedProperties) {
            // TODO : CALL FUNCTIONS TO GENERATE MODEL ANSWER
            
        }
    }

    calculateLeafNumber(addLeafNumberBox){
        if (!this.main.tree){
            addLeafNumberBox.value = 0;
        }
        else{
            let numLeaves = 0;
            for(let i = 0; i < this.main.tree.nodeArray.length; i++) {
                if(!this.main.tree.nodeArray[i].children.rightChild && !this.main.tree.nodeArray[i].children.leftChild){
                    numLeaves++;
                }
            }
            addLeafNumberBox.value = numLeaves;
        return;
        }
    }

    calculateEdgeNumber(addEdgeNumberBox){
        if (!this.main.tree){
            addEdgeNumberBox.value = 0;
        }
        else{
            if(this.main.tree.nodeArray.length - 1 < 0){
                addEdgeNumberBox.value = 0;
            }
            else{
                addEdgeNumberBox.value = this.main.tree.nodeArray.length - 1;
            }
        }
        return;
    }
    calculateInternalNodeNumber(addInternalNodeNumberBox){
        if (!this.main.tree){
            addInternalNodeNumberBox.value = 0;
        }
        else{
            let numInternalNodes = 0;
            for(let i = 0; i < this.main.tree.nodeArray.length; i++) {
                if(this.main.tree.nodeArray[i].children.rightChild || this.main.tree.nodeArray[i].children.leftChild){
                    numInternalNodes++;
                }
            }
            addInternalNodeNumberBox.value = numInternalNodes;
        }
        return;
    }
    calculateNodeDegreeNumber(addNodeDegreeNumberBox){
        console.log(this.main.selectedNode);
        if(!this.main.tree){
            addNodeDegreeNumberBox.value = 0;
        }
        else if(this.main.selectedNode.children.rightChild && this.main.selectedNode.children.leftChild){
            addNodeDegreeNumberBox.value = 2;
        }
        else if(this.main.selectedNode.children.rightChild || this.main.selectedNode.children.leftChild){
            addNodeDegreeNumberBox.value = 1;
        }
        else{
            addNodeDegreeNumberBox.value = 0;
        }
        return;
    }
}