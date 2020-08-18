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

    UpdateConnection(gate)
    {
        this.connectionTo = gate;
    }

    Draw(graphics)
    {
        if(this.connectionTo == null && this.mousePos == null)
            return;

        //Start pos
        if(this.parent != null && this.parentOffset != null)
        {
            this.pos.x = this.parentOffset.x + this.parent.pos.x;
            this.pos.y = this.parentOffset.y + this.parent.pos.y;
        }

        graphics.save();

        //Draw circle
        graphics.beginPath();
        graphics.moveTo(this.pos.x, this.pos.y);

        //TODO determine if outgoing or incoming wire and swap +-
        if(this.connectionTo != null)
            graphics.bezierCurveTo(this.pos.x + 1,this.pos.y, this.connectionTo.pos.x - 1, this.connectionTo.pos.y, this.connectionTo.pos.x, this.connectionTo.pos.y);
        else
            graphics.bezierCurveTo(this.pos.x + 1,this.pos.y, this.mousePos.x - 1, this.mousePos.y, this.mousePos.x, this.mousePos.y);

        graphics.stroke();

        graphics.restore();
    }
}