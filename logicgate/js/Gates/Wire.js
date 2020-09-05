class Wire extends LogicGate
{
    constructor(pos, parent, parentOffset = {x:0,y:0})
    {
        super(pos);
        this.parentOffset = parentOffset;
        this.parent = parent;
        this.connectionTo;
        this.selectable = false;
        this.mousePos;
    }

    //Updates the connectionTo with the incoming gate
    UpdateConnection(gate)
    {
        this.connectionTo = gate;
    }

    Draw(graphics)
    {
        //If we don't have a gate or a mouse pos don't draw
        if(this.connectionTo == null && this.mousePos == null)
            return;

        //Make sure the wire has a parent to track
        if(this.parent != null && this.parentOffset != null)
        {
            this.pos.x = this.parentOffset.x + this.parent.pos.x;
            this.pos.y = this.parentOffset.y + this.parent.pos.y;
        }

        //Save
        graphics.save();

        //Begin Draw
        graphics.beginPath();
        graphics.moveTo(this.pos.x, this.pos.y);

        //Initialize
        let bends = 2;
        let horizontalDistance = 0, verticalDistance = 0;

        //calculate distances
        let distances = (this.connectionTo == null) ? super.GetXYDistanceToPoint(this.mousePos) : super.GetXYDistanceToPoint(this.connectionTo.pos);
        
        //ADD this if you want to set a dynamic number of bends
        //Set bends based on distance
        // let manhattanDistance = Math.abs(distances.y) + Math.abs(distances.x);
        // if(Math.abs(distances.x) < 1 || Math.abs(distances.y) < 1)
        //     bends = 2
        // else if(manhattanDistance > 12)
        //     bends = 4;
        // else if(manhattanDistance > 6)
        //     bends = 3;

        //Calculate the number of horizontal distances or vertical distances based on the number of bends
        horizontalDistance = (bends % 2 == 0) ? distances.x/(bends/2) : distances.x/((bends-1)/2);
        verticalDistance = (bends % 2 == 0) ? distances.y/(bends/2) : distances.y/((bends+1)/2);

        //Start at gate position
        let startPos = Object.assign({},this.pos);
        for(let i = 0; i < bends; i++)
        {
            //Add a vertical distance or horizontal distance for each bend
            if(i % 2 == 0)
                startPos.y += verticalDistance;
            else
                startPos.x += horizontalDistance;

            //Draw line to
            graphics.lineTo(startPos.x,startPos.y);
        }

        //Draw
        graphics.stroke();
        graphics.restore();
    }
}

// let extend = 1;
// if(this.connectionTo != null)
//     graphics.bezierCurveTo(this.pos.x + extend,this.pos.y, this.connectionTo.pos.x - extend, this.connectionTo.pos.y, this.connectionTo.pos.x, this.connectionTo.pos.y);
// else
//     graphics.bezierCurveTo(this.pos.x + extend,this.pos.y, this.mousePos.x - extend, this.mousePos.y, this.mousePos.x, this.mousePos.y);