class BSTQuestion {
    constructor(main) {
        this.main = main;

        this.radio = document.querySelector('[qtype_name="bst"]');
        this.randomValuesRadio = document.querySelector('[bst_value_type="random"]');
        this.inputValuesRadio = document.querySelector('[bst_value_type="supplied"]');
        this.nodeAmountInput = document.getElementById("id_node_amount");
        this.nodeValuesInput = document.getElementById("id_input_value");

        this.insertValueButton = document.getElementById("insert-bst-value");
        this.undoInsertButton = document.getElementById("undo-insert-bst-value");
        this.invalidBSTValueSpan = document.getElementById("invalid-bst-value");

        this.nodeValuesInput.parentElement.insertBefore(this.invalidBSTValueSpan, this.nodeValuesInput.nextSibling);
        this.nodeValuesInput.parentElement.insertBefore(this.undoInsertButton, this.invalidBSTValueSpan);
        this.nodeValuesInput.parentElement.insertBefore(this.insertValueButton, this.undoInsertButton);

        this.bstValueOptions = [this.randomValuesRadio, this.inputValuesRadio];

        this.nodeAmount = 0;
        this.randomBSTValues = [];
        this.insertedBSTValues = [];

        /** Values saved in DB */
        /** Holds the generated answer string to be compared to the student's answer */
        this.bstString = document.getElementById("bst_string");
        /** Holds the BST values that are displayed to the student in bstValueList */
        this.bstValues = document.getElementById("bstvalues");

        this.radio.addEventListener("change", this.updateQuestionType.bind(this));
        this.randomValuesRadio.addEventListener("change", this.updateRandomBSTValues.bind(this));
        this.inputValuesRadio.addEventListener("change", this.getInsertedBSTValuesFromArray.bind(this));
        this.nodeAmountInput.addEventListener("input", this.updateRandomBSTValues.bind(this));
        this.insertValueButton.addEventListener("click", this.updateInputBSTValues.bind(this));
        this.undoInsertButton.addEventListener("click", this.undoBSTValueInsert.bind(this));

        for(const bstValueOption of this.bstValueOptions) {
            bstValueOption.parentElement.style.marginLeft += "30px";
        }
    }

    /** Called when 'Construct BST' radio button is checked */
    updateQuestionType() {
        this.main.setup.updateCurrentQuestion("BST");

        if(this.randomValuesRadio.checked) { // Random values. No need to account for if input values is checked since the list is just reconstructed anyway.
            this.updateRandomBSTValues();
        }
    }

    updateRandomBSTValues() {
        this.main.bstValueList.value = "";
        this.bstValues.value = "";
        this.randomBSTValues.length = 0; // Reset the list of previous BST values
        this.nodeAmount = Number(this.nodeAmountInput.value);

        if(this.nodeAmount > (this.main.MAX_NODE_VALUE - this.main.MIN_NODE_VALUE)) return; // If number of requested nodes is greater than possible unique values
        if(this.nodeAmount > this.main.ROWS * this.main.COLS) return;

        for(let i = 0; i < this.nodeAmount; i++) {
            let newValue = Math.floor(Math.random() * (this.main.MAX_NODE_VALUE - this.main.MIN_NODE_VALUE) + this.main.MIN_NODE_VALUE);

            while(this.randomBSTValues.includes(newValue)) { // No duplicate values in BST
                newValue = Math.floor(Math.random() * (this.main.MAX_NODE_VALUE - this.main.MIN_NODE_VALUE) + this.main.MIN_NODE_VALUE);
            }

            this.randomBSTValues.push(newValue);
            this.main.bstValueList.value += newValue;
            this.bstValues.value += newValue;
            
            if(i !== this.nodeAmount - 1) {
                this.main.bstValueList.value += ", ";
                this.bstValues.value += ", ";
            }
        }

        this.createBSTFromValues();
    }

    getInsertedBSTValuesFromArray() {
        this.insertValueButton.style.display = "inline-block"; 
        this.undoInsertButton.style.display = "inline-block";
        this.bstValues.value = "";
        this.main.bstValueList.value = "";
        
        if(this.insertedBSTValues.length > 0) {
            for(let i = 0; i < this.insertedBSTValues.length; i++) {
                if(this.bstValues.value === "") {
                    this.bstValues.value += this.insertedBSTValues[i];
                    this.main.bstValueList.value += this.insertedBSTValues[i];
                }
                else {
                    this.bstValues.value += ", " + this.insertedBSTValues[i];
                    this.main.bstValueList.value += ", " + this.insertedBSTValues[i];
                }
            }
        }

        this.createBSTFromValues();
    }

    updateInputBSTValues() {
        if(isNaN(Number(this.nodeValuesInput.value)) || !Number.isInteger(Number(this.nodeValuesInput.value)) || 
            Number(this.nodeValuesInput.value) < this.main.MIN_NODE_VALUE || Number(this.nodeValuesInput.value) > this.main.MAX_NODE_VALUE ||
                this.insertedBSTValues.includes(Number(this.nodeValuesInput.value))) { // Invalid input
                    this.invalidBSTValueSpan.style.display = "inline-block";
                    this.invalidBSTValueSpan.innerHTML = "Please enter a unique integer between " + this.main.MIN_NODE_VALUE + " and " + this.main.MAX_NODE_VALUE + ".";
                    this.nodeValuesInput.focus();
        }
        else {
            this.invalidBSTValueSpan.style.display = "none";
            this.nodeValuesInput.value = this.nodeValuesInput.value.trim(); // Remove potential white space

            if(this.bstValues.value === "") {
                this.bstValues.value += this.nodeValuesInput.value;
                this.main.bstValueList.value += this.nodeValuesInput.value;
            }
            else {
                this.bstValues.value += ", " + this.nodeValuesInput.value;
                this.main.bstValueList.value += ", " + this.nodeValuesInput.value;
            }

            this.insertedBSTValues.push(Number(this.nodeValuesInput.value));

            this.createBSTFromValues();

            this.nodeValuesInput.value = "";
            this.nodeValuesInput.focus();
        }
    }

    undoBSTValueInsert() {
        this.insertedBSTValues.pop();
        this.nodeValuesInput.focus();
        this.getInsertedBSTValuesFromArray();
    }

    createBSTFromValues() {
        if(this.main.bstValueList.value === "") {
            this.bstString.value = "";
            return;
        }

        let array = this.main.bstValueList.value.split(",").map(value => parseInt(value));
        let bstStack = []; // Needed to construct BST answer string

        let rootValue = array[0];
        if(this.main.tree) {
            this.main.tree = null;
        }
        this.main.tree = new Tree(this.main, rootValue, false);
        bstStack.push(this.main.tree.root);

        let newNode;

        for(let i = 1; i < array.length; i++) {
            let parent = this.main.tree.root;
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

            newNode = this.main.tree.addChildNoDraw(parent, childType, array[i]);
            bstStack.push(newNode);
        }

        this.main.tree.convertToStringForBST(bstStack);
        this.bstString.value = this.main.tree.string;
        this.main.tree.string = "";
    }
}