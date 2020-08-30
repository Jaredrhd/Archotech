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
        for(const checkedProperty of this.checkedProperties) {
            // TODO : CALL FUNCTIONS TO GENERATE MODEL ANSWER
            var addLeafNumberLabel = document.getElementById("leaf-num-label");
            var addLeafNumberBox = document.getElementById("leaf-num-count");
            
            if(this.numLeavesCheckbox.checked){
                addLeafNumberLabel.style.display = "inline-block";
                addLeafNumberBox.style.display = "inline-block";
                addLeafNumberBox.value = this.calculateLeafNumber();
            }
        }
    }

    calculateLeafNumber(){
        return 0;
    }
}