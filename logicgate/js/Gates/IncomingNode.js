class IncomingNode extends LogicGate
{
    constructor(pos, circuit, parent, parentOffset  = {x:0, y:0})
    {
        super(pos);
        this.circuit = circuit;
        this.parentOffset = parentOffset;

        this.incomingConnection;
        this.parent = parent;
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
                //Shorten name to out which is the outgoing connection
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

    //For updating the position of the node with an offset from the parent
    UpdatePos()
    {
        this.pos.x = this.parentOffset.x * this.parent.scale + this.parent.pos.x;
        this.pos.y = this.parentOffset.y * this.parent.scale + this.parent.pos.y;
    }

    SelectedUpdate()
    {
        //If we have an incoming connection already and we select the input node
        if(this.incomingConnection != null)
        {
            for (let i = 0; i < this.incomingConnection.outgoingConnections.length; i++) 
            {
                //Shorten name to out which is the outgoing connection
                let out = this.incomingConnection.outgoingConnections[i];

                //If the out gate matches this incoming node we found the one we wanted
                if(out.gate == this)
                {
                    //Delete the outgoing connection
                    this.incomingConnection.RemoveOutgoingConnection(out);
                    let gate = this.incomingConnection;
                    this.incomingConnection = null;
                    return gate; //Swap to outgoing gate
                }
            }
        }

        //TODO if no incoming connection create wire from input node
    }
}