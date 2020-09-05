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
        graphics.lineWidth += 0.005;

        //Begin Draw
        graphics.beginPath();
        graphics.moveTo(this.pos.x, this.pos.y);

        //Initialize
        let bends = 2;
        let verticalDecrease = 0, verticalDecreaseAmount = 0.5;
        let horizontalDecrease = 0, horizontalDecreaseAmount = 0.5;

        let horizontalDistance = 0, verticalDistance = 0;
        let startPos = Object.assign({},this.pos);
        let endPos = Object.assign({},(this.connectionTo == null) ? this.mousePos : this.connectionTo.pos);

        //calculate distances to mouse or node
        let distances = (this.connectionTo == null) ? super.GetXYDistanceToPoint(this.mousePos) : super.GetXYDistanceToPoint(this.connectionTo.pos);


        //COMMENT OUT THIS SECTION FOR FIXED AMOUNT OF BENDS
        //START BENDS---------------------------------------------------------------------------------------------------------------------------------
        //Determine whether to add dynamic bends based on distance 
        let manhattanDistance = Math.abs(distances.y) + Math.abs(distances.x);

        //Uncomment if we should use distances based on gate rather than node since it 1 node can have 2 bends, and the other 3.
        if(this.connectionTo)
        {
            manhattanDistance = super.GetXYDistanceToPoint(this.connectionTo.parent.pos);
            manhattanDistance = Math.abs(manhattanDistance.x) + Math.abs(manhattanDistance.y);
        }

        if(Math.abs(distances.x) < 1 || Math.abs(distances.y) < 1)
            bends = 2
        if(manhattanDistance > 12)
            bends = 4;
        else if(manhattanDistance > 5 || (startPos.x+0.1) > endPos.x) //Force to be at least three if we have to go backwards
            bends = 3;

        //END BENDS---------------------------------------------------------------------------------------------------------------------------------

        //Highly recommend just play with values after boolean section
        if(bends != 2)
        {
            //START DECREASE HORIZONTAL/VERTICAL---------------------------------------------------------------------------------------------------------
            //Determine whether we should decrease the horizontal distance to not overlap other lines
            //Make sure we have a connection, which has more then 1 incoming nodes
            let decreaseHorizontalDistance = this.connectionTo != null && this.connectionTo.parent.incomingNodes.length > 1;

            //Determine whether to decrease a line based on it's connection to either incoming node 0 or 1 if above or below
            if(this.connectionTo != null && startPos.y < this.connectionTo.pos.y)
                decreaseHorizontalDistance = decreaseHorizontalDistance && this.connectionTo.parent.incomingNodes[0] == this.connectionTo;
            else if(this.connectionTo != null)
                decreaseHorizontalDistance = decreaseHorizontalDistance && this.connectionTo.parent.incomingNodes[1] == this.connectionTo;

            let decreaseVerticalDistance = !decreaseHorizontalDistance;

            //If we are decreasing horizontal
            if(decreaseHorizontalDistance)
                horizontalDecrease = -horizontalDecreaseAmount;

            //If we are decreasing this vertical distance
            if(decreaseVerticalDistance && this.connectionTo)
            {
                //If start pos it to left
                if(startPos.x < this.connectionTo.pos.x)
                {
                    //If it is above
                    if(startPos.y > this.connectionTo.pos.y)
                        verticalDecrease = verticalDecreaseAmount;
                    else
                        verticalDecrease = -verticalDecreaseAmount;
                }
                else //Start pos to right
                {
                    //if it is above
                    if(startPos.y > this.connectionTo.pos.y)
                        verticalDecrease = -verticalDecreaseAmount;
                    else
                        verticalDecrease = verticalDecreaseAmount;

                }
            }
            else if(this.connectionTo)
            {
                //Move the horizontally increased by a fixed amount
                if(startPos.y > this.connectionTo.pos.y)
                    verticalDecrease = 0.3;
                else
                    verticalDecrease = -0.3;
            }
        }

        //END DECREASE HORIZONTAL/VERTICAL------------------------------------------------------------------------------------------------------------
        
        //Calculate the number of horizontal distances or vertical distances based on the number of bends
        horizontalDistance = (bends % 2 == 0) ? distances.x/(bends/2) : distances.x/((bends-1)/2);
        verticalDistance = (bends % 2 == 0) ? distances.y/(bends/2) : distances.y/((bends+1)/2);

        for(let i = 0; i < bends; i++)
        {
            //Add a vertical distance or horizontal distance for each bend
            if(i % 2 == 0)
            {
                if(i != bends-1)
                    startPos.y += verticalDistance + verticalDecrease;
                else
                    startPos.y = endPos.y;
            }
            else
            {
                if(i != bends-1)
                    startPos.x += horizontalDistance + horizontalDecrease;
                else
                    startPos.x = endPos.x;
            }

            //Draw line to
            graphics.lineTo(startPos.x,startPos.y);
        }

        //Draw to end gate or mouse
        graphics.lineTo(endPos.x,endPos.y);
        graphics.stroke();
        graphics.restore();
    }
}

// let extend = 1;
// if(this.connectionTo != null)
//     graphics.bezierCurveTo(this.pos.x + extend,this.pos.y, this.connectionTo.pos.x - extend, this.connectionTo.pos.y, this.connectionTo.pos.x, this.connectionTo.pos.y);
// else
//     graphics.bezierCurveTo(this.pos.x + extend,this.pos.y, this.mousePos.x - extend, this.mousePos.y, this.mousePos.x, this.mousePos.y);