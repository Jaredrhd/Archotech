class IncomingNode extends LogicGate
{
    constructor(pos, parent, parentOffset, circuit)
    {
        super(pos);
        this.parentOffset = parentOffset;

        this.incomingConnection;
        this.parent = parent;

        this.dragWire = new Wire(pos,parent,parentOffset);
        circuit.push(this.dragWire);
    }

    //Return the gate so that the the other gate knows what to connect to
    AddIncomingConnection(gate)
    {
        this.incomingConnection = gate;
        return this;
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