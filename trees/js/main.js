class Main {
    constructor(canvas, databaseMisc) {
        this.databaseMisc = databaseMisc;

        //#region HTML ELEMENTS
        this.toolbar = document.getElementById(canvas.id+":toolbar");
        this.modifyTreeTools = document.getElementById(canvas.id+":modify-tree-tools");
        this.answerQuestionTools = document.getElementById(canvas.id+":answer-question-tools");
        this.nodeValueInput = document.getElementById(canvas.id+":node-value");
        this.qTypeHeader = document.querySelector('[aria-controls="id_q_type_header"]');
        this.navbar = document.querySelector('[aria-controls="nav-drawer"]');
        this.createQuestionHeader = document.querySelector('[aria-controls="id_create_question_header"]');
        // this.nodeValueInputTool = document.getElementById("node-value-tool");
        this.randNodeValueCheckbox = document.getElementById(canvas.id+":random-node-value");
        this.randNodeValueTools = document.getElementById(canvas.id+":random-node-value-tools");
        this.randBSTValueCheckbox = document.getElementById(canvas.id+":random-bst-value");
        this.addRootButton = document.getElementById(canvas.id+":add-root");
        this.removeNodeButton = document.getElementById(canvas.id+":remove-node");
        this.editNodeValueButton = document.getElementById(canvas.id+":edit-node");
        /** The list of BST values shown to the student and lecturer */
        this.bstValueList = document.getElementById(canvas.id+":bst-values");
        this.bstTools = document.getElementById(canvas.id+":bst-tools");
        this.propertyTools = document.getElementById(canvas.id+":properties-tools");
        //#endregion
        this.tooltipText = document.getElementById(canvas.id+":tooltip-text");
        this.helpIcon = document.getElementById(canvas.id+":help");

        //#region BOARD MISC
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.canvasWidth = 700;
        this.canvasHeight = 700;
        this.boardThickness = Math.round(this.canvasWidth * 1/350);
        this.nodeThickness = this.boardThickness + 0.25;
        this.canvas.style.border = this.boardThickness + "px solid black";
        this.board = null;
        this.COLS = 13;
        this.ROWS = 13;
        /** DRAGGING */
        this.prevX = null;
        this.prevY = null;
        this.xDirection = null;
        this.yDirection = null;
        this.hasTwoChildren = null;
        this.lastValidCellCoords = null;
        this.dragging = false;
        //#endregion

        /** Question setup object. Will be non-null if the lecturer is creating a question */
        this.setup = null;
        /** Question attempt object. Will be non-null if the student is answering a question */
        this.attempt = null;

        //#region ENUMS
        this.events = {
            ADDROOT: "addRoot",
            ADDCHILD: "addChild",
            REMOVE: "remove",
            DRAG: "drag",
            UNDO: "undo",
            SELECT: "select",
            DESELECT: "deselect"
        };
        this.qTypes = {TRAVERSAL: "traversal", BST: "bst", PROPERTIES: "properties"};
        //#endregion

        //#region TREE
        this.tree = null;
        this.selectedNode = null;
        /** Boolean indicating whether a new node's value should be taken from user input or randomised */
        this.randNodeValue = false;
        this.randBSTValue = false;
        this.MAX_NODE_VALUE = 99;
        this.MIN_NODE_VALUE = 1;
        //#endregion

        this.helpText = {
            traversal:  '<p>Perform the required traversal by selecting the nodes in the correct order and/or typing the solution directly in the answer box.' +
                        '<br>Deselecting a node will remove it from the traversal.</p>' +
                        '<p>The format of your answer must be node values separated by a comma followed by a space.' + 
                        '<br>i.e. [node_value][comma][space][node_value] etc.' +
                        '<br>This format is automatically enforced when selecting nodes.</p>',
            bst:        '<p>This question requires you to build a binary search tree using the values displayed in the "BST Values" box. ' +
                        '<br>The value that you need to add at each step will be displayed in the "NODE VALUE" box.</p>' +
                        '<p>To begin, click on the "ADD ROOT" button. This will display the root of the tree on the canvas. ' +
                        '<br>Next, click on the root to select it (this will highlight the node in red). ' +
                        'To add a child to the selected node, click on a cell that is below the selected node, and to the left or right of it. ' +
                        'This will add a left child or right child, respectively. ' +
                        '<br>Note that you cannot add a child node directly below its parent node.</p>' +
                        '<p>If you would like to move a node, select the node and drag it to the desired cell. ' +
                        '<br>Note that you will only be allowed to move the node to a valid cell (i.e. a left child will always remain a left child etc.)</p>' +
                        '<p>Click on the "UNDO" button in order to remove the last node that was added (this can be repeated any number of times).</p>',
            properties: '<p>This question requires you to fill in the specified tree and/or node properties.</p>' +
                        '<p>Fill in the node properties for all nodes highlighted in orange. Selecting these nodes will display the required properties.</p>' + 
                        '<p>Once all the properties for a node have been entered, the node will turn blue.</p>'
        };

        if(this.databaseMisc.disablecanvas) {
            this.canvas.style.pointerEvents = "none"; // Disable all canvas interaction when student is reviewing
        }

        this.init();
    }

    init() {
        this.board = new Board(this);
        this.board.drawGrid();

        this.initListeners();

        if(this.databaseMisc.lecturer) {
            this.setup = new QuestionSetup(this);
        }
        else {
            this.attempt = new QuestionAttempt(this);
            if(this.databaseMisc.lastanswer !== "") {
                this.attempt.reconstructLastAnswer();
            }
            this.expandCanvas();
        }
    }

    redrawCanvas() {
        this.context.save();

        this.context.fillStyle = "white";
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        this.context.restore();

        /** Redraw the tree */
        if(this.tree) {
            for(const node of this.tree.nodeArray) {
                node.draw(node.parent, node.cellCoords.x, node.cellCoords.y)
            }
        }

        this.board.drawGrid();
    }

    initListeners() {
        
        window.addEventListener("resize", this.expandCanvas.bind(this));
        this.navbar.addEventListener("click", this.navbarClicked.bind(this));
        this.canvas.addEventListener("click", this.onBoardClick.bind(this));
        this.canvas.addEventListener("mousemove", this.onBoardHover.bind(this));
        this.canvas.addEventListener("mouseleave", this.onBoardExit.bind(this));

        if(!this.databaseMisc.lecturer && (this.databaseMisc.qtype === this.qTypes.TRAVERSAL || 
                this.databaseMisc.qtype === this.qTypes.PROPERTIES)) return;

        this.canvas.addEventListener("mousedown", this.beginDrag.bind(this));
        document.addEventListener("mouseup", this.exitDrag.bind(this));

        this.randNodeValueCheckbox.addEventListener("change", this.randNodeValueChecked.bind(this, this.randNodeValueCheckbox)); // Bind Main class and actual checkbox element
        this.randBSTValueCheckbox.addEventListener("change", this.randBSTValueChecked.bind(this, this.randBSTValueCheckbox)); // Bind Main class and actual checkbox element
        this.addRootButton.addEventListener("click", this.addRoot.bind(this));
        this.removeNodeButton.addEventListener("click", this.removeNodeAndChildren.bind(this));
        this.editNodeValueButton.addEventListener("click", this.editNodeValue.bind(this));

        if(this.databaseMisc.lecturer) {
            this.qTypeHeader.click();
            this.createQuestionHeader.click();

            this.expandCanvas();
        }
    }

    expandCanvas() {
        this.canvas.width = 700;
        this.canvas.height = 700;
        if(this.canvas.getBoundingClientRect().width > 0) { // Only reassign the canvas dimension if the canvas is of width greater than 0
            this.canvasWidth = this.canvas.getBoundingClientRect().width - 4;
            this.canvasHeight = this.canvas.getBoundingClientRect().height - 4;
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        }

        this.boardThickness = Math.round(this.canvasWidth * 1/350);
        this.nodeThickness = this.boardThickness + 0.25;

        this.canvas.style.border = this.boardThickness + "px solid black";

        this.board.recalculateCellDimensions();
        this.redrawCanvas();
    }

    navbarClicked() {
        setTimeout(this.expandCanvas.bind(this), 500);
    }

    randNodeValueChecked(checkbox) {
        this.randNodeValue = checkbox.checked;
        this.randBSTValueCheckbox.checked = false; // Uncheck random bst if random input is checked
        this.randBSTValue = false;

        if(this.randNodeValue) { // If the random value checkbox is checked, disable user specified node values
            this.nodeValueInput.disabled = true;
        }
        else {
            this.nodeValueInput.disabled = false;
        }
    }

    randBSTValueChecked(checkbox) {
        this.randBSTValue = checkbox.checked;
        this.randNodeValueCheckbox.checked = false; // Uncheck random input if random bst is checked
        this.randNodeValue = false;

        if(this.randBSTValue) { // If the random value checkbox is checked, disable user specified node values
            this.nodeValueInput.disabled = true;
        }
        else {
            this.nodeValueInput.disabled = false;
        }
    }

    addRoot() {
        let newNodeValue;

        if(!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.BST) {
            if(this.databaseMisc.bstvalues.length === 0) return;
            
            newNodeValue = Number(this.nodeValueInput.value);
            this.nodeValueInput.value = this.attempt.bstAttempt.bst.values[this.attempt.bstAttempt.bst.getIndex("next")];
            this.attempt.bstAttempt.bst.undoButton.style.display = "inline-block";
        }
        else {
            newNodeValue = this.getNewNodeValue(true);
        }

        if(!newNodeValue) return; // newNodeValue is null

        if(!this.tree) { // Tree doesn't exist
            this.tree = new Tree(this, newNodeValue);
        }
        else { // Tree instance already exists - will be true if the root node was removed
            this.tree.setNewRoot(newNodeValue);
        }
        this.addRootButton.style.display = "none";

        if(this.databaseMisc.lecturer) {
            this.setup.handleEvent(this.events.ADDROOT);
        }
        else {
            if(this.databaseMisc.qtype === this.qTypes.BST) {
                this.attempt.bstAttempt.bst.stack.push(this.tree.root);
            }
            this.attempt.handleEvent(this.events.ADDROOT);
        }
    }

    removeNodeAndChildren() {
        this.tree.removeNodeAndChildren(this.selectedNode);
        
        if(this.selectedNode.isRoot) {
            this.addRootButton.style.display = "inline-block";
        }
        
        while(this.board.canShrink()) {
            this.resizeBoard("shrink");
        }
        
        this.redrawCanvas();
        
        this.selectedNode = null;
        this.removeNodeButton.style.display = "none";
        this.editNodeValueButton.style.display = "none";

        if(this.databaseMisc.lecturer) {
            this.setup.handleEvent(this.events.REMOVE);
        }
    }

    editNodeValue() {
        if(!this.selectedNode) return; // There is no node selected
        
        let newNodeValue = this.getNewNodeValue(this.selectedNode.isRoot, true);

        if(!newNodeValue) return; // newNodeValue is null
            
        this.selectedNode.value = newNodeValue;

        this.redrawCanvas();
    }

    beginDrag(event) {
        this.board.boardCoordsFromMouse(event);
        
        this.dragging = true;
        this.prevX = this.board.cellX;
        this.prevY = this.board.cellY;
    }

    rightDragging(node, xDirection, yDirection){
        if(!node){
            return;
        }
        if ((node.children.leftChild == null && node.children.rightChild == null)){
            while(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] !== "undefined" || (this.xDirection == 0 && this.yDirection == 0) || (node.cellCoords.x + this.xDirection >= this.COLS) || (node.cellCoords.x + this.xDirection < 0) || (node.cellCoords.y + this.yDirection >= this.ROWS)){ //if there will be a collision, either shorten the distance of translation or stay in place.
                    if(this.xDirection>0) this.xDirection--;
                    else if(this.xDirection<0) this.xDirection++;
                    else if(this.yDirection<0) this.yDirection++;
                    else if(this.yDirection>0) this.yDirection--;
                    else break;
            }
            //for leaves
            if(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] === "undefined") { //if a cell is available
                node.cellCoords.x = node.cellCoords.x + this.xDirection; // Set new coordinates after dragging
                node.cellCoords.y = node.cellCoords.y + this.yDirection;
                this.tree.nodes[node.cellCoords.y][node.cellCoords.x] = node; // Make the new transformed node selectable
                this.tree.nodes[node.cellCoords.y - this.yDirection][node.cellCoords.x - this.xDirection] = undefined; // Set previous spot to say there is no node at that spot
                if(node.cellCoords.x === 0 || node.cellCoords.x === this.COLS - 1 || node.cellCoords.y === this.ROWS - 1) {
                    if(this.board.canGrow()) {
                        this.resizeBoard("grow");
                    }
                    else {
                        this.redrawCanvas();
                    }
                }
                else if(this.board.canShrink()) {
                    while(this.board.canShrink()) {
                        this.resizeBoard("shrink");
                    }
                }
                else {
                    this.redrawCanvas();
                }
            }
            return;
        }
        this.rightDragging(node.children.rightChild, this.xDirection, this.yDirection);
        while(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] !== "undefined" || (this.xDirection == 0 && this.yDirection == 0) || (node.cellCoords.x + this.xDirection >= this.COLS) || (node.cellCoords.x + this.xDirection < 0) || (node.cellCoords.y + this.yDirection >= this.ROWS)){
            if(this.xDirection>0) this.xDirection--;
            else if(this.xDirection<0) this.xDirection++;
            else if(this.yDirection<0) this.yDirection++;
            else if(this.yDirection>0) this.yDirection--;
            else break;
        }
        //for inner-nodes
        if(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] === "undefined") { //if a cell is available
            node.cellCoords.x = node.cellCoords.x + this.xDirection; // Set new coordinates after dragging
            node.cellCoords.y = node.cellCoords.y + this.yDirection;
            this.tree.nodes[node.cellCoords.y][node.cellCoords.x] = node; // Make the new transformed node selectable
            this.tree.nodes[node.cellCoords.y - this.yDirection][node.cellCoords.x - this.xDirection] = undefined; // Set previous spot to say there is no node at that spot
        }
        if(node.cellCoords.x === 0 || node.cellCoords.x === this.COLS - 1 || node.cellCoords.y === this.ROWS - 1) {
            if(this.board.canGrow()) {
                this.resizeBoard("grow");
            }
            else {
                this.redrawCanvas();
            }
        }
        else if(this.board.canShrink()) {
            while(this.board.canShrink()) {
                this.resizeBoard("shrink");
            }
        }
        else {
            this.redrawCanvas();
        }
        this.rightDragging(node.children.leftChild, this.xDirection, this.yDirection);
        this.redrawCanvas();
        return;
    }

    leftDragging(node, xDirection, yDirection){
        if(!node){
            return;
        }
        if (node.children.leftChild == null && node.children.rightChild == null){
            while(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] !== "undefined" || (this.xDirection == 0 && this.yDirection == 0) || (node.cellCoords.x + this.xDirection >= this.COLS) || (node.cellCoords.x + this.xDirection < 0) || (node.cellCoords.y + this.yDirection >= this.ROWS)){ //if there will be a collision, either shorten the distance of translation or stay in place.
                    if(this.xDirection>0) this.xDirection--;
                    else if(this.xDirection<0) this.xDirection++;
                    else if(this.yDirection<0) this.yDirection++;
                    else if(this.yDirection>0) this.yDirection--;
                    else break;
            }
            //for leaves
            if(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] === "undefined") { //if a cell is available
                node.cellCoords.x = node.cellCoords.x + this.xDirection; // Set new coordinates after dragging
                node.cellCoords.y = node.cellCoords.y + this.yDirection;
                this.tree.nodes[node.cellCoords.y][node.cellCoords.x] = node; // Make the new transformed node selectable
                this.tree.nodes[node.cellCoords.y - this.yDirection][node.cellCoords.x - this.xDirection] = undefined; // Set previous spot to say there is no node at that spot
                if(node.cellCoords.x === 0 || node.cellCoords.x === this.COLS - 1 || node.cellCoords.y === this.ROWS - 1) {
                    if(this.board.canGrow()) {
                        this.resizeBoard("grow");
                    }
                    else {
                        this.redrawCanvas();
                    }
                }
                else if(this.board.canShrink()) {
                    while(this.board.canShrink()) {
                        this.resizeBoard("shrink");
                    }
                }
                else {
                    this.redrawCanvas();
                }
            }
            return;
        }
        this.leftDragging(node.children.leftChild, this.xDirection, this.yDirection);
        while(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] !== "undefined" || (this.xDirection == 0 && this.yDirection == 0)|| (node.cellCoords.x + this.xDirection >= this.COLS) || (node.cellCoords.x + this.xDirection < 0) || (node.cellCoords.y + this.yDirection >= this.ROWS)){
            if(this.xDirection>0) this.xDirection--;                
            else if(this.xDirection<0) this.xDirection++;
            else if(this.yDirection<0) this.yDirection++;
            else if(this.yDirection>0) this.yDirection--;
            else break;
        }
        //for inner-nodes
        if(typeof this.tree.nodes[node.cellCoords.y + this.yDirection][node.cellCoords.x + this.xDirection] === "undefined") { //if a cell is available
            node.cellCoords.x = node.cellCoords.x + this.xDirection; // Set new coordinates after dragging
            node.cellCoords.y = node.cellCoords.y + this.yDirection;
            this.tree.nodes[node.cellCoords.y][node.cellCoords.x] = node; // Make the new transformed node selectable
            this.tree.nodes[node.cellCoords.y - this.yDirection][node.cellCoords.x - this.xDirection] = undefined; // Set previous spot to say there is no node at that spot
        }
        if(node.cellCoords.x === 0 || node.cellCoords.x === this.COLS - 1 || node.cellCoords.y === this.ROWS - 1) {
            if(this.board.canGrow()) {
                this.resizeBoard("grow");
            }
            else {
                this.redrawCanvas();
            }
        }
        else if(this.board.canShrink()) {
            while(this.board.canShrink()) {
                this.resizeBoard("shrink");
            }
        }
        else {
            this.redrawCanvas();
        }
        this.leftDragging(node.children.rightChild, this.xDirection, this.yDirection);
        this.redrawCanvas();
        return;
    }

    onArrowClick(e){ // When using arrow keys
        if(e.keyCode == 39){ // If right arrow
            if(this.selectedNode.children.rightChild != null){
                this.selectedNode.selected = false;
                this.selectedNode = this.selectedNode.children.rightChild;
                this.selectedNode.selected = true;
                this.redrawCanvas();
            }
        }
        else if(e.keyCode == 37){ // If left arrow
            if(this.selectedNode.children.leftChild != null){
                this.selectedNode.selected = false;
                this.selectedNode = this.selectedNode.children.leftChild;
                this.selectedNode.selected = true;
                this.redrawCanvas();
            }
        }
        else if(e.keyCode == 38){ // If up arrow
            e.preventDefault(); // Prevent page from moving when clicking up and down arrows
            if(this.selectedNode.parent != null){
                this.selectedNode.selected = false;
                this.selectedNode = this.selectedNode.parent;
                this.selectedNode.selected = true;
                this.redrawCanvas();
            }
        }
        else if(e.keyCode == 40){ // Prevent page from moving when clicking up and down arrows
            e.preventDefault();
        }
        else return;
    }

    exitDrag() {
        if(!this.tree) return;

        if(this.dragging) {
            this.dragging = false;
            this.lastValidCellCoords = null;
            this.redrawCanvas();
        }
    }

    onBoardClick(event) {
        if(!this.tree || (!this.databaseMisc.lecturer && (this.attempt.traversalAttempt && !this.attempt.traversalAttempt.validInput))) return;

        this.board.boardCoordsFromMouse(event); 

        this.nodeValueInput.focus();

        if(typeof this.tree.nodes[this.board.cellY][this.board.cellX] !== "undefined") { // There is a node at the selected cell
            if(this.databaseMisc.lecturer && this.setup.currQuestion.PROPERTIES && this.setup.propertiesQuestion.selectingRequiredNodes) {
                this.setup.propertiesQuestion.selectRequiredNode(this.tree.nodes[this.board.cellY][this.board.cellX]);
                return;
            }
            else if(!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.PROPERTIES && !this.tree.nodes[this.board.cellY][this.board.cellX].properties.required) return; // Cannot select nodes that are not required in a properties question

            if(this.tree.nodes[this.board.cellY][this.board.cellX].selected) { // If the current selected node is selected again
                if(!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.TRAVERSAL) {
                    removeEventListener("keydown", this.onArrowClick.bind(this)); // Student cannot use arrow keys in a traversal question

                    this.tree.nodes[this.board.cellY][this.board.cellX].selected = false;
                    this.attempt.traversalAttempt.buildAnswerString(this.tree.nodes[this.board.cellY][this.board.cellX], this.events.DESELECT);
                }
                else {
                    if(!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.PROPERTIES) {
                        this.attempt.propertiesAttempt.displayNodePropertyInputs(false); // Hide the node property input boxes
                    }
                    this.selectedNode.selected = false;
                    this.selectedNode = null;
                }
                this.redrawCanvas();
                this.removeNodeButton.style.display = "none";
                this.editNodeValueButton.style.display = "none";
                return;
            }
            if(this.selectedNode !== null) { // A new node is selected so set the current selected node's property to false
                if(this.databaseMisc.lecturer) {
                    this.selectedNode.selected = false;
                }
                else {
                    if(this.databaseMisc.qtype !== "traversal") { // Only when it is a traversal question for the student will previously selected nodes not be deselected when selecting a new node
                        this.selectedNode.selected = false;
                    }
                }
            }

            this.selectedNode = this.tree.nodes[this.board.cellY][this.board.cellX];

            this.selectedNode.selected = true;

            this.redrawCanvas();

            if(this.databaseMisc.lecturer) {
                this.removeNodeButton.style.display = "inline-block";
                this.editNodeValueButton.style.display = "inline-block";
            }
            else {
                removeEventListener("keydown", this.onArrowClick.bind(this)); // Student cannot use arrow keys in a traversal question
                if(this.databaseMisc.qtype !== this.qTypes.BST) { // Student can't edit node values or remove nodes in BST question (can only undo)
                    this.removeNodeButton.style.display = "inline-block";
                    this.editNodeValueButton.style.display = "inline-block";
                }

                if(this.databaseMisc.qtype === this.qTypes.TRAVERSAL) {
                    this.attempt.traversalAttempt.buildAnswerString(this.selectedNode, this.events.SELECT);
                }
                else if(this.databaseMisc.qtype === this.qTypes.BST){ // Student can use arrow keys on BST question
                    addEventListener("keydown", this.onArrowClick.bind(this));
                }
                else if(this.databaseMisc.qtype === this.qTypes.PROPERTIES) {
                    this.attempt.propertiesAttempt.displayNodePropertyInputs(true);
                }
            }
        }
        else if(this.board.cellX != this.prevX || this.board.cellY != this.prevY){ // If dragging
            this.xDirection = this.board.cellX - this.prevX;
            this.yDirection = this.board.cellY - this.prevY;
            if (this.canDrag()){
                if(this.xDirection>0){ //moving right
                    this.rightDragging(this.selectedNode, this.xDirection, this.yDirection);
                }
                else{
                    this.leftDragging(this.selectedNode, this.xDirection, this.yDirection);
                }
            }
            if(this.databaseMisc.lecturer) {
                this.setup.handleEvent(this.events.DRAG);
            }
            else {
                if(this.databaseMisc.qtype === this.qTypes.BST) {
                    this.attempt.handleEvent(this.events.DRAG);
                }
            }
        }
        else { // No node at the selected cell so place a child node
            if(!this.selectedNode) return; // No node selected

            if(this.board.cellX === this.selectedNode.cellCoords.x) return; // Don't allow child node to be in line with parent node
            if(this.board.cellY <= this.selectedNode.cellCoords.y) return; // Don't allow child node to be above or on the same level as parent node
            if(this.board.cellX < this.selectedNode.cellCoords.x && this.selectedNode.hasLeftChild()) return; // Parent already has a left child
            if(this.board.cellX > this.selectedNode.cellCoords.x && this.selectedNode.hasRightChild()) return; // Parent already has a right child

            let newNodeValue;
            if(!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.BST) {
                newNodeValue = Number(this.nodeValueInput.value);
                this.nodeValueInput.value = this.attempt.bstAttempt.bst.values[this.attempt.bstAttempt.bst.getIndex("next")]; // The index will be attempt.bst.values.length + 1 after adding the final BST value (i.e. nodeValueInput will be an empty string)
            }
            else {
                newNodeValue = this.getNewNodeValue();
            }

            if(!newNodeValue) return; // newNodeValue is null

            if(this.board.cellX < this.selectedNode.cellCoords.x) { // Adding a left child
                this.tree.addChild(this.selectedNode, "L", newNodeValue, this.board.cellX, this.board.cellY);
            }
            else { // Adding a right child
                this.tree.addChild(this.selectedNode, "R", newNodeValue, this.board.cellX, this.board.cellY);
            }

            /** INCREASE SIZE OF BOARD */
            if(this.board.cellX === 0 || this.board.cellX === this.COLS - 1 || this.board.cellY === this.ROWS - 1) {
                if(this.board.canGrow()) {
                    this.resizeBoard("grow");
                }
            }

            if(this.databaseMisc.lecturer) {
                this.setup.handleEvent(this.events.ADDCHILD);
            }
            else {
                if(this.databaseMisc.qtype === this.qTypes.BST) {
                    this.attempt.bstAttempt.bst.stack.push(this.tree.getNode(Number(newNodeValue)));
                }
                this.attempt.handleEvent(this.events.ADDCHILD);
            }
        }
    }

    onBoardHover(event) {
        if(!this.tree) return;

        this.board.boardCoordsFromMouse(event);

        if(typeof this.tree.nodes[this.board.cellY][this.board.cellX] !== "undefined") { // There is a node in the hovered cell
            if(!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.PROPERTIES && !this.tree.nodes[this.board.cellY][this.board.cellX].properties.required) return;
            document.body.style.cursor = "pointer";
        }
        else if(!this.databaseMisc.lecturer && (this.databaseMisc.qtype === this.qTypes.TRAVERSAL || this.databaseMisc.qtype === this.qTypes.PROPERTIES)) {
            document.body.style.cursor = "default";
            return;
        }
        else if(this.selectedNode) { // No node in the hovered cell but an existing node is selected
            if(this.dragging) { 
                if(this.canDrag()) { // Valid cell to drag into
                    this.redrawCanvas();
                    this.lastValidCellCoords = this.selectedNode.drawOutline();
                    document.body.style.cursor = "move";
                }
                else { // Invalid cell to drag into
                    this.redrawCanvas();
                    document.body.style.cursor = "not-allowed";
                    if(!this.lastValidCellCoords) return;
                    if(!this.selectedNode.isRoot) this.selectedNode.drawOutline(this.lastValidCellCoords); // Use last valid cell coords to draw outline at that cell
                }
            }
            else{
                if (this.board.cellX == this.selectedNode.cellCoords.x || this.board.cellY <= this.selectedNode.cellCoords.y ||
                    (this.board.cellX < this.selectedNode.cellCoords.x && this.selectedNode.hasLeftChild()) ||
                    (this.board.cellX > this.selectedNode.cellCoords.x && this.selectedNode.hasRightChild()) ||
                    (!this.databaseMisc.lecturer && this.databaseMisc.qtype === this.qTypes.BST && this.attempt.bstAttempt.bst.stack.length === this.attempt.bstAttempt.bst.values.length) || (this.databaseMisc.lecturer && !this.getNewNodeValue())) { // Invalid cell to place new child
                    
                        document.body.style.cursor = "not-allowed";
                }
                else {
                    document.body.style.cursor = "crosshair";
                }
            }
        }
        else { // No node in the hovered cell and no node selected
            document.body.style.cursor = "default";
        }
    }

    onBoardExit() {
        document.body.style.cursor = "default";
    }

    getNewNodeValue(root = false, edit = false) {
        let newNodeValue = null;

        if(!this.randNodeValue && !this.randBSTValue) { // Set the node's value to the user specified input
            newNodeValue = this.nodeValueInput.value;

            if(newNodeValue === "" || Number(newNodeValue) < this.MIN_NODE_VALUE || Number(newNodeValue) > this.MAX_NODE_VALUE || !Number.isInteger(Number(newNodeValue))) {
                return;
            }

            if(this.databaseMisc.lecturer && this.setup.currQuestion.TRAVERSAL && this.tree.isDuplicateValue(Number(newNodeValue))) {
                return;
            }

            this.nodeValueInput.value = "";
            this.nodeValueInput.focus();
        }
        else if(this.randNodeValue) { // Generate a random value for the node between MIN_NODE_VALUE and MAX_NODE_VALUE
            newNodeValue = Math.floor(Math.random() * (this.MAX_NODE_VALUE - this.MIN_NODE_VALUE) + this.MIN_NODE_VALUE);

            /** Check if duplicate */
            if(this.tree && this.databaseMisc.lecturer && this.setup.currQuestion.TRAVERSAL && this.tree.isDuplicateValue(Number(newNodeValue))) {
                if(this.tree.numNodes === (this.MAX_NODE_VALUE - this.MIN_NODE_VALUE) + 1) return;

                while(this.tree.isDuplicateValue(newNodeValue)) {
                    newNodeValue = Math.floor(Math.random() * (this.MAX_NODE_VALUE - this.MIN_NODE_VALUE) + this.MIN_NODE_VALUE);
                }
            }
        }
        else if(this.randBSTValue) { // Generate a random value for the node that enforces the BST property of the tree
            let lowerBound = this.MIN_NODE_VALUE;
            let upperBound = this.MAX_NODE_VALUE;
            let currNode = this.selectedNode;

            if(root) newNodeValue = Math.floor(Math.random() * (this.MAX_NODE_VALUE - this.MIN_NODE_VALUE) + this.MIN_NODE_VALUE);

            if(this.tree && this.selectedNode) {
                if(this.databaseMisc.lecturer) {
                    if(this.tree.numNodes === (this.MAX_NODE_VALUE - this.MIN_NODE_VALUE) + 1) return; 

                    // Editing a node
                    if(edit) {
                        currNode = this.selectedNode;
                        if(currNode.children.leftChild) { // Lower bound calculation
                            currNode = currNode.children.leftChild;
                            while(currNode.children.rightChild) {
                                currNode = currNode.children.rightChild;
                            }
                            lowerBound = currNode.value + 1;
                        }
                        currNode = this.selectedNode;
                        if(currNode.children.rightChild) { // Upper bound calculation
                            currNode = currNode.children.rightChild;
                            while(currNode.children.leftChild) {
                                currNode = currNode.children.leftChild;
                            }
                            upperBound = currNode.value - 1;
                        }
                        if(!this.selectedNode.children.leftChild || !this.selectedNode.children.rightChild) { // Editing a leaf node
                            if(this.selectedNode.childType() === "L") { // The selected node is a left child
                                currNode = this.selectedNode;
                                while(currNode.childType() === "L" && !currNode.parent.isRoot) { // Traverse back up the tree until the node is a right child
                                    currNode = currNode.parent;
                                }
                                if(!(currNode.parent.isRoot && currNode.childType() === "L")) {
                                    lowerBound = currNode.parent.value + 1;
                                }
                                upperBound = this.selectedNode.parent.value - 1;
                            }
                            else { // The selected node is a right child
                                currNode = this.selectedNode;
                                while(currNode.childType() === "R" && !currNode.parent.isRoot) { // Traverse back up the tree until the node is a right child
                                    currNode = currNode.parent;
                                }
                                if(!(currNode.parent.isRoot && currNode.childType() === "R")) {
                                    upperBound = currNode.parent.value - 1;
                                }
                                lowerBound = this.selectedNode.parent.value + 1;
                            }
                            if(this.selectedNode.value === 1 || this.selectedNode.value === 99) return;
                        }
                    }
                    else if(this.board.cellX < this.selectedNode.cellCoords.x) { // Adding a left child
                        if(this.selectedNode.isRoot) {
                            upperBound = this.selectedNode.value - 1;
                        }
                        else {
                            currNode = this.selectedNode;
                            while(currNode.childType() === "L" && !currNode.parent.isRoot) { // Traverse back up the tree until the node is a right child
                                currNode = currNode.parent;
                            }
                            if(!(currNode.parent.isRoot && currNode.childType() === "L")) {
                                lowerBound = currNode.parent.value + 1;
                            }
                            upperBound = this.selectedNode.value - 1;
                        }
                        if(this.selectedNode.value === 1) return;
                    }
                    else if(this.board.cellX > this.selectedNode.cellCoords.x){ // Adding a right child
                        if(this.selectedNode.isRoot) {
                            lowerBound = this.selectedNode.value + 1;
                        }
                        else {
                            currNode = this.selectedNode;
                            while(currNode.childType() === "R" && !currNode.parent.isRoot) { // Traverse back up the tree until the node is a right child
                                currNode = currNode.parent;
                            }
                            if(!(currNode.parent.isRoot && currNode.childType() === "R")) {
                                upperBound = currNode.parent.value - 1;
                            }
                            lowerBound = this.selectedNode.value + 1;
                        }
                        if(this.selectedNode.value === 99) return;
                    }

                    if(upperBound < lowerBound) return;
                    newNodeValue = Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
                }
            }
        }

        return Number(newNodeValue);
    }

    /** Checks whether a node can be dragged to the required position on the board */
    canDrag() {
        if(!this.selectedNode) return false; // Cannot drag a node without selecting it

        if(this.selectedNode.isRoot) return false; // Cannot drag the root

        if(this.board.cellY <= this.selectedNode.parent.cellCoords.y || // Cannot be dragged in line or above parent
            (this.prevX < this.selectedNode.parent.cellCoords.x && this.board.cellX >= this.selectedNode.parent.cellCoords.x) || // Cannot be dragged across parent to become the opposing child
            (this.prevX > this.selectedNode.parent.cellCoords.x && this.board.cellX <= this.selectedNode.parent.cellCoords.x) ||
            //(this.selectedNode.children.leftChild != null && (this.selectedNode.children.leftChild.cellCoords.x >= this.board.cellX || this.selectedNode.children.leftChild.cellCoords.y <= this.board.cellY)) || // Keep its children to the left or right and below
            //(this.selectedNode.children.rightChild != null && (this.selectedNode.children.rightChild.cellCoords.x <= this.board.cellX || this.selectedNode.children.rightChild.cellCoords.y <= this.board.cellY)) ||
            (this.prevX != this.selectedNode.cellCoords.x || this.prevY != this.selectedNode.cellCoords.y)) return false; // If dragging doesn't start at a node
        
        return true;
    }

    /** Dynamically resize the board if a cell is made on any edge or there is adequate space to shrink */
    resizeBoard(direction) {
        if(direction === "grow") {
            this.ROWS += 2;
            this.COLS += 2;

            this.board = new Board(this);
            this.tree.remake(direction);
        }
        else if(direction === "shrink") {
            this.tree.remake(direction);

            this.ROWS -= 2;
            this.COLS -= 2;

            this.board = new Board(this);
        }

        this.redrawCanvas();
    }

    /** Constructs a tree from the given string. Adds nodes to the tree in the order they were placed when the string was constructed */
    buildTreeFromString(string) {
        let temp = string;
        let tempArr = temp.split("#");

        let node = tempArr[0].split(":");
        let boardDimensions = node[0].split(",");
        this.ROWS = Number(boardDimensions[0]);
        this.COLS = Number(boardDimensions[1]);
        let nodeValue = Number(node[1]);

        this.board = new Board(this); 
        this.tree = new Tree(this, nodeValue);

        tempArr.shift();
        
        while(tempArr.length !== 0) {
            if(tempArr[0] === "") break;

            let node = tempArr[0].split(":");

            let nodeValue = Number(node[0]);
            let childPos = node[1].split(".");
            let nodeCoords = node[2].split(",");

            let nodeX = Number(nodeCoords[1]);
            let nodeY = Number(nodeCoords[0]);

            let newNode = this.tree.root;

            for(let i = 0; i < childPos.length; i++) {
                if(childPos[i] === "L") {
                    if(!newNode.children.leftChild) { // Reached correct position of child
                        this.tree.addChild(newNode, "L", nodeValue, nodeX, nodeY);
                    }
                    else {
                        newNode = newNode.children.leftChild;
                    }
                }      
                else {
                    if(!newNode.children.rightChild) {
                        this.tree.addChild(newNode, "R", nodeValue, nodeX, nodeY);
                    }               
                    else {
                        newNode = newNode.children.rightChild;
                    }
                }
            }

            tempArr.shift();
        }

        this.redrawCanvas();
    }
}