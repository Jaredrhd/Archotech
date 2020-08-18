class IncomingNode extends LogicGate
{
    constructor(pos, parent, parentOffset)
    {
        super(pos);
        this.parentOffset = parentOffset;

        this.incomingConnection;
        this.parent = parent;
    }

    AddIncomingConnection(gate)
    {
        //TODO maybe use later for adding or removing wire
        let deletedGate = this.incomingConnection;
        this.incomingConnection = gate;
    }

    Draw(graphics)
    {
        this.pos.x = this.parentOffset.x + this.parent.pos.x;
        this.pos.y = this.parentOffset.y + this.parent.pos.y;

        graphics.save();

        //Move to pos and scale
        graphics.translate(this.pos.x,this.pos.y);
        graphics.scale(0.33,0.33);

        //Draw circle
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0,  2 * Math.PI);
        graphics.stroke();

        graphics.restore();
    }

    SelectedUpdate(){}
}