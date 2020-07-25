class TraversalQuestion {
    constructor() {
        QuestionManager.currQuestion = this; // Initially set as the current question (traversal is the default question type)

        this._qTypeName = "traversal";
        this._radioElement = document.querySelector('[qtype_name="traversal"]');
        this._preOrderCheckbox = document.querySelector('[traversal_type="preorder"]');
        this._inOrderCheckbox = document.querySelector('[traversal_type="inorder"]');
        this._postOrderCheckbox = document.querySelector('[traversal_type="postorder"]');

        this._radioElement.addEventListener("change", this.updateQuestionType.bind(this));
    }

    get qTypeName() {
        return this._qTypeName;
    }

    get radioElement() {
        return this._radioElement;
    }

    get preOrderCheckbox() {
        return this._preOrderCheckbox;
    }

    get inOrderCheckbox() {
        return this._inOrderCheckbox;
    }

    get postOrderCheckbox() {
        return this._postOrderCheckbox;
    }

    updateQuestionType() {
        QuestionManager.currQuestion = this;

        nodeValueInput = "none";
        nodeValueInput.disabled = false;
        nodeValueInput.value = "";
        nodeValueInput.style.color = "#000000";

        randNodeValueCheckbox.disabled = false;
    }

    performTraversal() {
        // traversalQuestion.tree = tree;
        // if(!traversalQuestion.tree) return;
    
        //     if(traversalQuestion.preOrderCheckbox.checked) {
        //         tree.preOrderTraversal(tree.root);
        //         console.log(tree.preOrder);
        //         curatedData.value = tree.preOrder;
        //         tree.preOrder = "";
        // }
    }
}