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
        this.properties = {required: false, hasAllProperties: false, correct: true};
    }

    /** Draws a node on the canvas */
    draw(parent, cellX, cellY) { 
        this.main.context.save();

        this.main.context.lineWidth = this.main.nodeThickness;
        this.main.context.beginPath();

        this.cellCoords.x = cellX;
        this.cellCoords.y = cellY;
        this.boardCoords = this.main.board.cellToBoardCoords(this.cellCoords.x, this.cellCoords.y);
        this.nodeRadius = this.main.board.cellWidth * 0.45;

        this.main.context.arc(this.boardCoords.x, this.boardCoords.y, this.nodeRadius, 0, 2*Math.PI); // Draw node circle

        if(!this.main.databaseMisc.lecturer) {
            if(this.main.databaseMisc.qtype === this.main.qTypes.PROPERTIES && this.properties.required) {
                this.main.context.save();

                if(this.main.databaseMisc.propertiescorrectness !== "") { // Showing the student whether they are correct or not
                    if(this.properties.correct) {
                        this.main.context.fillStyle = "#a0eca5";
                    }
                    else {
                        this.main.context.fillStyle = "#f0afaa";
                    }

                    this.main.context.fill();
                }
                else if(this.properties.hasAllProperties) { // During the attempt, if the student has entered values for all requested node properties for this node on a properties question
                    this.main.context.globalAlpha = 0.55;
                    this.main.context.fillStyle = "#4ccaf3";
                    this.main.context.fill();
                }
                else { // Student hasn't entered values for all requested node properties for this required node
                    this.main.context.fillStyle = "#fcdb73";
                    this.main.context.fill();
                }

                this.main.context.restore();
            }
        }
        else {
            if(this.main.setup && this.main.setup.currQuestion.PROPERTIES && this.properties.required) {
                this.main.context.save();

                this.main.context.fillStyle = "#fcdb73";
    
                this.main.context.fill();
                this.main.context.restore();
            }
        }

        let fontSize = Math.floor(this.main.board.cellWidth / 2) + "px";

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

    /**
     * Draws the outline of a node when it is being dragged. lastValidCellCoords is non-null when the user is dragging in an invalid cell
     * @param {object} lastValidCellCoords The cell coordinates of the last valid
     */
    drawOutline(lastValidCellCoords) {
        this.main.context.save();

        this.main.context.lineWidth = this.main.nodeThickness;
        this.main.context.setLineDash([3, 3]);

        this.main.context.beginPath();

        let cellCoords;
        if(lastValidCellCoords) { // Draw the node outline in the last valid cell
            this.main.context.globalAlpha = 0.3;
            cellCoords = {x: lastValidCellCoords.x, y: lastValidCellCoords.y};
        }
        else { // Draw the node outline in the cell that the user is dragging over
            cellCoords = {x: this.main.board.cellX, y: this.main.board.cellY};
        }
        let boardCoords = this.main.board.cellToBoardCoords(cellCoords.x, cellCoords.y);
        
        this.main.context.arc(boardCoords.x, boardCoords.y, this.nodeRadius, 0, 2*Math.PI); // Draw node outline
        this.main.context.stroke();

        this.drawEdge(this.parent.boardCoords, boardCoords, this.parent.cellCoords, cellCoords.x, cellCoords.y, this);

        if(this.hasLeftChild()) {
            this.drawEdge(boardCoords, this.children.leftChild.boardCoords, cellCoords, this.children.leftChild.cellCoords.x, this.children.leftChild.cellCoords.y, this.children.leftChild);
        }
        if(this.hasRightChild()) {
            this.drawEdge(boardCoords, this.children.rightChild.boardCoords, cellCoords, this.children.rightChild.cellCoords.x, this.children.rightChild.cellCoords.y, this.children.rightChild);
        }

        this.main.context.restore();

        return cellCoords;
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

        this.main.context.lineWidth = this.main.nodeThickness;
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