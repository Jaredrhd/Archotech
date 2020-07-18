class Board {
    constructor(canvas, context, rows, columns) {
        this._canvas = canvas;
        this._context = context;
        this._rows = rows;
        this._columns = columns;
        this._cellWidth = canvas.width / columns;
        this._cellHeight = canvas.height / rows;
        this._mouseX;
        this._mouseY;
        this._cellX;
        this._cellY;
        this._selectedBoardCoords = {x: null, y: null};
        this._canvasPixels;
    }

    get canvas() {
        return this._canvas;
    }

    get context() {
        return this._context;
    }

    get rows() {
        return this._rows;
    }

    get columns() { 
        return this._columns;
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

    drawGrid() {
        for(let i = 1; i < this._rows; i++) {
            this._context.save();
            this._context.lineWidth = 2;
            this._context.globalAlpha = 0.2
            this._context.setLineDash([2, 3]);
            this._context.beginPath();
            this._context.moveTo(0, this._cellHeight * i);
            this._context.lineTo(this._canvas.width, this._cellHeight * i);
            this._context.stroke();
            this._context.restore();
        }

        for(let j = 1; j < this._columns; j++) {
            this._context.save();
            this._context.lineWidth = 2;
            this._context.globalAlpha = 0.2
            this._context.setLineDash([2, 3]);
            this._context.beginPath();
            this._context.moveTo(this._cellWidth * j, 0);
            this._context.lineTo(this._cellWidth * j, this._canvas.height);
            this._context.stroke();
            this._context.restore();
        }
    }

    cellToBoardCoords(cellX, cellY) {
        return {x: (cellX * this._cellWidth) + this._cellWidth * 0.5, 
                    y: (cellY * this._cellHeight) + this._cellHeight * 0.5};
    }

    boardCoordsFromMouse(event) {
        this._canvasPixels = this._canvas.getBoundingClientRect(); // Size of canvas in CSS pixels
        
        this._mouseX = event.clientX - this._canvasPixels.left;
        this._mouseY = event.clientY - this._canvasPixels.top;

        this._cellX = Math.floor(this._mouseX / this._cellWidth);
        this._cellY = Math.floor(this._mouseY / this._cellHeight);

        this._selectedBoardCoords.x = (this._cellX * this._cellWidth) + this._cellWidth * 0.5;
        this._selectedBoardCoords.y = (this._cellY * this._cellHeight) + this._cellHeight * 0.5;
    }
}