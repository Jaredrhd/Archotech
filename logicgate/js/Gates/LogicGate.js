class LogicGate
{
    /**
     * @param {pos} Object {x,y} position
     */
    constructor(pos= {x:0, y:0})
    {
        this.charge = false;
        this.incomingNodes = Array();
        this.outgoingNodes = Array();

        this.pos = pos;

        this.radius = 0.55;
        this.selectable = true;

        //This is provided in the selection manager class. 
        this.offset = {x:0,y:0};

        this.visited = false;
        this.updated = false;
    }

    /**
     * This method is called when the gate/node has been selected
     */
    SelectedUpdate()
    {
        let mousePos = Object.assign({}, Input.GetMousePos());
        mousePos.x -= this.offset.x;
        mousePos.y -= this.offset.y;

        //Set position
        this.pos = mousePos;
    }

    /**
     * This method is called when the canvas is focused on. Can be used for anything that needs to be updated per frame.
     */
    Update()
    {
    }

    CanUpdateCharge()
    {
        //If we have visited this node return to the previous one
        if(this.visited == true)
            return false;

        this.visited = true;

        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(this.incomingNodes[i].incomingConnection == null )
            {
                this.charge = false;
                return false;
            }
        }

        //Make sure both incoming connections are update
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(!this.incomingNodes[i].incomingConnection.parent.updated)
                this.incomingNodes[i].incomingConnection.parent.UpdateCharge();
        }

        return true;
    }

    /**
     * This method is called when the Logic Gate Charge needs to be calculated
     */
    UpdateCharge()
    {
        //ADD YOUR CODE HERE IN THE SPECIFIC GATE
        console.error("Need to add code to update charge in specific gate");
    }

    UpdateNextGate()
    {
        //If we don't have outgoing connections return
        if(!this.outgoingNodes.outgoingConnections)
            return;

        //Continue the charge forward
        for (let i = 0; i < this.outgoingNodes.outgoingConnections.length; i++) 
            this.outgoingNodes.outgoingConnections[i].gate.parent.UpdateCharge();
    }

    /**
     * Makes sure that the gate is correctly connected (Which means it has been updated)
     */
    Correct()
    {
        let correctlyConnected = true;
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(this.incomingNodes[i].incomingConnection == null)
                correctlyConnected = false;
        }

        return this.visited && correctlyConnected;
    }

    /**
     * Returns the distance between a point and a gate
     */
    GetDistanceToGate(point)
    {
        return Math.sqrt(Math.pow(this.pos.x - point.x,2) + Math.pow(this.pos.y - point.y,2));
    }

     /**
     * By default this method will try to add a gate to a an open connection if it can. You can overwrite to change how incoming connections are added
     */
    AddIncomingConnection(gate)
    {
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(this.incomingNodes[i].incomingConnection == null)
            {
                return this.incomingNodes[i].AddIncomingConnection(gate);
            }
        }
    }

    /**
     * The function to draw a gate
     */
    Draw(graphics)
    {
        //Draw an incorrect node to force the use of a proper gate rather then the LogicGate
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.8 * Math.PI,  1.8 * Math.PI);
        graphics.stroke();
    }
}