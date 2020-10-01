class QuestionSetup {
    constructor(main) {
        this.main = main;

        this.traversalQuestion = new TraversalQuestion(this.main);
        this.bstQuestion = new BSTQuestion(this.main);
        this.propertiesQuestion = new PropertiesQuestion(this.main);

        this.lecturerTree = document.getElementById("lecturer_tree");
        this.qType = document.getElementById("q_type");
        this.qType.value = "traversal"; // qType has intial value of traversal

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
            BST: false,
            PROPERTIES: false,
        };

        this.prevQuestion = null;

        this.configureHTML();
    }

    /** Configure respective html on lecturer's side */
    configureHTML() {
        if(this.lecturerTree.value !== "" && (this.currQuestion.TRAVERSAL || this.currQuestion.PROPERTIES ||
            this.currQuestion.AVL)) { // Rebuild a previously constructed tree
                this.main.buildTreeFromString(this.lecturerTree.value);
                this.main.addRootButton.style.display = "none";
                this.copyPasteTreeInput.value = this.lecturerTree.value;
        }

        /** Deselect any selected node TODO: POSSIBLY KEEP SELECTION */
        if(this.main.selectedNode) {
            this.main.selectedNode = null;
        }
        this.main.removeNodeButton.style.display = "none";
        this.main.editNodeValueButton.style.display = "none";

        if(!this.currQuestion.PROPERTIES) {
            this.propertiesQuestion.selectRequiredNodesPropertiesButton.style.display = "none";
        }

        switch(this.qType.value) {
            case this.main.qTypes.TRAVERSAL: this.configureTraversalHTML(); break;
            case this.main.qTypes.BST: this.configureBstHTML(); break;
            case this.main.qTypes.PROPERTIES: this.configurePropertyHTML(); break;
        }
    }

    configureTraversalHTML() {
        if(this.lecturerTree.value !== "") {
            this.traversalQuestion.performTraversal();
        }

        this.main.createQuestionHeader.innerHTML = "Build Tree";

        if(!this.main.randNodeValueCheckbox.checked) {
            this.main.nodeValueInput.disabled = false;
        }
        this.main.nodeValueInput.value = "";
        this.main.nodeValueInput.style.color = "#000000";

        this.main.randNodeValueCheckbox.disabled = false;

        this.main.canvas.style.display = "block";

        this.main.toolbar.style.display = "flex";
        this.main.modifyTreeTools.style.display = "block";
        
        this.main.answerQuestionTools.style.display = "none";
    }

    configureBstHTML() {
        this.main.createQuestionHeader.innerHTML = "BST Values";

        this.main.canvas.style.display = "none";

        this.main.toolbar.style.display = "none";
        this.main.modifyTreeTools.style.display = "none";

        this.main.bstTools.style.display = "flex";
    }

    configurePropertyHTML() {
        this.main.createQuestionHeader.innerHTML = "Build Tree";

        if(!this.main.randNodeValueCheckbox.checked) {
            this.main.nodeValueInput.disabled = false;
        }
        this.main.nodeValueInput.value = "";
        this.main.nodeValueInput.style.color = "#000000";

        if(this.propertiesQuestion.selectingRequiredNodes) {
            this.main.nodeValueInput.disabled = true;
            this.main.randNodeValueCheckbox.disabled = true;
        }

        this.main.canvas.style.display = "block";

        this.main.toolbar.style.display = "flex";
        this.main.modifyTreeTools.style.display = "block";
        
        this.main.answerQuestionTools.style.display = "none";

        /** Select previously selected required nodes */
        if(this.propertiesQuestion.requiredNodes.length > 0) {
            for(const requiredNode of this.propertiesQuestion.requiredNodes) {
                this.main.tree.getNode(requiredNode.value, requiredNode.orderPlaced).properties.required = true;
            }

            this.main.redrawCanvas();
        }
    }

    configureAVLHTML() {
        this.main.createQuestionHeader.innerHTML = "Build AVL Tree";

        if(!this.main.randNodeValueCheckbox.checked) {
            this.main.nodeValueInput.disabled = false;
        }
        this.main.nodeValueInput.value = "";
        this.main.nodeValueInput.style.color = "#000000";

        this.main.randNodeValueCheckbox.disabled = false;

        this.main.canvas.style.display = "block";

        this.main.toolbar.style.display = "flex";
        this.main.modifyTreeTools.style.display = "block";
        
        this.main.answerQuestionTools.style.display = "none";
    }

    updateCurrentQuestion(newQuestion) {
        this.qType.value = newQuestion.toLowerCase();

        for(const question in this.currQuestion) {
            if(this.currQuestion[question]) {
                this.currQuestion[question] = false;
                this.prevQuestion = question.toLowerCase();
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
            this.traversalQuestion.performTraversal();
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
            this.traversalQuestion.performTraversal();
        }
        else if(this.currQuestion.PROPERTIES) {
            this.propertiesQuestion.selectRequiredNodesPropertiesButton.style.display = "inline-block";
            this.propertiesQuestion.updatePropertyAnswers();
        }

        this.treeToString();
    }

    addChildEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.traversalQuestion.performTraversal();
        }
        else if(this.currQuestion.PROPERTIES) {
            this.propertiesQuestion.updatePropertyAnswers();
        }

        this.treeToString();
    }

    removeNodeEvent() {
        if(this.currQuestion.TRAVERSAL) {
            this.traversalQuestion.performTraversal();
        }
        else if(this.currQuestion.PROPERTIES) {
            if(this.main.tree && this.main.tree.numNodes === 0) this.propertiesQuestion.selectRequiredNodesPropertiesButton.style.display = "none";
            this.propertiesQuestion.updatePropertyAnswers();
        }

        this.treeToString();
    }

    dragEvent() {
        this.treeToString();
    }
}