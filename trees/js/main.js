onload = init;

/** HTML ELEMENTS */
{
var modifyTreeTools = document.getElementById("modify-tree-tools");
var answerQuestionTools = document.getElementById("answer-question-tools");
var nodeValueInput = document.getElementById("node-value");
// var nodeValueInputTool = document.getElementById("node-value-tool");
var randNodeValueCheckbox = document.getElementById("random-node-value");
// var randNodeValueCheckboxTool = document.getElementById("random-node-value-tool");
var addRootButton = document.getElementById("add-root");
var removeNodeButton = document.getElementById("remove-node");
var editNodeValueButton = document.getElementById("edit-node");
var qType = document.getElementById("q_type");
var preOrder = document.getElementById("preorder");
var inOrder = document.getElementById("inorder");
var postOrder = document.getElementById("postorder");
/** Holds the BST data to display to student */
var bstValues = document.getElementById("bstvalues");
var lecturerTree = document.getElementById("lecturer_tree");
var studentTree = document.getElementById("student_tree")
/** The list of BST values shown to the student and lecturer */
var bstValueList = document.getElementById("bst-values");
var answerID = document.getElementById("ANSWER_ID");
}

/** BOARD MISC */
{
var canvas;
var context;
var board;
}

/** Question setup object. Will be non-null if the lecturer is creating a question */
var setup = null;
/** Question attempt object. Will be non-null if the student is answering a question */
var attempt = null;

var qTypes = {TRAVERSAL: "traversal", BST: "bst"};

var ROWS = 13;
var COLS = 13;

let tree = null;
let selectedNode = null;

/** DRAGGING */
var prevX, prevY, dragging = false;

var MAX_NODE_VALUE = 99;
var MIN_NODE_VALUE = 1;

/** Boolean indicating whether a new node's value should be taken from user input or randomised */
let randNodeValue = false;

function init() {
    canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
        document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
        return;
    }

    context = canvas.getContext("2d");

    board = new Board();
    board.drawGrid();

    initListeners();

    if(lecturer) {
        setup = new QuestionSetup();
    }
    else {
        attempt = new QuestionAttempt();
    }
}

function redrawCanvas() {
    context.save();

    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.restore();

    /** Redraw the tree */
    for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLS; j++) {
            if(typeof tree.nodes[i][j] !== "undefined") {
                tree.nodes[i][j].draw(tree.nodes[i][j].parent, tree.nodes[i][j].cellCoords.x, tree.nodes[i][j].cellCoords.y);
            }
        }
    }

    board.drawGrid();
}

function initListeners() {
    /** CANVAS */
    canvas.addEventListener("click", onBoardClick);
    canvas.addEventListener("mousemove", onBoardHover);
    canvas.addEventListener("mouseleave", onBoardExit);

    if(!lecturer && studentQType === qTypes.TRAVERSAL) return;

    canvas.addEventListener("mousedown", beginDrag);
    document.addEventListener("mouseup", exitDrag);

    randNodeValueCheckbox.addEventListener("change", randNodeValueChecked);
    addRootButton.addEventListener("click", addRoot);
    removeNodeButton.addEventListener("click", removeNodeAndChildren);
    editNodeValueButton.addEventListener("click", editNodeValue);
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

    if(studentQType === qTypes.BST) {
        newNodeValue = Number(nodeValueInput.value);
        nodeValueInput.value = attempt.bst.values[attempt.bst.getIndex("next")];
        attempt.bst.undoButton.style.display = "block";
    }
    else {
        newNodeValue = getNewNodeValue();
    }

    if(!newNodeValue) return; // newNodeValue is null

    if(!tree) { // Tree doesn't exist
        tree = new Tree(newNodeValue);
    }
    else { // Tree instance already exists - will be true if the root node was removed
        tree.setNewRoot(newNodeValue);
    }

    addRootButton.style.display = "none";

    if(lecturer) {
        setup.handleEvent(setup.events.ADDROOT);
    }
    else {
        // if(studentQType === qTypes.BST) {
        //     attempt.handleEvent(attempt.events.ADDROOT);
        // }
    }

    if(studentQType === qTypes.BST) {
        attempt.bst.stack.push(tree.root);
        tree.inOrderTraversal(tree.root);
        answerID.value = "";
        answerID.value = tree.inOrder;
        tree.inOrder = "";
        attempt.handleEvent(attempt.events.ADDROOT);
    }
}

