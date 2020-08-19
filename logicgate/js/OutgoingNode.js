class OutgoingNode extends LogicGate
{
    constructor(pos, circuit, parent, parentOffset)
    {
        super(pos);
        this.circuit = circuit;

        this.parentOffset = parentOffset;

        this.outgoingConnections = Array();
        this.parent = parent;

        this.dragWire = new Wire(this.pos, this);
        this.circuit.push(this.dragWire);
    }

    SelectedUpdate(stillDragging, gateDroppedOn, shouldMove)
    {
        //Make sure the drag wire is deleted each round
        this.dragWire.mousePos = null;

        //If we should move the gate instead
        if(shouldMove)
        {
            super.SelectedUpdate();
        }
        else
        {
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