class TraversalQuestion {
    constructor(valueInput, randomInput) {
        QuestionManager.currQuestion = this; // Initially set as the current question (traversal is the default question type)

        this._qTypeName = "traversal";
        this._radioElement = document.querySelector('[qtype_name="traversal"]');
        this._valueInput = valueInput;
        this._randomInput = randomInput;

        this._radioElement.addEventListener("change", this.updateQuestionType.bind(this));
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

    updateQuestionType() {
        QuestionManager.currQuestion = this;

        QuestionManager.getBSTQuestion().valuesElement.style.display = "none";

        this.valueInput.disabled = false;
        this.randomInput.disabled = false;
        this.valueInput.value = "";
        this.valueInput.style.color = "#000000";
    }

}