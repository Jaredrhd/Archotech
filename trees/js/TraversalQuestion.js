class TraversalQuestion {
    constructor() {
        qType.value = "traversal";

        this._radio = document.querySelector('[qtype_name="traversal"]');
        this._preOrderRadio = document.querySelector('[traversal_type="preorder"]');
        this._inOrderRadio = document.querySelector('[traversal_type="inorder"]');
        this._postOrderRadio = document.querySelector('[traversal_type="postorder"]');
        this._traversalOptions = [this._preOrderRadio, this._inOrderRadio, this._postOrderRadio];

        this._preOrderRadio.checked = true; // Default of pre-order traversal

        this._radio.addEventListener("change", this.updateQuestionType.bind(this));

        for(const traversalOption of this._traversalOptions) {
            traversalOption.parentElement.style.marginLeft += "30px";
            traversalOption.addEventListener("change", this.traversalChanged.bind(this, traversalOption));
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

    updateQuestionType() {
        if(setup.currQuestion.BST) {
            bstValueList.style.display = "none";
        }

        setup.updateCurrentQuestion("TRAVERSAL");
    }

    performTraversal() {
        if(!tree) return;

        if(this.preOrderRadio.checked) {
            tree.preOrderTraversal(tree.root);
            preOrder.value = tree.preOrder;
            tree.preOrder = "";
        }
        else {
            preOrder.value = "";
        }

        if(this.inOrderRadio.checked) {
            tree.inOrderTraversal(tree.root);
            inOrder.value = tree.inOrder;
            tree.inOrder = "";
        }
        else {
            inOrder.value = "";
        }

        if(this.postOrderRadio.checked) {
            tree.postOrderTraversal(tree.root);
            postOrder.value = tree.postOrder;
            tree.postOrder = "";
        }
        else {
            postOrder.value = "";
        }
    }

    traversalChanged(traversalOption) {
        // if(!this.canRemoveTraversal(traversalOption)) { // If checkbox is the only one selected, cannot deselect it
        //     traversalOption.checked = true;
        // }

        this.performTraversal();
    }

    /*
    canRemoveTraversal(traversalOption) {
        if(!traversalOption.checked) { // Only time to check if not able to deselect checkbox is when it has already been deselected
            for(const option of this.traversalOptions) {
                if(option !== traversalOption && option.checked) return true; // If another checkbox is checked, we can deselect traversalCheckbox
            }

            return false;
        }
        else {
            return true;
        }      
    }
    */
}