function removeNodeAndChildren() {
    tree.removeNodeAndChildren(selectedNode);
    
    if(selectedNode.isRoot) {
        addRootButton.style.display = "block";
    }
    
    while(board.canShrink()) {
        resizeBoard("shrink");
    }
    
    redrawCanvas();
    
    selectedNode = null;
    removeNodeButton.style.display = "none";
    editNodeValueButton.style.display = "none";

    if(lecturer) {
        setup.handleEvent(setup.events.REMOVENODE);
    }
}

function editNodeValue(){
    let newNodeValue = getNewNodeValue();

    if(!newNodeValue) return; // newNodeValue is null
    
    if(!selectedNode) return; // There is no node selected
        
    selectedNode.value = newNodeValue;

    redrawCanvas();
}

function beginDrag(event){
    board.boardCoordsFromMouse(event);
    
    dragging = true;
    prevX = board.cellX;
    prevY = board.cellY;
}

function exitDrag() {
    if(!tree) return;

    if(dragging) {
        dragging = false;
        redrawCanvas();
    }
}

function onBoardClick(event) {
    if(!tree) return;

    board.boardCoordsFromMouse(event); 

    if(typeof tree.nodes[board.cellY][board.cellX] !== "undefined") { // There is a node at the selected cell
        if(tree.nodes[board.cellY][board.cellX] == selectedNode) { // If the current selected node is selected again
            selectedNode.selected = false;
            selectedNode = null;
            redrawCanvas();
            removeNodeButton.style.display = "none";
            editNodeValueButton.style.display = "none";
            return;
        }
        if(selectedNode !== null) { // A new node is selected so set the current selected node's property to false
            selectedNode.selected = false;
        }

        selectedNode = tree.nodes[board.cellY][board.cellX];

        selectedNode.selected = true;

        redrawCanvas();

        if(studentQType !== qTypes.BST) { // Student can't edit node values or remove nodes in BST question (can only undo)
            editNodeValueButton.style.display = "block";
            removeNodeButton.style.display = "block";
        }
    }
    else if(board.cellX != prevX || board.cellY != prevY){ // If dragging
        if(canDrag()) {
            selectedNode.cellCoords.x = board.cellX; // Set new coordinates after dragging
            selectedNode.cellCoords.y = board.cellY;
            tree.nodes[board.cellY][board.cellX] = selectedNode; // Make the new transformed node selectable
            tree.nodes[prevY][prevX] = undefined; // Set previous spot to say there is no node at that spot

            if(board.cellX === 0 || board.cellX === COLS - 1 || board.cellY === ROWS - 1) {
                if(board.canGrow()) {
                    resizeBoard("grow");
                }
                else {
                    redrawCanvas();
                }
            }
            else if(board.canShrink()) {
                while(board.canShrink()) {
                    resizeBoard("shrink");
                }
            }
            else {
                redrawCanvas();
            }
        }
        else {
            return;
        }

        if(lecturer) {
            setup.handleEvent(setup.events.DRAG);
        }
        else {
            if(studentQType === qTypes.BST) {
                attempt.handleEvent(attempt.events.DRAG);
            }
        }
    }
    else { // No node at the selected cell so place a child node
        if(!selectedNode) return; // No node selected

        if(board.cellX === selectedNode.cellCoords.x) return; // Don't allow child node to be in line with parent node
        if(board.cellY <= selectedNode.cellCoords.y) return; // Don't allow child node to be above or on the same level as parent node
        if(board.cellX < selectedNode.cellCoords.x && selectedNode.hasLeftChild()) return; // Parent already has a left child
        if(board.cellX > selectedNode.cellCoords.x && selectedNode.hasRightChild()) return; // Parent already has a right child

        let newNodeValue;
        if(studentQType === qTypes.BST) {
            newNodeValue = Number(nodeValueInput.value);
            nodeValueInput.value = attempt.bst.values[attempt.bst.getIndex("next")]; // The index will be attempt.bst.values.length + 1 after adding the final BST value (i.e. nodeValueInput will be an empty string)
        }
        else {
            newNodeValue = getNewNodeValue();
        }

        if(!newNodeValue) return; // newNodeValue is null

        if(board.cellX < selectedNode.cellCoords.x) { // Adding a left child
            tree.addChild(selectedNode, "L", newNodeValue, board.cellX, board.cellY);
        }
        else { // Adding a right child
            tree.addChild(selectedNode, "R", newNodeValue, board.cellX, board.cellY);
        }

        /** INCREASE SIZE OF BOARD */
        if(board.cellX === 0 || board.cellX === COLS - 1 || board.cellY === ROWS - 1) {
            if(board.canGrow()) {
                resizeBoard("grow");
            }
        }

        if(lecturer) {
            setup.handleEvent(setup.events.ADDCHILD);
        }
        else {
            // if(studentQType === qTypes.BST) {
            //     attempt.handleEvent(attempt.events.ADDCHILD);
            //     attempt.bst.stack.push(tree.getNode(Number(newNodeValue)));
            // }
        }

        if(studentQType === qTypes.BST) {
            attempt.bst.stack.push(tree.getNode(Number(newNodeValue)));
            tree.inOrderTraversal(tree.root);
            answerID.value = "";
            answerID.value = tree.inOrder;
            tree.inOrder = "";
            attempt.handleEvent(attempt.events.ADDCHILD);
        }
    }
}

