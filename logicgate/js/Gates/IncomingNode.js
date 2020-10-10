class IncomingNode extends LogicGate
{
    constructor(pos, circuit, parent, parentOffset  = {x:0, y:0})
    {
        super(pos);
        this.circuit = circuit;
        this.parentOffset = parentOffset;

        this.incomingConnectionNode;
        this.parent = parent;
    }

    //Return the gate so that the the other gate knows what to connect to
    AddIncomingConnection(gate)
    {
        //Don't re-add the same gate
        if(this.incomingConnectionNode === gate)
            return;

        //If we have an incoming connection already and we are getting a new one
        if(this.incomingConnectionNode != null)
        {
            for (let i = 0; i < this.incomingConnectionNode.outgoingConnections.length; i++) 
            {
                //Shorten name to out which is the outgoing connection
                let out = this.incomingConnectionNode.outgoingConnections[i];

                //If the out gate matches this incoming node we found the one we wanted
                if(out.gate == this)
                {
                    //Delete the outgoing connection
                    this.incomingConnectionNode.RemoveOutgoingConnection(out);
                }
            }
        }

        //Set new gate and return this class
        this.incomingConnectionNode = gate;
        return this;
    }

    Draw(graphics)
    {
        this.UpdatePosition();

        graphics.save();
        graphics.fillStyle = "white";
        
        //Move to pos and scale
        graphics.translate(this.position.x,this.position.y);
        graphics.scale(this.parent.scale * this.parent.globalScale.scale, this.parent.scale * this.parent.globalScale.scale);

        //Draw circle
        graphics.beginPath();
        graphics.arc(0,0,0.13, 0,  2 * Math.PI);
        graphics.stroke();
        graphics.fill();
        graphics.restore();
    }

    //For updating the position of the node with an offset from the parent
    UpdatePosition()
    {
        this.position.x = this.parentOffset.x * this.parent.scale * this.parent.globalScale.scale + this.parent.position.x;
        this.position.y = this.parentOffset.y * this.parent.scale * this.parent.globalScale.scale + this.parent.position.y;
    }

    SelectedUpdate()
    {
        //If we clicked on an outgoing node that is a spawners node, return it
        if(this.parent.spawner)
            return this.parent;

        //If we have an incoming connection already and we select the input node
        return this.RemoveIncomingConnection();
    }

    RemoveIncomingConnection()
    {
        if(this.incomingConnectionNode != null)
        {
            for (let i = 0; i < this.incomingConnectionNode.outgoingConnections.length; i++) 
            {
                //Shorten name to out which is the outgoing connection
                let out = this.incomingConnectionNode.outgoingConnections[i];
    
                //If the out gate connection matches this incoming node we found the one we wanted
                if(out.gate == this)
                {
                    //Delete the outgoing connection
                    this.incomingConnectionNode.RemoveOutgoingConnection(out);
                    let gate = this.incomingConnectionNode;
                    this.incomingConnectionNode = null;
                    return gate; //Swap to outgoing gate
                }
            }
        }
    }
}