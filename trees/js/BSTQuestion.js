class BSTQuestion {
    constructor() {
        this._radio = document.querySelector('[qtype_name="bst"]');
        this._randomValuesRadio = document.querySelector('[bst_value_type="random"]');
        this._inputValuesRadio = document.querySelector('[bst_value_type="supplied"]');
        this._nodeAmountInput = document.getElementById("id_node_amount");
        this._nodeValuesInput = document.getElementById("id_input_value");

        this._insertValueButton = document.getElementById("insert-bst-value");
        this._undoInsertButton = document.getElementById("undo-insert-bst-value");
        this._invalidBSTValueSpan = document.getElementById("invalid-bst-value");

        this._nodeValuesInput.parentElement.insertBefore(this._invalidBSTValueSpan, this._nodeValuesInput.nextSibling);
        this._nodeValuesInput.parentElement.insertBefore(this._undoInsertButton, this._invalidBSTValueSpan);
        this._nodeValuesInput.parentElement.insertBefore(this._insertValueButton, this._undoInsertButton);

        this._bstValueOptions = [this._randomValuesRadio, this._inputValuesRadio];

        this._nodeAmount = 0;
        this._randomBSTValues = [];
        this._insertedBSTValues = [];

        /** Values saved in DB */
        this._bstString = document.getElementById("bst_string");
        /** Holds the BST values that are displayed the to student in bstValueList */
        this._bstValues = document.getElementById("bstvalues");

        this._radio.addEventListener("change", this.updateQuestionType.bind(this));
        this._randomValuesRadio.addEventListener("change", this.updateRandomBSTValues.bind(this));
        this._inputValuesRadio.addEventListener("change", this.getInsertedBSTValuesFromArray.bind(this));
        this._nodeAmountInput.addEventListener("input", this.updateRandomBSTValues.bind(this));
        this._insertValueButton.addEventListener("click", this.updateInputBSTValues.bind(this));
        this._undoInsertButton.addEventListener("click", this.undoBSTValueInsert.bind(this));

        for(const bstValueOption of this._bstValueOptions) {
            bstValueOption.parentElement.style.marginLeft += "30px";
        }
    }

    get radio() {
        return this._radio;
    }

    get randomValuesRadio() {
        return this._randomValuesRadio;
    }

    get inputValuesRadio() {
        return this._inputValuesRadio;
    }

    get nodeAmountInput() {
        return this._nodeAmountInput;
    }

    get nodeValuesInput() {
        return this._nodeValuesInput;
    }

    get insertValueButton() {
        return this._insertValueButton;
    }

    get undoInsertButton() {
        return this._undoInsertButton;
    }

    get invalidBSTValueSpan() {
        return this._invalidBSTValueSpan;
    }

    get nodeAmount() {
        return this._nodeAmount;
    }

    get randomBSTValues() {   
        return this._randomBSTValues;
    }

    get insertedBSTValues() {
        return this._insertedBSTValues;
    }

    get bstString() {
        return this._bstString;
    }

    get bstValues() {
        return this._bstValues;
    }

    set nodeAmount(value) {
        this._nodeAmount = value;
    }

    /** Called when 'Construct BST' radio button is checked */
    updateQuestionType() {
        setup.updateCurrentQuestion("BST");

        if(this.randomValuesRadio.checked) { // Random values. No need to account for if input values is checked since the list is just reconstructed anyway.
            this.updateRandomBSTValues();
        }
    }

    updateRandomBSTValues() {
        bstValueList.value = "";
        this.bstValues.value = "";
        this.randomBSTValues.length = 0; // Reset the list of previous BST values
        this.nodeAmount = Number(this.nodeAmountInput.value);

        if(this.nodeAmount > (MAX_NODE_VALUE - MIN_NODE_VALUE)) return; // If number of requested nodes is greater than possible unique values
        if(this.nodeAmount > ROWS * COLS) return;

        for(let i = 0; i < this.nodeAmount; i++) {
            let newValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);

            while(this.randomBSTValues.includes(newValue)) { // No duplicate values in BST
                newValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);
            }

            this.randomBSTValues.push(newValue);
            bstValueList.value += newValue;
            this.bstValues.value += newValue;
            
            if(i !== this.nodeAmount - 1) {
                bstValueList.value += ", ";
                this.bstValues.value += ", ";
            }
        }

        this.createBSTFromValues();
    }

    getInsertedBSTValuesFromArray() {
        this.insertValueButton.style.display = "inline-block"; 
        this.undoInsertButton.style.display = "inline-block";
        this.bstValues.value = "";
        bstValueList.value = "";
        
        if(this.insertedBSTValues.length > 0) {
            for(let i = 0; i < this.insertedBSTValues.length; i++) {
                if(this.bstValues.value === "") {
                    this.bstValues.value += this.insertedBSTValues[i];
                    bstValueList.value += this.insertedBSTValues[i];
                }
                else {
                    this.bstValues.value += ", " + this.insertedBSTValues[i];
                    bstValueList.value += ", " + this.insertedBSTValues[i];
                }
            }
        }

        this.createBSTFromValues();
    }

    updateInputBSTValues() {
        if(isNaN(Number(this.nodeValuesInput.value)) || !Number.isInteger(Number(this.nodeValuesInput.value)) || 
            Number(this.nodeValuesInput.value) < MIN_NODE_VALUE || Number(this.nodeValuesInput.value) > MAX_NODE_VALUE ||
                this.insertedBSTValues.includes(Number(this.nodeValuesInput.value))) { // Invalid input
                    this.invalidBSTValueSpan.style.display = "inline-block";
                    this.invalidBSTValueSpan.innerHTML = "Please enter a unique integer between " + MIN_NODE_VALUE + " and " + MAX_NODE_VALUE + ".";
        }
        else {
            this.invalidBSTValueSpan.style.display = "none";
            this.nodeValuesInput.value = this.nodeValuesInput.value.trim(); // Remove potential white space

            if(this.bstValues.value === "") {
                this.bstValues.value += this.nodeValuesInput.value;
                bstValueList.value += this.nodeValuesInput.value;
            }
            else {
                this.bstValues.value += ", " + this.nodeValuesInput.value;
                bstValueList.value += ", " + this.nodeValuesInput.value;
            }

            this.insertedBSTValues.push(Number(this.nodeValuesInput.value));

            this.createBSTFromValues();

            this.nodeValuesInput.value = "";
            this.nodeValuesInput.focus();
        }
    }

    undoBSTValueInsert() {
        this.insertedBSTValues.pop();
        this.getInsertedBSTValuesFromArray();
    }

    createBSTFromValues() {
        let array = bstValueList.value.split(",").map(value => parseInt(value));
        let rootValue = array[0];

        for(let i = 0; i < array.length; i++) {
            if(i === 0) {
                if(!tree) {
                    tree = new Tree(rootValue, false);
                }
                else {
                    tree.setNewRoot(rootValue, false);
                }
            }
            else {
                let parent = tree.root;
                let currNode = parent;
                let childType = "";

                while(currNode !== null) {
                    parent = currNode;

                    if(array[i] < parent.value) {
                        currNode = currNode.children.leftChild;
                        childType = "L";
                    }
                    else {
                        currNode = currNode.children.rightChild;
                        childType = "R";
                    }
                }

                tree.addChildNoDraw(parent, childType, array[i]);
            }
        }

        tree.convertToStringForBST(tree.root);
        this.bstString.value = tree.string;
        tree.string = "";
    }
}