function onBoardHover(event) {
    if(!tree) return;

    board.boardCoordsFromMouse(event);

    if(typeof tree.nodes[board.cellY][board.cellX] !== "undefined") { // There is a node in the hovered cell
        document.body.style.cursor = "pointer";
    }
    else if(!lecturer && studentQType === "traversal") {
        document.body.style.cursor = "default";
        return;
    }
    else if(selectedNode) { // No node in the hovered cell but an existing node is selected
        if(dragging) { 
            if(canDrag()) {
                redrawCanvas();
                selectedNode.drawOutline();
                document.body.style.cursor = "move";
            }
            else {
                redrawCanvas();
                document.body.style.cursor = "not-allowed";
            }
        }
        else{
            if(board.cellX == selectedNode.cellCoords.x || board.cellY <= selectedNode.cellCoords.y ||
                (board.cellX < selectedNode.cellCoords.x && selectedNode.hasLeftChild()) ||
                    (board.cellX > selectedNode.cellCoords.x && selectedNode.hasRightChild()) ||
                    (studentQType === qTypes.BST && attempt.bst.stack.length === attempt.bst.values.length)) { // Invalid cell to place new child

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

    return Number(newNodeValue);
}

/** Checks whether a node can be dragged to the required position on the board */
function canDrag() {
    if(!selectedNode) return false; // Cannot drag a node without selecting it

    if(selectedNode.isRoot) return false; // Cannot drag the root

    if(board.cellY <= selectedNode.parent.cellCoords.y || // Cannot be dragged in line or above parent
        (prevX < selectedNode.parent.cellCoords.x && board.cellX >= selectedNode.parent.cellCoords.x) || // Cannot be dragged across parent to become the opposing child
        (prevX > selectedNode.parent.cellCoords.x && board.cellX <= selectedNode.parent.cellCoords.x) ||
        (selectedNode.children.leftChild != null && (selectedNode.children.leftChild.cellCoords.x >= board.cellX || selectedNode.children.leftChild.cellCoords.y <= board.cellY)) || // Keep its children to the left or right and below
        (selectedNode.children.rightChild != null && (selectedNode.children.rightChild.cellCoords.x <= board.cellX || selectedNode.children.rightChild.cellCoords.y <= board.cellY)) ||
        (prevX != selectedNode.cellCoords.x || prevY != selectedNode.cellCoords.y)) return false; // If dragging doesn't start at a node
    
    return true;
}

/** Dynamically resize the board if a cell is made on any edge or there is adequate space to shrink */
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

function buildTreeFromString(string) {
    let temp = string;
    let tempArr = temp.split("#");

    let node = tempArr[0].split(":");
    let boardDimensions = node[0].split(",");
    ROWS = Number(boardDimensions[0]);
    COLS = Number(boardDimensions[1]);
    let nodeValue = Number(node[1]);

    board = new Board(); 
    tree = new Tree(nodeValue);

    tempArr.shift();
    
    while(tempArr.length !== 0) {
        if(tempArr[0] === "") break;

        let node = tempArr[0].split(":");

        let nodeValue = Number(node[0]);
        let childPos = node[1].split(".");
        let nodeCoords = node[2].split(",");

        let nodeX = Number(nodeCoords[1]);
        let nodeY = Number(nodeCoords[0]);

        let newNode = tree.root;

        for(let i = 0; i < childPos.length; i++) {
            if(childPos[i] === "L") {
                if(!newNode.children.leftChild) { // Reached correct position of child
                    tree.addChild(newNode, "L", nodeValue, nodeX, nodeY);
                }
                else {
                    newNode = newNode.children.leftChild;
                }
            }      
            else {
                if(!newNode.children.rightChild) {
                    tree.addChild(newNode, "R", nodeValue, nodeX, nodeY);
                }
                else {
                    newNode = newNode.children.rightChild;
                }
            }
        }

        tempArr.shift();
    }

    redrawCanvas();
}