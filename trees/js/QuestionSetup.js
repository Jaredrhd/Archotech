class QuestionSetup {
    constructor(main) {
        this.main = main;

        this.trvQuestion = new TraversalQuestion(this.main);
        this.bstQuestion = new BSTQuestion(this.main);

        this.lecturerTree = document.getElementById("lecturer_tree");
        this.qType = document.getElementById("q_type");
        this.qType.value = "traversal"; // qType has intial value of traversal

        this.createQuestionHeader = document.querySelector('[aria-controls="id_create_question_header"]');

        this.copyPasteTreeInput = document.getElementById("id_copy_paste_tree");
        this.copyButton = document.getElementById("copy-tree");
        this.copiedSpan = document.getElementById("copied");
        this.copyPasteTreeInput.parentElement.insertBefore(this.copiedSpan, this.copyPasteTreeInput.nextSibling);
        this.copyPasteTreeInput.parentElement.insertBefore(this.copyButton, this.copiedSpan);
        
        this.validCopyPaste = false;

        this.copyPasteTreeInput.addEventListener("keydown", this.validatePasteOnly.bind(this));
        this.copyPasteTreeInput.addEventListener("keyup", this.clearInvalidCopyPasteInput.bind(this));
        this.copyPasteTreeInput.addEventListener("paste", this.buildCopiedTree.bind(this));
        this.copyButton.addEventListener("click", this.copyTree.bind(this));

        this.currQuestion = {
            TRAVERSAL: true,
            BST: false
        };

        this.configureHTML();
    }

    /** Configure respective html on lecturer's side */
    configureHTML() {
        switch(this.qType.value) {
            case this.main.qTypes.TRAVERSAL: this.configureTraversalHTML(); break;
            case this.main.qTypes.BST: this.configureBstHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(this.lecturerTree.value !== "") { // Rebuild a previously constructed tree
            this.main.buildTreeFromString(this.lecturerTree.value);
            this.main.addRootButton.style.display = "none";
            this.trvQuestion.performTraversal();
            this.copyPasteTreeInput.value = this.lecturerTree.value;
        }

        this.createQuestionHeader.innerHTML = "Build Tree";

        this.main.nodeValueInput.disabled = false;
        this.main.nodeValueInput.value = "";
        this.main.nodeValueInput.style.color = "#000000";

        this.main.randNodeValueCheckbox.disabled = false;

        this.main.canvas.style.display = "block";

        this.main.toolbar.style.display = "flex";
        this.main.modifyTreeTools.style.display = "block";
        
        this.main.answerQuestionTools.style.display = "none";
    }

    configureBstHTML() {
        this.createQuestionHeader.innerHTML = "BST Values";

        this.main.canvas.style.display = "none";

        this.main.toolbar.style.display = "none";
        this.main.modifyTreeTools.style.display = "none";

        this.main.bstValueList.style.display = "block";
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
        this.main.tree.convertToString(this.main.tree.root);
        this.lecturerTree.value = this.main.tree.string;
        this.copyPasteTreeInput.value = this.main.tree.string;
        this.main.tree.string = "";
    }

    copyTree() {
        this.copyPasteTreeInput.select();
        this.copyPasteTreeInput.setSelectionRange(0, 99999);
        document.execCommand("copy");

        if(this.copiedSpan.classList.contains("fade-out")) return;

        this.copiedSpan.classList.add("fade-in");
        
        setTimeout( () => (this.copiedSpan.classList.add("fade-out"), this.copiedSpan.classList.remove("fade-in")), 500);
        setTimeout( () => this.copiedSpan.classList.remove("fade-out"), 1500);
    }

    validatePasteOnly(event) {
        let ctrlPressed = event.ctrlKey || event.keyCode === 17;
        if(!(ctrlPressed && event.keyCode === 67 || ctrlPressed && event.keyCode === 86)) {
            this.validCopyPaste = false;
        }
        else {
            this.validCopyPaste = true;
        }
    }

    clearInvalidCopyPasteInput() {
        if(!this.validCopyPaste) {
            this.copyPasteTreeInput.value = "";
        }
    }

    buildCopiedTree() {
        setTimeout( () => {
            this.main.buildTreeFromString(this.copyPasteTreeInput.value);
            this.main.addRootButton.style.display = "none";
            this.trvQuestion.performTraversal();
            this.lecturerTree.value = this.copyPasteTreeInput.value;
        }, 1);
    }

    handleEvent(event) {
        switch(event) {
            case this.main.events.ADDROOT: this.addRootEvent(); break;
            case this.main.events.ADDCHILD: this.addChildEvent(); break;
            case this.main.events.REMOVE: this.removeNodeEvent(); break;
            case this.main.events.DRAG: this.dragEvent(); break;
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