class LogicGate
{
    constructor(connectionsNeeded)
    {
        this.isCharged = false;
        this.incomingConnections = Array();
        this.outgoingConnections = Array();

        this.connectionsNeeded = connectionsNeeded;
        this.pos = {x:0, y:0};
    }

    Update()
    {
        console.error("You need to implement an update method in the logic gate");
    }

    //Makes sure that the gate is correctly connected
    Correct()
    {
        return this.incomingConnections.length === this.connectionsNeeded;
    }

    //Returns the distance between a point and a gate
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

    Draw(graphics)
    {
        //Draw an incorrect node to force the use of a proper gate rather then the LogicGate
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.8 * Math.PI,  1.8 * Math.PI);
        graphics.stroke();
    }
}