class TraversalQuestion {
    constructor(valueInput, randomInput) {
        QuestionManager.currQuestion = this; // Initially set as the current question (traversal is the default question type)

        this._qTypeName = "traversal";
        this._radioElement = document.querySelector('[qtype_name="traversal"]');
        this._preOrderCheckbox = document.querySelector('[traversal_type="preorder"]');
        this._inOrderCheckbox = document.querySelector('[traversal_type="inorder"]');
        this._postOrderCheckbox = document.querySelector('[traversal_type="postorder"]');
        this._tree = tree;
        this._valueInput = valueInput;
        this._randomInput = randomInput;

        this._radioElement.addEventListener("change", this.updateQuestionType.bind(this));
        this._preOrderCheckbox.addEventListener("change", this.preOrderTraversal.bind(this));
        this._inOrderCheckbox.addEventListener("change", this.inOrderTraversal.bind(this));
        this._postOrderCheckbox.addEventListener("change", this.postOrderTraversal.bind(this));
    }

    get qTypeName() {
        return this._qTypeName;
    }

    get radioElement() {
        return this._radioElement;
    }

    get valueInput() {
        return this._valueInput;
    }

    get randomInput() {
        return this._randomInput;
    }

    get preOrderCheckbox() {
        return this._preOrderCheckbox;
    }

    get tree() {
        return this._tree;
    }

    set tree(value) {
        this._tree = value;
    }

    updateQuestionType() {
        QuestionManager.currQuestion = this;

        QuestionManager.getBSTQuestion().valuesElement.style.display = "none";

        this.valueInput.disabled = false;
        this.randomInput.disabled = false;
        this.valueInput.value = "";
        this.valueInput.style.color = "#000000";
    }

    preOrderTraversal() {
        if(!this.tree) return;
    }

    inOrderTraversal() {
        if(!this.tree) return;
    }

    postOrderTraversal() {
        if(!this.tree) return;
    }

}