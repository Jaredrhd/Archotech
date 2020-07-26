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

    /** Draws a node on the canvas */
    draw(board, parent, cellX, cellY) { 
        board.context.save();
        
        board.context.lineWidth = 2;
        board.context.beginPath();

        this._cellCoords.x = cellX;
        this._cellCoords.y = cellY;
        this._boardCoords = board.cellToBoardCoords(this._cellCoords.x, this._cellCoords.y);
        this._nodeRadius = board.cellWidth * 0.45;

        board.context.arc(this._boardCoords.x, this._boardCoords.y, this._nodeRadius, 0, 2*Math.PI); // Draw node circle

        let fontSize = String(Math.floor(Math.min(board.cellWidth, board.cellHeight)) / 2) + "px";

        board.context.font = fontSize + " Arial";
        board.context.textAlign = "center"; 
        board.context.textBaseline = "middle";
        board.context.fillText(this._value, this._boardCoords.x, this._boardCoords.y); // Draw node value

        if(this._selected) {
            board.context.strokeStyle = "red";
        }

        board.context.stroke();

        board.context.restore();

        if(parent !== null) { // Draw the connecting edge from the parent to the node
            let deltaX = Math.abs(this._parent.cellCoords.x - this._cellCoords.x);
            let deltaY = Math.abs(this._parent.cellCoords.y - this._cellCoords.y);

            /** Angles of the line from the centre of the child to the centre of the parent */
            let angleChild = Math.atan(deltaY / deltaX);
            let angleParent = Math.atan(deltaX / deltaY);

            if(this.childType() === "left") {
                angleChild = (360 * Math.PI / 180) - angleChild;
                angleParent = (90 * Math.PI / 180) + angleParent;
            }
            else {
                angleChild = Math.PI + angleChild;
                angleParent = (90 * Math.PI / 180) - angleParent;
            }

            board.context.save();

            board.context.lineWidth = 2;
            board.context.beginPath();

            /** Calculate the end points of the edge on the nodes' circumferences (x = cx + r*cos(angle), y = cy + r*sin(angle)) */
            board.context.moveTo(this._nodeRadius*Math.cos(angleParent) + this._parent.boardCoords.x, this._nodeRadius*Math.sin(angleParent) +  this._parent.boardCoords.y);
            board.context.lineTo(this._nodeRadius*Math.cos(angleChild) + this._boardCoords.x, this._nodeRadius*Math.sin(angleChild) + this._boardCoords.y);

            board.context.stroke();

            board.context.restore();
        }
    }

    childType() {
        if(this.isRoot) return;

        if(this.parent.children.leftChild === this) {
            return "left";
        }
        else {
            return "right";
        }
    }

    hasLeftChild() {
        return this._children.leftChild !== null;
    }

    hasRightChild() {
        return this._children.rightChild !== null;
    }

    isLeaf() {
        return this._children.leftChild === null && this._children.rightChild === null;
    }
}