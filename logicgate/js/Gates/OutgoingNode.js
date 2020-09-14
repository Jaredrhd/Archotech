class OutgoingNode extends LogicGate
{
    constructor(pos, circuit, parent, parentOffset = {x:0, y:0})
    {
        super(pos);
        this.circuit = circuit;

        this.parentOffset = parentOffset;

        this.outgoingConnections = Array();
        this.parent = parent;

        this.dragWire = new Wire(this.pos, this);
        this.circuit.push(this.dragWire);
    }

    SelectedUpdate(stillDragging, gateDroppedOn)
    {
        //Make sure the drag wire is deleted each round
        this.dragWire.mousePos = null;

        //Used for creating wire
        if(stillDragging)
        {
            //Create wire to mouse
            this.dragWire.mousePos = Input.GetMousePos();
        }
        else if(!stillDragging && gateDroppedOn != null)
        {
            //Try create a wire to the gate, we might get back a gate which we should rather connect to as it is a node.
            let attached = gateDroppedOn.AddIncomingConnection(this);
            if(attached != null)
                this.AddOutgoingConnection(attached);
        }
    }

    AddOutgoingConnection(gate)
    {
        //Create a new wire and link it to whatever gate
        let wire = new Wire(this.pos,this);
        wire.UpdateConnection(gate);

        //Push the gate to the array
        this.outgoingConnections.push({gate, wire});

        //Push it to circuit
        this.circuit.push(wire);
    }

    //Handles removing of the connection
    RemoveOutgoingConnection(gateWire)
    {
        this.outgoingConnections.splice(this.outgoingConnections.indexOf(gateWire),1);
        this.circuit.splice(this.circuit.indexOf(gateWire.wire),1);
    }

    UpdatePos()
    {
        this.pos.x = this.parentOffset.x * this.parent.scale + this.parent.pos.x;
        this.pos.y = this.parentOffset.y * this.parent.scale + this.parent.pos.y;
    }

    Draw(graphics)
    {
        this.UpdatePos();
        graphics.save();
        graphics.fillStyle = "white";

        //Move to pos and scale
        graphics.translate(this.pos.x,this.pos.y);
        graphics.scale(this.parent.scale,this.parent.scale);

        //Draw circle
        graphics.beginPath();
        graphics.arc(0,0,0.13, 0,  2 * Math.PI);
        graphics.stroke();
        graphics.fill();
        graphics.restore();
    }
}