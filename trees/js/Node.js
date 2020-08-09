class Node {
    constructor(value, root = true) {
        this._value = value;
        this._isRoot = root;
        this._cellCoords = {x: null, y: null};
        this._boardCoords = null;
        this._nodeRadius = 0;
        this._selected = false;
        this._parent = null;
        this._children = {leftChild: null, rightChild: null};
    }

    get value() {
        return this._value;
    }
    
    get isRoot() {
        return this._isRoot;
    }

    get cellCoords() {
        return this._cellCoords;
    }

    get boardCoords() {
        return this._boardCoords;
    }

    get nodeRadius() {
        return this._nodeRadius;
    }

    get selected() {
        return this._selected;
    }

    get parent() {
        return this._parent;
    }

    get children() {
        return this._children;
    }

    set selected(value) {
        this._selected = value;
    }
    
    set parent(node) {
        this._parent = node;
    }

    set value(value){ // value setter for editting node values
        this._value = value;
    }

    set cellCoords(value){
        this._cellCoords = value;
    }
    
    set boardCoords(value) {
        this._boardCoords = value;
    }

    set nodeRadius(value) {
        this._nodeRadius = value;
    }

    /** Draws a node on the canvas */
    draw(parent, cellX, cellY) { 
        context.save();
        
        context.lineWidth = 2;
        context.beginPath();

        this.cellCoords.x = cellX;
        this.cellCoords.y = cellY;
        this.boardCoords = board.cellToBoardCoords(this.cellCoords.x, this.cellCoords.y);
        this.nodeRadius = board.cellWidth * 0.45;

        context.arc(this.boardCoords.x, this.boardCoords.y, this.nodeRadius, 0, 2*Math.PI); // Draw node circle

        let fontSize = String(Math.floor(Math.min(board.cellWidth, board.cellHeight)) / 2) + "px";

        context.font = fontSize + " Arial";
        context.textAlign = "center"; 
        context.textBaseline = "middle";
        context.fillText(this.value, this.boardCoords.x, this.boardCoords.y); // Draw node value

        if(this.selected) {
            context.strokeStyle = "red";
        }

        context.stroke();

        context.restore();

        if(parent !== null) { // Draw the connecting edge from the parent to the node
            this.drawEdge(parent.boardCoords, this.boardCoords, parent.cellCoords, this.cellCoords.x, this.cellCoords.y, this);
        }
    }

    drawOutline() {
        context.save();

        context.lineWidth = 2;
        context.setLineDash([3, 3]);

        context.beginPath();

        let cellCoords = {x: board.cellX, y: board.cellY};
        let boardCoords = board.cellToBoardCoords(board.cellX, board.cellY);
        
        context.arc(boardCoords.x, boardCoords.y, this.nodeRadius, 0, 2*Math.PI); // Draw node outline

        context.stroke();

        this.drawEdge(this.parent.boardCoords, boardCoords, this.parent.cellCoords, board.cellX, board.cellY, this);

        if(this.hasLeftChild()) {
            this.drawEdge(boardCoords, this.children.leftChild.boardCoords, cellCoords, this.children.leftChild.cellCoords.x, this.children.leftChild.cellCoords.y, this.children.leftChild);
        }
        if(this.hasRightChild()) {
            this.drawEdge(boardCoords, this.children.rightChild.boardCoords, cellCoords, this.children.rightChild.cellCoords.x, this.children.rightChild.cellCoords.y, this.children.rightChild);
        }

        context.restore();
    }

    drawEdge(parentBoardCoords, childBoardCoords, parentCellCoords, cellX, cellY, child) {
        let deltaX = Math.abs(parentCellCoords.x - cellX);
        let deltaY = Math.abs(parentCellCoords.y - cellY);

        /** Angles of the line from the centre of the child to the centre of the parent */
        let angleChild = Math.atan(deltaY / deltaX);
        let angleParent = Math.atan(deltaX / deltaY);

        if(child.childType() === "L") {
            angleChild = (360 * Math.PI / 180) - angleChild;
            angleParent = (90 * Math.PI / 180) + angleParent;
        }
        else {
            angleChild = Math.PI + angleChild;
            angleParent = (90 * Math.PI / 180) - angleParent;
        }

        context.save();

        context.lineWidth = 2;
        context.beginPath();

        /** Calculate the end points of the edge on the nodes' circumferences (x = cx + r*cos(angle), y = cy + r*sin(angle)) */
        context.moveTo(this.nodeRadius*Math.cos(angleParent) + parentBoardCoords.x, this.nodeRadius*Math.sin(angleParent) + parentBoardCoords.y);
        context.lineTo(this.nodeRadius*Math.cos(angleChild) + childBoardCoords.x, this.nodeRadius*Math.sin(angleChild) + childBoardCoords.y);

        context.stroke();

        context.restore();
    }

    childType() {
        if(this.isRoot) return;

        if(this.parent.children.leftChild === this) {
            return "L";
        }
        else {
            return "R";
        }
    }

    hasLeftChild() {
        return this.children.leftChild !== null;
    }

    hasRightChild() {
        return this.children.rightChild !== null;
    }

    isLeaf() {
        return this.children.leftChild === null && this.children.rightChild === null;
    }
}