class TraversalQuestion {
    constructor() {
        this._radio = document.querySelector('[qtype_name="traversal"]');
        this._preOrderRadio = document.querySelector('[traversal_type="preorder"]');
        this._inOrderRadio = document.querySelector('[traversal_type="inorder"]');
        this._postOrderRadio = document.querySelector('[traversal_type="postorder"]');
        this._traversalOptions = [this._preOrderRadio, this._inOrderRadio, this._postOrderRadio];

        /** Values stored in the DB */
        this._preOrder = document.getElementById("preorder");
        this._inOrder = document.getElementById("inorder");
        this._postOrder = document.getElementById("postorder");

        /** Strings that are modified when a traversal is performed */
        this._preOrderString = "";
        this._inOrderString = "";
        this._postOrderString = "";

        this._preOrderRadio.checked = true; // Default of pre-order traversal

        this._radio.addEventListener("change", this.updateQuestionType.bind(this));

        for(const traversalOption of this._traversalOptions) {
            traversalOption.parentElement.style.marginLeft += "30px";
            traversalOption.addEventListener("change", this.traversalChanged.bind(this));
        }
    }

    get radio() {
        return this._radio;
    }

    get preOrderRadio() {
        return this._preOrderRadio;
    }

    get inOrderRadio() {
        return this._inOrderRadio;
    }

    get postOrderRadio() {
        return this._postOrderRadio;
    }

    get traversalOptions() {
        return this._traversalOptions;
    }

    get preOrder() {
        return this._preOrder;
    }

    get inOrder() {
        return this._inOrder;
    }

    get postOrder() {
        return this._postOrder;
    }

    get preOrderString() {
        return this._preOrderString;
    }

    get inOrderString() {
        return this._inOrderString;
    }

    get postOrderString() {
        return this._postOrderString;
    }

    set preOrderString(value) {
        this._preOrderString = value;
    }

    set inOrderString(value) {
        this._inOrderString = value;
    }

    set postOrderString(value) {
        this._postOrderString = value;
    }

    updateQuestionType() {
        if(setup.currQuestion.BST) {
            bstValueList.style.display = "none";
        }

        setup.updateCurrentQuestion("TRAVERSAL");
    }

    performTraversal() {
        if(!tree) return;

        if(this.preOrderRadio.checked) {
            this.preOrderTraversal(tree.root);
            this.preOrder.value = this.preOrderString;
            this.preOrderString = "";
        }
        else {
            this.preOrder.value = "";
        }

        if(this.inOrderRadio.checked) {
            this.inOrderTraversal(tree.root);
            this.inOrder.value = this.inOrderString;
            this.inOrderString = "";
        }
        else {
            this.inOrder.value= "";
        }

        if(this.postOrderRadio.checked) {
            this.postOrderTraversal(tree.root);
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

        if(!string && tree.numNodes > 1) { // This accounts for adding at least one non-empty delimeter so that if there is more than one node, the second condition can be checked correctly
            delimeter = ",";
        }
        else {
            if(string.split(",").length < tree.numNodes) { // Not the last node so add non-empty delimeter
                delimeter = ",";
            }
        }

        return delimeter;
    }
}