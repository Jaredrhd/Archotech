onload = init;

/** HTML ELEMENTS */
var nodeValueInput = document.getElementById("node-value");
var randNodeValueCheckbox = document.getElementById("random-node-value");
var addRootButton = document.getElementById("add-root");
var removeNodeButton = document.getElementById("remove-node");

var curatedData = document.getElementById("curated_data");

/** The list of BST values shown to the student */
const bstValueList = document.getElementById("bst-values");
const editNodeValueButton = document.getElementById("edit-node");
var bstValueList = document.getElementById("bst-values");

var canvas, context, board;
var bstQuestion, traversalQuestion;

var ROWS = 13;
var COLS = 13;

let tree = null;
let selectedNode = null;

let prevX, prevY, dragging = null;

var MAX_NODE_VALUE = 99;
var MIN_NODE_VALUE = 0;

/** Boolean indicating whether a new node's value should be taken from user input or randomised */
let randNodeValue = false;

/** TESTING */
let drawGrid = true;

function init() {
    canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
        document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
        return;
    }

    context = canvas.getContext("2d");
    board = new Board();

    bstQuestion = new BSTQuestion();
    traversalQuestion = new TraversalQuestion();

    QuestionManager.addQuestion(bstQuestion);
    QuestionManager.addQuestion(traversalQuestion);

    if(drawGrid) {
        board.drawGrid();
    }

    initListeners();
}

function redrawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    /** Redraw the tree */
    for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLS; j++) {
            if(typeof tree.nodes[i][j] !== "undefined") {
                tree.nodes[i][j].draw(tree.nodes[i][j].parent, tree.nodes[i][j].cellCoords.x, tree.nodes[i][j].cellCoords.y);
            }
        }
    }

    if(drawGrid) {
        board.drawGrid();
    }
}

function initListeners() {
    randNodeValueCheckbox.addEventListener("change", randNodeValueChecked);
    addRootButton.addEventListener("click", addRoot);
    removeNodeButton.addEventListener("click", removeNodeAndChildren);
    editNodeValueButton.addEventListener("click", editNodeValue);

    /** CANVAS */
    canvas.addEventListener("click", onBoardClick);
    canvas.addEventListener("mousemove", onBoardHover);
    canvas.addEventListener("mouseleave", onBoardExit);
    canvas.addEventListener("mousedown", beginDrag);
}

function randNodeValueChecked() {
    randNodeValue = this.checked;

    if(randNodeValue) { // If the random value checkbox is checked, disable user specified node values
        nodeValueInput.disabled = true;
    }
    else {
        nodeValueInput.disabled = false;
    }
}

function addRoot() {
    let newNodeValue;

    if(QuestionManager.currQuestion === bstQuestion) {
        newNodeValue = nodeValueInput.value;
        nodeValueInput.value = bstQuestion.getNextNodeValue();
    }
    else {
        newNodeValue = getNewNodeValue();
    }

    if(!newNodeValue) return; // newNodeValue is null

    if(!tree) { // Tree doesn't exist
        tree = new Tree(Number(newNodeValue), board);
    }
    else { // Tree instance already exists - will be true if the root node was removed
        tree.setNewRoot(Number(newNodeValue), board);
    }

    addRootButton.style.display = "none";

    if(QuestionManager.currQuestion === traversalQuestion) {
        traversalQuestion.performTraversal();
    }
}

function editNodeValue(){
    let newNodeValue = getNewNodeValue();

    if(!newNodeValue) return; // newNodeValue is null
    
    if(selectedNode !== null) { // There is a node selected
        selectedNode.value = newNodeValue;
    }
    else {
        return;
    }

    redrawCanvas();
}

function removeNodeAndChildren() {
    if(!selectedNode.isLeaf()) {
        if(confirm("This will remove all subtrees")) {
            tree.removeNodeAndChildren(selectedNode);
        }
        else {
            return;
        }
    }
    else {
        tree.removeNodeAndChildren(selectedNode);
    }
    
    if(selectedNode.isRoot) {
        addRootButton.style.display = "block";
    }

    while(board.canShrink()) {
        resizeBoard("shrink");
    }

    redrawCanvas();

    selectedNode = null;
    removeNodeButton.style.display = "none";
}

function beginDrag(event){
    board.boardCoordsFromMouse(event);
    
    dragging = 1;
    prevX = board.cellX;
    prevY = board.cellY;
}

