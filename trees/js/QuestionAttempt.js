class QuestionAttempt {
    constructor(main) {
        this.main = main;
        this.answerBox = document.getElementById(this.main.canvas.id+":ANSWER_ID");

        this.traversalAttempt = null;
        this.bstAttempt = null;
        this.propertiesAttempt = null;

        this.configureHTML();
    }

    /** Create appropriate attempt instance and configure respective html on student's side */
    configureHTML() {
        switch(this.main.databaseMisc.qtype) {
            case this.main.qTypes.TRAVERSAL: 
                this.traversalAttempt = new TraversalAttempt(this.main, this.answerBox);
                this.traversalAttempt.configureHTML(); 
                break;
            case this.main.qTypes.BST:
                this.bstAttempt = new BSTAttempt(this, this.main, this.answerBox);
                this.bstAttempt.configureHTML(); 
                break;
            case this.main.qTypes.PROPERTIES:
                this.propertiesAttempt = new PropertiesAttempt(this.main, this.answerBox);
                this.propertiesAttempt.configureHTML(); 
                break;
        }
    }

    treeToString() {
        if(this.main.databaseMisc.qtype === this.main.qTypes.BST) {
            this.bstAttempt.treeToString();
            // var encrypted = CryptoJS.AES.encrypt(this.answerBox.value, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // console.clear();
            // console.log(encrypted.toString());
            // var decrypted = CryptoJS.AES.decrypt(encrypted, "x^3Dgj*21!245##6$2)__@3$5_%6mfG@-3");
            // decrypted = decrypted.toString(CryptoJS.enc.Utf8);
            // console.log(decrypted.toString());
        }
        else {
            this.main.tree.convertToString(this.main.tree.root);
            this.main.tree.string = "";
        }
    }

    /** Reconstruct last answer (needed when student views a question they have already answered but not submitted) */
    reconstructLastAnswer() {
        if(this.main.databaseMisc.qtype === this.main.qTypes.TRAVERSAL) {
            this.traversalAttempt.reconstructLastAnswer();
        }
        else if(this.main.databaseMisc.qtype === this.main.qTypes.BST) {
            this.bstAttempt.reconstructLastAnswer();
        }
        else if(this.main.databaseMisc.qtype === this.main.qTypes.PROPERTIES) {
            this.propertiesAttempt.reconstructLastAnswer();
        }
    }

    handleEvent(event) {
        switch(event) {
            case this.main.events.ADDROOT: this.addRootEvent(); break;
            case this.main.events.ADDCHILD: this.addChildEvent(); break;
            case this.main.events.DRAG: this.dragEvent(); break;
            case this.main.events.UNDO: this.undoEvent(); break;
        }
    }

    addRootEvent() {
        this.treeToString();
    }

    addChildEvent() {
        this.treeToString();
    }

    dragEvent() {
        this.treeToString();
    }

    undoEvent() {
        this.treeToString();
    }
}