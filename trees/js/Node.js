class Node {
    constructor(main, value, root = true) {
        this.main = main;

        this.value = value;
        this.isRoot = root;
        this.cellCoords = {x: null, y: null};
        this.boardCoords = null;
        this.nodeRadius = 0;
        this.selected = false;
        this.parent = null;
        this.children = {leftChild: null, rightChild: null};
        this.orderPlaced;
    }

    /** Draws a node on the canvas */
    draw(parent, cellX, cellY) { 
        this.main.context.save();
        
        this.main.context.lineWidth = 2;
        this.main.context.beginPath();

        this.cellCoords.x = cellX;
        this.cellCoords.y = cellY;
        this.boardCoords = this.main.board.cellToBoardCoords(this.cellCoords.x, this.cellCoords.y);
        this.nodeRadius = this.main.board.cellWidth * 0.45;

        this.main.context.arc(this.boardCoords.x, this.boardCoords.y, this.nodeRadius, 0, 2*Math.PI); // Draw node circle

        let fontSize = String(Math.floor(Math.min(this.main.board.cellWidth, this.main.board.cellHeight)) / 2) + "px";

        this.main.context.font = fontSize + " Arial";
        this.main.context.textAlign = "center"; 
        this.main.context.textBaseline = "middle";
        this.main.context.fillText(this.value, this.boardCoords.x, this.boardCoords.y); // Draw node value

        if(this.selected) {
            this.main.context.strokeStyle = "red";
        }

        this.main.context.stroke();

        this.main.context.restore();

        if(parent !== null) { // Draw the connecting edge from the parent to the node
            this.drawEdge(parent.boardCoords, this.boardCoords, parent.cellCoords, this.cellCoords.x, this.cellCoords.y, this);
        }
    }

    drawOutline() {
        this.main.context.save();

        this.main.context.lineWidth = 2;
        this.main.context.setLineDash([3, 3]);

        this.main.context.beginPath();

        let cellCoords = {x: this.main.board.cellX, y: this.main.board.cellY};
        let boardCoords = this.main.board.cellToBoardCoords(this.main.board.cellX, this.main.board.cellY);
        
        this.main.context.arc(boardCoords.x, boardCoords.y, this.nodeRadius, 0, 2*Math.PI); // Draw node outline

        this.main.context.stroke();

        this.drawEdge(this.parent.boardCoords, boardCoords, this.parent.cellCoords, this.main.board.cellX, this.main.board.cellY, this);

        if(this.hasLeftChild()) {
            this.drawEdge(boardCoords, this.children.leftChild.boardCoords, cellCoords, this.children.leftChild.cellCoords.x, this.children.leftChild.cellCoords.y, this.children.leftChild);
        }
        if(this.hasRightChild()) {
            this.drawEdge(boardCoords, this.children.rightChild.boardCoords, cellCoords, this.children.rightChild.cellCoords.x, this.children.rightChild.cellCoords.y, this.children.rightChild);
        }

        this.main.context.restore();
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

        this.main.context.save();

        this.main.context.lineWidth = 2;
        this.main.context.beginPath();

        /** Calculate the end points of the edge on the nodes' circumferences (x = cx + r*cos(angle), y = cy + r*sin(angle)) */
        this.main.context.moveTo(this.nodeRadius*Math.cos(angleParent) + parentBoardCoords.x, this.nodeRadius*Math.sin(angleParent) + parentBoardCoords.y);
        this.main.context.lineTo(this.nodeRadius*Math.cos(angleChild) + childBoardCoords.x, this.nodeRadius*Math.sin(angleChild) + childBoardCoords.y);

        this.main.context.stroke();

        this.main.context.restore();
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