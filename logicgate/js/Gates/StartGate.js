class StartGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, circuit, charge = false)
    {
        super(pos, circuit);
        this.outgoingNode = new OutgoingNode(this.pos, circuit, this);

        this.charge = charge;
        this.updated = true;
    }

    //Update the charge of the Start node (Since we don't actually update, just pass forward and update the next object)
    UpdateCharge()
    {
        if(this.visited)
            return;

        this.visited = true;

        for(let i = 0; i < this.outgoingNode.outgoingConnections.length; i++)
            this.outgoingNode.outgoingConnections[i].gate.parent.UpdateCharge();
    }

    SelectedUpdate(stillDragging, gateDroppedOn)
    {
        //For dragging the start gate
        if(stillDragging && Input.GetKey("control"))
        {
            super.SelectedUpdate(stillDragging, gateDroppedOn);
            this.outgoingNode.dragWire.mousePos = null;
        }
        else //Create a wire
            this.outgoingNode.SelectedUpdate(stillDragging, gateDroppedOn);

        //Since a startGate outgoingNode isn't drawn we need to make sure it's position is updated
        this.outgoingNode.UpdatePos();
    }

    Correct()
    {
        //A Start Node is qualified as correct if it's outgoing node has more then 1 connection
        return this.outgoingNode.outgoingConnections.length > 0;
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.translate(this.pos.x,this.pos.y);

        if(this.charge)
            graphics.fillStyle = "green";
        else
            graphics.fillStyle = "black";

        if(this.Correct())
            this.DrawCorrect(graphics);
        else
            this.DrawBroken(graphics);
        graphics.restore();
    }

    DrawBroken(graphics)
    {
        graphics.fillStyle = "transparent";
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.5 * Math.PI,  1.5 * Math.PI);
        graphics.fill();
        graphics.stroke();
    }

    DrawCorrect(graphics)
    {
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0,  2 * Math.PI);
        graphics.fill();
        graphics.stroke();
    }

}