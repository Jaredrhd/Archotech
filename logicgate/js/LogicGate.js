class LogicGate
{
    /**
     * @param {incomingConnectionsNeeded} int The required number of incoming connections strictly equal.
     * @param {outgoingConnectionsNeeded} int The required number of outgoing connections greater than or equal.
     */
    constructor(neededIncomingConnections = 0, neededOutgoingConnections = 0, pos= {x:0, y:0})
    {
        this.isCharged = false;
        this.incomingConnections = Array();
        this.outgoingConnections = Array();

        this.incomingConnectionsNeeded = neededIncomingConnections;
        this.outgoingConnectionsNeeded = neededOutgoingConnections;

        this.pos = pos;

        this.radius = 0.55;
        this.selected = false;

        //This is provided in the selection manager class. 
        this.offset = {x:0,y:0};
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

    /**
     * Makes sure that the gate is correctly connected
     */
    Correct()
    {
        return this.incomingConnections.length === this.neededIncomingConnections && this.outgoingConnections.length >= this.neededOutgoingConnections;
    }

    /**
     * Returns the distance between a point and a gate
     */
    GetDistanceToGate(point)
    {
        return Math.sqrt(Math.pow(this.pos.x - point.x,2) + Math.pow(this.pos.y - point.y,2));
    }

    //TODO remake
    AddIncomingConnection()
    {
        if(this.incomingConnections.length >= this.incomingConnections)
        {
            console.error("Too many incoming connections");
            return;
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