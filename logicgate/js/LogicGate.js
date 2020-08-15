class LogicGate
{
    constructor(connectionsNeeded)
    {
        this.isCharged = false;
        this.incomingConnections = Array();
        this.outgoingConnections = Array();

        this.connectionsNeeded = connectionsNeeded;
        this.pos = {x:0, y:0};

        this.radius = 0.2;
        this.selected = false;

    }

    //TODO move this to a new selection class since we need to pick the closest item
    Update()
    {
        //Check if we clicked
        if(Input.GetMouseButtonDown(0))
        {
            //Get distance to this gate from the mouse
            let distance = this.GetDistanceToGate(Input.GetMousePos());

            //make sure distance is close enough
            if(distance < this.radius)
                this.selected = true;
        }

        //If we have selected the node, and the mouse is still held down, drag it
        if(this.selected && Input.GetMouseButton(0))
            this.pos = Input.GetMousePos();
        else
            this.selected = false; //reset
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

    //Draw a gate
    Draw(graphics)
    {
        //Draw an incorrect node to force the use of a proper gate rather then the LogicGate
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.8 * Math.PI,  1.8 * Math.PI);
        graphics.stroke();
    }
}