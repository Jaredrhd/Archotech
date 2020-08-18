class OutgoingNode extends LogicGate
{
    constructor(pos, parent, parentOffset, circuit)
    {
        super(pos);
        this.circuit = circuit;

        this.parentOffset = parentOffset;

        this.outgoingConnections = Array();
        this.parent = parent;

        this.dragWire = new Wire(this.pos, this);
        this.circuit.push(this.dragWire);
    }

    AddOutgoingConnection(gate)
    {
        //Push the gate to the array
        this.outgoingConnections.push(gate);

        //Create a new wire and link it to whatever gate
        let wire = new Wire(this.pos,this);
        wire.UpdateConnection(gate);

        //Push it to circuit
        this.circuit.push(wire);
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
}