class LogicGate
{
    constructor(connectionsNeeded)
    {
        this.isCharged = false;
        this.connectionArray = Array();
        this.connectionsNeeded = connectionsNeeded;
    }

    //Makes sure that the gate is correctly connected
    Correct()
    {
        return this.connectionArray.length == this.connectionsNeeded;
    }

    Draw(graphics)
    {
        //Draw an incorrect node to force the use of a proper gate rather then the LogicGate
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.8 * Math.PI,  1.8 * Math.PI);
        graphics.stroke();
    }
}