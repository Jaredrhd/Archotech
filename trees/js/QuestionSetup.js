class QuestionSetup {
    constructor() {
        this._trvQuestion = new TraversalQuestion();
        this._bstQuestion = new BSTQuestion();

        this._createQuestionHeader = document.querySelector('[aria-controls="id_create_question_header"]');

        this._events = {
            ADDROOT: "addRoot",
            ADDCHILD: "addChild",
            REMOVENODE: "removeNode",
            DRAG: "drag"
        };

        this._currQuestion = {
            TRAVERSAL: true,
            BST: false
        };

        this.configureHTML();
    }

    get trvQuestion() {
        return this._trvQuestion;
    }

    get bstQuestion() {
        return this._bstQuestion;
    }

    get createQuestionHeader() {
        return this._createQuestionHeader;
    }

    get events() {
        return this._events;
    }

    get currQuestion() {
        return this._currQuestion;
    }

    /** Configure respective html on lecturer's side */
    configureHTML() {
        switch(qType.value) {
            case qTypes.TRAVERSAL: this.configureTraversalHTML(); break;
            case qTypes.BST: this.configureBstHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(lecturerTree.value !== "") {
            buildTreeFromString(lecturerTree.value);
            addRootButton.style.display = "none";
            this.trvQuestion.performTraversal();
        }

        this.createQuestionHeader.innerHTML = "Build Tree";

        nodeValueInput.disabled = false;
        nodeValueInput.value = "";
        nodeValueInput.style.color = "#000000";

        randNodeValueCheckbox.disabled = false;

        canvas.style.display = "block";
        canvas.parentElement.style.display = "block";
        modifyTreeTools.style.display = "block";

        modifyTreeTools.style.display = "block";
        answerQuestionTools.style.display = "none";
    }

    configureBstHTML() {
        setup.createQuestionHeader.innerHTML = "BST Values";

        canvas.style.display = "none";
        canvas.parentElement.style.display = "none";

        modifyTreeTools.style.display = "none";

        bstValueList.style.display = "block";
    }

    updateCurrentQuestion(newQuestion) {
        qType.value = newQuestion.toLowerCase();

        for(const question in this.currQuestion) {
            if(this.currQuestion[question]) {
                this.currQuestion[question] = false;
            }
            else if(question == newQuestion) {
                this.currQuestion[question] = true;
            }
        }

        this.configureHTML();
    }

    treeToString() {
        tree.convertToString(tree.root);
        lecturerTree.value = tree.string;
        tree.string = "";
    }

    handleEvent(event) {
        switch(event) {
            case this.events.ADDROOT: this.addRootEvent(); break;
            case this.events.ADDCHILD: this.addChildEvent(); break;
            case this.events.REMOVENODE: this.removeNodeEvent(); break;
            case this.events.DRAG: this.dragEvent(); break;
        }
    }

    addRootEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.trvQuestion.performTraversal();
        }

        this.treeToString();
    }

    addChildEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.trvQuestion.performTraversal();
        }

        this.treeToString();
    }

    removeNodeEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.trvQuestion.performTraversal();
        }

        this.treeToString();
    }

    dragEvent() {
        this.treeToString();
    }
}