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

        //Draw
        graphics.save();

        //Draw circle
        graphics.beginPath();
        graphics.moveTo(this.pos.x, this.pos.y);

        //TODO determine if outgoing or incoming wire and swap +-
        let extend = 1;
        if(this.connectionTo != null)
            graphics.bezierCurveTo(this.pos.x + extend,this.pos.y, this.connectionTo.pos.x - extend, this.connectionTo.pos.y, this.connectionTo.pos.x, this.connectionTo.pos.y);
        else
            graphics.bezierCurveTo(this.pos.x + extend,this.pos.y, this.mousePos.x - extend, this.mousePos.y, this.mousePos.x, this.mousePos.y);

        graphics.stroke();
        graphics.restore();
    }
}