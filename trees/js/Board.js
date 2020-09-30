class Board {
    constructor(main) {
        this.main = main;

        this.cellWidth = this.main.canvas.width / this.main.COLS;
        this.cellHeight = this.main.canvas.height / this.main.ROWS;
        this.halfCellDiagonalLength = Math.sqrt(Math.pow(this.cellWidth, 2) + Math.pow(this.cellWidth, 2)) / 2;
        this.mouseX;
        this.mouseY;
        this.cellX;
        this.cellY;
        this.selectedBoardCoords = {x: null, y: null};
        this.canvasPixels;
    }

    drawGrid() {
        for(let i = 1; i < this.main.ROWS; i++) {
            this.main.context.save();

            this.main.context.lineWidth = this.main.boardThickness;
            this.main.context.globalAlpha = 0.125;
            this.main.context.setLineDash([2, 3]);
            this.main.context.beginPath();
            this.main.context.moveTo(0, this.cellHeight * i);
            this.main.context.lineTo(this.main.canvasWidth, this.cellHeight * i);
            this.main.context.stroke();

            this.main.context.restore();
        }

        for(let j = 1; j < this.main.COLS; j++) {
            this.main.context.save();

            this.main.context.lineWidth = this.main.boardThickness;
            this.main.context.globalAlpha = 0.125;
            this.main.context.setLineDash([2, 3]);
            this.main.context.beginPath();
            this.main.context.moveTo(this.cellWidth * j, 0);
            this.main.context.lineTo(this.cellWidth * j, this.main.canvasHeight);
            this.main.context.stroke();

            this.main.context.restore();
        }
    }

    recalculateCellDimensions() {        
        this.cellWidth = this.main.canvasWidth / this.main.COLS;
        this.cellHeight = this.main.canvasHeight / this.main.ROWS;
    }

    canGrow() {
        return this.main.ROWS < 25 && this.main.COLS < 25;
    }

    canShrink() {
        if(this.main.ROWS === 13 && this.main.COLS === 13) return false;

        for(let i = 0; i < this.main.ROWS; i++) {
            for(let j = 0; j < this.main.COLS; j++) {
                if(j < 2 || j > this.main.COLS - 3 || i > this.main.ROWS - 4) {
                    if(typeof this.main.tree.nodes[i][j] !== "undefined") return false;
                }
            }
        }

        return true;
    }

    getCellCornerBoardCoords(cellCentreBoardCoords) {
        return {top_left: {x: cellCentreBoardCoords.x - this.cellWidth / 2, y: cellCentreBoardCoords.y - this.cellHeight / 2}, 
                top_right: {x: cellCentreBoardCoords.x + this.cellWidth / 2, y: cellCentreBoardCoords.y - this.cellHeight / 2}, 
                bottom_left: {x: cellCentreBoardCoords.x - this.cellWidth / 2, y: cellCentreBoardCoords.y + this.cellHeight / 2}, 
                bottom_right: {x: cellCentreBoardCoords.x + this.cellWidth / 2, y: cellCentreBoardCoords.y + this.cellHeight / 2}};
    }

    cellToBoardCoords(cellX, cellY) {
        return {x: (cellX * this.cellWidth) + this.cellWidth * 0.5, 
                    y: (cellY * this.cellHeight) + this.cellHeight * 0.5};
    }

    boardCoordsFromMouse(event) {
        this.canvasPixels = this.main.canvas.getBoundingClientRect(); // Size of canvas in CSS pixels
        
        this.mouseX = event.clientX - this.canvasPixels.left;
        this.mouseY = event.clientY - this.canvasPixels.top;

        this.cellX = Math.floor(this.mouseX / this.cellWidth);
        this.cellY = Math.floor(this.mouseY / this.cellHeight);

        /** Correct for any out of bounds cell coordinates */
        this.cellX = this.cellX < 0 ? 0 : (this.cellX >= this.main.COLS ? this.cellX - 1 : this.cellX);
        this.cellY = this.cellY < 0 ? 0 : (this.cellY >= this.main.ROWS ? this.cellY - 1 : this.cellY);

        this.selectedBoardCoords.x = (this.cellX * this.cellWidth) + this.cellWidth * 0.5;
        this.selectedBoardCoords.y = (this.cellY * this.cellHeight) + this.cellHeight * 0.5;
    }
}