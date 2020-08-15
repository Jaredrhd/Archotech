class QuestionSetup {
    constructor() {
        this._trvQuestion = new TraversalQuestion();
        this._bstQuestion = new BSTQuestion();

        this._lecturerTree = document.getElementById("lecturer_tree");
        this._qType = document.getElementById("q_type");
        this._qType.value = "traversal"; // qType has intial value of traversal

        this._createQuestionHeader = document.querySelector('[aria-controls="id_create_question_header"]');
        this._copyPasteTree = document.getElementById("id_copy_paste_tree");

        this._copyPasteTree.addEventListener("change", this.buildCopiedTree.bind(this));

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

    get qType() {
        return this._qType;
    }

    get lecturerTree() {
        return this._lecturerTree;
    }

    get createQuestionHeader() {
        return this._createQuestionHeader;
    }

    get copyPasteTree() {
        return this._copyPasteTree;
    }

    get currQuestion() {
        return this._currQuestion;
    }

    /** Configure respective html on lecturer's side */
    configureHTML() {
        switch(this.qType.value) {
            case qTypes.TRAVERSAL: this.configureTraversalHTML(); break;
            case qTypes.BST: this.configureBstHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(this.lecturerTree.value !== "") {
            buildTreeFromString(this.lecturerTree.value);
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

        toolbar.style.display = "flex";
        modifyTreeTools.style.display = "block";
        
        answerQuestionTools.style.display = "none";
    }

    configureBstHTML() {
        this.createQuestionHeader.innerHTML = "BST Values";

        canvas.style.display = "none";
        canvas.parentElement.style.display = "none";

        toolbar.style.display = "none";
        modifyTreeTools.style.display = "none";

        bstValueList.style.display = "block";
    }

    updateCurrentQuestion(newQuestion) {
        this.qType.value = newQuestion.toLowerCase();

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
        this.lecturerTree.value = tree.string;
        this.copyPasteTree.value = tree.string;
        tree.string = "";
    }

    buildCopiedTree() {
        buildTreeFromString(this.copyPasteTree.value);
        addRootButton.style.display = "none";
        this.trvQuestion.performTraversal();
        this.lecturerTree.value = this.copyPasteTree.value;
    }

    handleEvent(event) {
        switch(event) {
            case events.ADDROOT: this.addRootEvent(); break;
            case events.ADDCHILD: this.addChildEvent(); break;
            case events.REMOVE: this.removeNodeEvent(); break;
            case events.DRAG: this.dragEvent(); break;
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