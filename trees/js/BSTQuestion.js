class BSTQuestion {
    constructor(values, min, max, valueInput, randomInput) {
        this._qTypeName = "bst";
        this._valuesElement = values;
        this._radioElement = document.querySelector('[qtype_name="bst"]');
        this._nodeAmountElement = document.getElementById("id_node_amount");
        this._nodeAmount = Number(this.nodeAmountElement.value);
        this._bstValues = [];
        this._addedValues = [];
        this._minValue = min;
        this._maxValue = max;
        this._valueInput = valueInput;
        this._randomInput = randomInput;

        this._radioElement.addEventListener("change", this.updateQuestionType.bind(this));
        this._nodeAmountElement.addEventListener("input", this.updateBSTValues.bind(this));
    }

    get qTypeName() {
        return this._qTypeName;
    }

    get valuesElement() {
        return this._valuesElement;
    }

    get radioElement() {
        return this._radioElement;
    }

    get nodeAmountElement() {
        return this._nodeAmountElement;
    }

    get nodeAmount() {
        return this._nodeAmount;
    }

    get bstValues() {   
        return this._bstValues;
    }

    get addedValues() {
        return this._addedValues;
    }

    get minValue() {
        return this._minValue;
    }

    get maxValue() {
        return this._maxValue;
    }

    get valueInput() {
        return this._valueInput;
    }

    get randomInput() {
        return this._randomInput;
    }

    set nodeAmount(value) {
        this._nodeAmount = value;
    }

    set valuesElement(value) {
        this._valuesElement = value;
    }

    /** Called when 'Construct BST' radio button is checked */
    updateQuestionType() {
        QuestionManager.currQuestion = this;

        this.updateBSTValues();
        this.valuesElement.style.display = "block";

        this.valueInput.disabled = true;
        this.randomInput.disabled = true;

        this.valueInput.value = this.getNextNodeValue();
        this.valueInput.style.color = "#ff0000";
    }

    updateBSTValues() {
        this.valuesElement.value = "";
        this.bstValues.length = 0; // Reset the list of previous BST values
        this.addedValues.length = 0;
        this.nodeAmount = Number(this.nodeAmountElement.value);

        if(this.nodeAmount > (this.maxValue - this.minValue)) return; // If number of requested nodes is greater than possible unique values

        for(let i = 0; i < this.nodeAmount; i++) {
            let newValue = Math.floor(Math.random() * (this.maxValue - this.minValue) + this.minValue);

            while(this.bstValues.includes(newValue)) { // No duplicate values in BST
                newValue = Math.floor(Math.random() * (this.maxValue - this.minValue) + this.minValue);
            }

            this.bstValues.push(newValue);
            this.valuesElement.value += newValue;
            
            if(i !== this.nodeAmount - 1) {
                this.valuesElement.value += ", ";
            }
        }
    }

    getNextNodeValue() {
        let nextBSTValue = this.bstValues[this.addedValues.length];

        if(typeof nextBSTValue === "undefined") return; // Values from the BST list have all been added to the board
        
        this.addedValues.push(nextBSTValue);
        
        return nextBSTValue;
    }
}