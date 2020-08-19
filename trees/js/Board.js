import {tree, canvas, context, ROWS, COLS} from "./main.js";

class Board {
    constructor() {
        this._cellWidth = canvas.width / COLS;
        this._cellHeight = canvas.height / ROWS;
        this._mouseX;
        this._mouseY;
        this._cellX;
        this._cellY;
        this._selectedBoardCoords = {x: null, y: null};
        this._canvasPixels;
    }

    get cellWidth() {
        return this._cellWidth;
    }

    get cellHeight() {
        return this._cellHeight;
    }

    get cellX() {
        return this._cellX;
    }

    get cellY() {
        return this._cellY;
    }

    get selectedBoardCoords() {
        return this._selectedBoardCoords;
    }

    set cellX(value) {
        this._cellX = value;
    }

    set cellY(value) {
        this._cellY = value;
    }

    drawGrid() {
        for(let i = 1; i < ROWS; i++) {
            context.save();

            context.lineWidth = 2;
            context.globalAlpha = 0.2;
            context.setLineDash([2, 3]);
            context.beginPath();
            context.moveTo(0, this.cellHeight * i);
            context.lineTo(canvas.width, this.cellHeight * i);
            context.stroke();

            context.restore();
        }

        for(let j = 1; j < COLS; j++) {
            context.save();

            context.lineWidth = 2;
            context.globalAlpha = 0.2;
            context.setLineDash([2, 3]);
            context.beginPath();
            context.moveTo(this.cellWidth * j, 0);
            context.lineTo(this.cellWidth * j, canvas.height);
            context.stroke();

            context.restore();
        }
    }

    canGrow() {
        return ROWS < 25 && COLS < 25;
    }

    canShrink() {
        if(ROWS === 13 && COLS === 13) return false;

        for(let i = 0; i < ROWS; i++) {
            for(let j = 0; j < COLS; j++) {
                if(j < 2 || j > COLS - 3 || i > ROWS - 4) {
                    if(typeof tree.nodes[i][j] !== "undefined") return false;
                }
            }
        }

        return true;
    }

    cellToBoardCoords(cellX, cellY) {
        return {x: (cellX * this.cellWidth) + this.cellWidth * 0.5, 
                    y: (cellY * this.cellHeight) + this.cellHeight * 0.5};
    }

    boardCoordsFromMouse(event) {
        this._canvasPixels = canvas.getBoundingClientRect(); // Size of canvas in CSS pixels
        
        this._mouseX = event.clientX - this._canvasPixels.left;
        this._mouseY = event.clientY - this._canvasPixels.top;

        this.cellX = Math.floor(this._mouseX / this.cellWidth);
        this.cellY = Math.floor(this._mouseY / this.cellHeight);

        this.selectedBoardCoords.x = (this.cellX * this.cellWidth) + this.cellWidth * 0.5;
        this.selectedBoardCoords.y = (this.cellY * this.cellHeight) + this.cellHeight * 0.5;
    }
}

export default Board;