class IncomingNode extends LogicGate
{
    constructor(pos, circuit, parent, parentOffset)
    {
        super(pos);
        this.circuit = circuit;
        this.parentOffset = parentOffset;

        this.incomingConnection;
        this.parent = parent;

        //this.dragWire = new Wire(pos,parent,parentOffset);
        //this.circuit.push(this.dragWire);
    }

    //Return the gate so that the the other gate knows what to connect to
    AddIncomingConnection(gate)
    {
        //Don't re-add the same gate
        if(this.incomingConnection === gate)
            return;

        //If we have an incoming connection already and we are getting a new one
        if(this.incomingConnection != null)
        {
            for (let i = 0; i < this.incomingConnection.outgoingConnections.length; i++) 
            {
                //Shorten name out the outgoing connection
                let out = this.incomingConnection.outgoingConnections[i];

                //If the out gate matches this incoming node we found the one we wanted
                if(out.gate == this)
                {
                    //Delete the outgoing connection
                    this.incomingConnection.RemoveOutgoingConnection(out);
                }
            }
        }

        //Set new gate and return this class
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

    SelectedUpdate()
    {
        //If we have an incoming connection already and we are getting a new one
        if(this.incomingConnection != null)
        {
            for (let i = 0; i < this.incomingConnection.outgoingConnections.length; i++) 
            {
                //Shorten name out the outgoing connection
                let out = this.incomingConnection.outgoingConnections[i];

                //If the out gate matches this incoming node we found the one we wanted
                if(out.gate == this)
                {
                    //Delete the outgoing connection
                    this.incomingConnection.RemoveOutgoingConnection(out);
                    let gate = this.incomingConnection;
                    this.incomingConnection = null;
                    return gate;
                }
            }
        }
    }
}