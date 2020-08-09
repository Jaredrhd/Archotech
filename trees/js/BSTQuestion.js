class BSTQuestion {
    constructor() {
        this._radio = document.querySelector('[qtype_name="bst"]');
        this._nodeAmountInput = document.getElementById("id_node_amount");
        this._nodeAmount = 0;
        this._bstValues = [];
        this._addedValues = [];

        this._radio.addEventListener("change", this.updateQuestionType.bind(this));
        this._nodeAmountInput.addEventListener("input", this.updateBSTValues.bind(this));
    }

    get radio() {
        return this._radio;
    }

    get nodeAmountInput() {
        return this._nodeAmountInput;
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
        setup.updateCurrentQuestion("BST");
        this.updateBSTValues();
    }

    updateBSTValues() {
        bstValueList.value = "";
        bstValues.value = "";
        this.bstValues.length = 0; // Reset the list of previous BST values
        this.nodeAmount = Number(this.nodeAmountInput.value);

        if(this.nodeAmount > (MAX_NODE_VALUE - MIN_NODE_VALUE)) return; // If number of requested nodes is greater than possible unique values
        if(this.nodeAmount > ROWS * COLS) return;

        for(let i = 0; i < this.nodeAmount; i++) {
            let newValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);

            while(this.bstValues.includes(newValue)) { // No duplicate values in BST
                newValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);
            }

            this.bstValues.push(newValue);
            bstValueList.value += newValue;
            bstValues.value += newValue;
            
            if(i !== this.nodeAmount - 1) {
                bstValueList.value += ", ";
                bstValues.value += ", ";
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