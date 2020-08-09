class QuestionSetup {
    constructor() {
        this._trvQuestion = new TraversalQuestion();

        this._events = {
            ADDROOT: "addRoot",
            ADDCHILD: "addChild",
            REMOVENODE: "removeNode"
        };

        this._currQuestion = {
            TRAVERSAL: qType.value === "traversal",
            BST: qType.value === "bst"
        };
    }

    get trvQuestion() {
        return this._trvQuestion;
    }

    get events() {
        return this._events;
    }

    get currQuestion() {
        return this._currQuestion;
    }

    handleEvent(event) {
        switch(event) {
            case this.events.ADDROOT: this.addRootEvent(); break;
            case this.events.ADDCHILD: this.addChildEvent(); break;
            case this.events.REMOVENODE: this.removeNodeEvent(); break;
        }
    }

    addRootEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.trvQuestion.performTraversal();
        }
    }

    addChildEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.trvQuestion.performTraversal();
        }
    }

    removeNodeEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.trvQuestion.performTraversal();
        }
    }

    configureHTML() {
        if(curatedData.value !== "") {
            buildTreeFromString(curatedData.value);
            addRootButton.style.display = "none";
        }

        modifyTreeTools.style.display = "block";
        answerQuestionTools.style.display = "none";
    }
}