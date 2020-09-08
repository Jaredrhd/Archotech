class TraversalQuestion {
    constructor(main) {
        this.main = main;

        this.radio = document.querySelector('[qtype_name="traversal"]');
        this.preOrderRadio = document.querySelector('[traversal_type="preorder"]');
        this.inOrderRadio = document.querySelector('[traversal_type="inorder"]');
        this.postOrderRadio = document.querySelector('[traversal_type="postorder"]');
        this.traversalOptions = [this.preOrderRadio, this.inOrderRadio, this.postOrderRadio];

        // this.availableValues = [...Array(this.main.MAX_NODE_VALUE).keys()].map(i => i + 1);

        /** Values stored in the DB */
        this.preOrder = document.getElementById("preorder");
        this.inOrder = document.getElementById("inorder");
        this.postOrder = document.getElementById("postorder");

        /** Strings that are modified when a traversal is performed */
        this.preOrderString = "";
        this.inOrderString = "";
        this.postOrderString = "";

        this.preOrderRadio.checked = true; // Default of pre-order traversal

        this.radio.addEventListener("change", this.updateQuestionType.bind(this));

        for(const traversalOption of this.traversalOptions) {
            traversalOption.parentElement.style.marginLeft += "30px";
            traversalOption.addEventListener("change", this.traversalChanged.bind(this));
        }
    }
    
    updateQuestionType() {
        if(this.main.setup.currQuestion.BST) {
            this.main.bstTools.style.display = "none";
        }
        else if(this.main.setup.currQuestion.PROPERTIES){
            this.main.propertyTools.style.display = "none";
        }
        
        this.main.setup.updateCurrentQuestion("TRAVERSAL");
    }

    performTraversal() {
        if(!this.main.tree) return;

        if(this.preOrderRadio.checked) {
            this.preOrderTraversal(this.main.tree.root);
            this.preOrder.value = this.preOrderString;
            this.preOrderString = "";
        }
        else {
            this.preOrder.value = "";
        }

        if(this.inOrderRadio.checked) {
            this.inOrderTraversal(this.main.tree.root);
            this.inOrder.value = this.inOrderString;
            this.inOrderString = "";
        }
        else {
            this.inOrder.value= "";
        }

        if(this.postOrderRadio.checked) {
            this.postOrderTraversal(this.main.tree.root);
            this.postOrder.value = this.postOrderString;
            this.postOrderString = "";
        }
        else {
            this.postOrder.value = "";
        }
    }

    traversalChanged() {
        this.performTraversal();
    }

    preOrderTraversal(node) {
        if(!node) return;
        
        this.preOrderString += node.value + this.addDelimeter(this.preOrderString);

        this.preOrderTraversal(node.children.leftChild);
        this.preOrderTraversal(node.children.rightChild);
    }
    
    inOrderTraversal(node) {
        if(!node) return;

        this.inOrderTraversal(node.children.leftChild);

        this.inOrderString += node.value + this.addDelimeter(this.inOrderString);

        this.inOrderTraversal(node.children.rightChild);
    }
    
    postOrderTraversal(node) {
        if(!node) return;
    
        this.postOrderTraversal(node.children.leftChild);
        this.postOrderTraversal(node.children.rightChild);

        this.postOrderString += node.value + this.addDelimeter(this.postOrderString);
    }

    addDelimeter(string) {
        let delimeter = "";

        if(!string && this.main.tree.numNodes > 1) { // This accounts for adding at least one non-empty delimeter so that if there is more than one node, the second condition can be checked correctly
            delimeter = ", ";
        }
        else {
            if(string.split(", ").length < this.main.tree.numNodes) { // Not the last node so add non-empty delimeter
                
                delimeter = ", ";
            }
        }

        return delimeter;
    }
}