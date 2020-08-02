class BSTQuestion {
    constructor() {
        this._qTypeName = "bst";
        this._radioElement = document.querySelector('[qtype_name="bst"]');
        this._nodeAmountElement = document.getElementById("id_node_amount");
        this._nodeAmount = Number(this._nodeAmountElement.value);
        this._bstValues = [];
        this._addedValues = [];

        this._radioElement.addEventListener("change", this.updateQuestionType.bind(this));
        this._nodeAmountElement.addEventListener("input", this.updateBSTValues.bind(this));
    }

    get qTypeName() {
        return this._qTypeName;
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

    set nodeAmount(value) {
        this._nodeAmount = value;
    }

    /** Called when 'Construct BST' radio button is checked */
    updateQuestionType() {
        QuestionManager.currQuestion = this;

        this.updateBSTValues();
        bstValueList.style.display = "block";

        nodeValueInput.disabled = true;
        randNodeValueCheckbox.disabled = true;

        nodeValueInput.value = this.getNextNodeValue();
        nodeValueInput.style.color = "#ff0000";
    }

    updateBSTValues() {
        bstValueList.value = "";
        this.bstValues.length = 0; // Reset the list of previous BST values
        this.addedValues.length = 0;
        this.nodeAmount = Number(this.nodeAmountElement.value);

        if(this.nodeAmount > (MAX_NODE_VALUE - MIN_NODE_VALUE)) return; // If number of requested nodes is greater than possible unique values

        for(let i = 0; i < this.nodeAmount; i++) {
            let newValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);

            while(this.bstValues.includes(newValue)) { // No duplicate values in BST
                newValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);
            }

            this.bstValues.push(newValue);
            bstValueList.value += newValue;
            
            if(i !== this.nodeAmount - 1) {
                bstValueList.value += ", ";
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