function onBoardClick(event) {
    if(!tree) return;

    board.boardCoordsFromMouse(event); 

    dragging = null;
    if(typeof tree.nodes[board.cellY][board.cellX] !== "undefined") { // There is a node at the selected cell
        if(tree.nodes[board.cellY][board.cellX] == selectedNode) { // If the current selected node is selected again
            selectedNode.selected = false;
            selectedNode = null;
            redrawCanvas();
            removeNodeButton.style.display = "none";
            return;
        }
        if(selectedNode !== null) { // A new node is selected so set the current selected node's property to false
            selectedNode.selected = false;
        }

        selectedNode = tree.nodes[board.cellY][board.cellX];

        selectedNode.selected = true;

        redrawCanvas();

        removeNodeButton.style.display = "block";
    }
    if(board.cellX != prevX || board.cellY != prevY){ // If dragging
        
        if(board.cellY <= selectedNode.parent.cellCoords.y || // Cannot be dragged in line or above parent
            (prevX < selectedNode.parent.cellCoords.x && board.cellX >= selectedNode.parent.cellCoords.x) || // Cannot be dragged across parent to become the opposing child
            (prevX > selectedNode.parent.cellCoords.x && board.cellX <= selectedNode.parent.cellCoords.x) ||
            (selectedNode.children.leftChild != null && (selectedNode.children.leftChild.cellCoords.x >= board.cellX || selectedNode.children.leftChild.cellCoords.y <= board.cellY)) || // keep its children to the left or right and below
            (selectedNode.children.rightChild != null && (selectedNode.children.rightChild.cellCoords.x <= board.cellX || selectedNode.children.rightChild.cellCoords.y <= board.cellY)) ||
            (prevX != selectedNode.cellCoords.x || prevY != selectedNode.cellCoords.y)) return; // If dragging doesn't start at a node
            
        selectedNode.cellCoords.x = board.cellX; // set new coordinates after dragging
        selectedNode.cellCoords.y = board.cellY;
        tree.nodes[board.cellY][board.cellX] = selectedNode; // Make the new transformed node selectable
        tree.nodes[prevY][prevX] = undefined; // Set previous spot to say there is no node at that spot.
        
        redrawCanvas();
        return;
    }
    else { // No node at the selected cell so place a child node
        if(!selectedNode) return; // No node selected

        if(board.cellX === selectedNode.cellCoords.x) return; // Don't allow child node to be in line with parent node
        if(board.cellY <= selectedNode.cellCoords.y) return; // Don't allow child node to be above or on the same level as parent node

        let newNodeValue;
        if(QuestionManager.currQuestion === bstQuestion) {
            newNodeValue = nodeValueInput.value;
            nodeValueInput.value = bstQuestion.getNextNodeValue();
        }
        else {
            newNodeValue = getNewNodeValue();
        }

        if(!newNodeValue) return; // newNodeValue is null

        if(board.cellX < selectedNode.cellCoords.x) { // Adding a left child
            if(selectedNode.children.leftChild) return; // Parent already has a left child

            tree.addChild(selectedNode, "left", Number(newNodeValue), board.cellX, board.cellY);
        }
        else { // Adding a right child
            if(selectedNode.children.rightChild) return; // Parent already has a right child

            tree.addChild(selectedNode, "right", Number(newNodeValue), board.cellX, board.cellY);
        }

        /** INCREASE SIZE OF BOARD */
        if(board.cellX === 0 || board.cellX === COLS - 1 || board.cellY === ROWS - 1) {
            if(board.canGrow()) {
                resizeBoard("grow");
            }
        }

        if(QuestionManager.currQuestion === traversalQuestion) {
            traversalQuestion.performTraversal();
        }
    }
}

function onBoardHover(event) {
    if(!tree) return;

    board.boardCoordsFromMouse(event);

    if(typeof tree.nodes[board.cellY][board.cellX] !== "undefined") { // There is a node in the hovered cell
        document.body.style.cursor = "pointer";
    }
    else if(selectedNode) { // No node in the hovered cell but an existing node is selected
        if(dragging == 1) { // No node in the hovered cell but an existing node is selected
            if(board.cellY <= selectedNode.parent.cellCoords.y || 
                (prevX < selectedNode.parent.cellCoords.x && board.cellX >= selectedNode.parent.cellCoords.x) || 
                (prevX > selectedNode.parent.cellCoords.x && board.cellX <= selectedNode.parent.cellCoords.x) ||
                (selectedNode.children.leftChild != null && (selectedNode.children.leftChild.cellCoords.x >= board.cellX || selectedNode.children.leftChild.cellCoords.y <= board.cellY)) ||
                (selectedNode.children.rightChild != null && (selectedNode.children.rightChild.cellCoords.x <= board.cellX || selectedNode.children.rightChild.cellCoords.y <= board.cellY))){
                document.body.style.cursor = "not-allowed";
            }
            else{
                document.body.style.cursor = "crosshair";
            }
        }
        else{
            if(board.cellX == selectedNode.cellCoords.x || board.cellY <= selectedNode.cellCoords.y ||
                (board.cellX < selectedNode.cellCoords.x && selectedNode.hasLeftChild()) ||
                    (board.cellX > selectedNode.cellCoords.x && selectedNode.hasRightChild())) { // Invalid cell to place new child

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

function onBoardExit() {
    document.body.style.cursor = "default";
}

function getNewNodeValue() {
    let newNodeValue = null;

    if(!randNodeValue) { // Set the node's value to the user specified input
        newNodeValue = nodeValueInput.value;

        if(newNodeValue === "" || Number(newNodeValue) < MIN_NODE_VALUE || Number(newNodeValue) > MAX_NODE_VALUE) {
            return;
        }
    }
    else { // Generate a random value for the node between MIN_NODE_VALUE and MAX_NODE_VALUE
        newNodeValue = Math.floor(Math.random() * (MAX_NODE_VALUE - MIN_NODE_VALUE) + MIN_NODE_VALUE);
    }

    return newNodeValue;
}

/** Dynamically resize the board if a cell is made on any edge */
function resizeBoard(direction) {
    if(direction === "grow") {
        ROWS += 2;
        COLS += 2;

        board = new Board();
        tree.remake(direction);
    }
    else if(direction === "shrink") {
        tree.remake(direction);

        ROWS -= 2;
        COLS -= 2;

        board = new Board();
    }

    redrawCanvas();
}
