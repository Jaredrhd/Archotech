class EndGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, circuit)
    {
        super(pos, circuit);
        this.incomingNodes = [new IncomingNode(this.pos, circuit, this)];
    }

    SelectedUpdate(stillDragging, gateDroppedOn)
    {
        //For dragging the start gate
        if(stillDragging && (Input.GetKey("control") || this.incomingNodes[0].incomingConnection == null))
        {
            super.SelectedUpdate(stillDragging, gateDroppedOn);
            this.incomingNodes[0].UpdatePos();
        }
        else if(!Input.GetKey("control")) //Make sure we arent pressing control
            return this.incomingNodes[0].SelectedUpdate();
    }

    //Overrides the default behaviour since we want to swap to the new connection if a new wire is attached to this
    AddIncomingConnection(gate)
    {
        return this.incomingNodes[0].AddIncomingConnection(gate);
    }

    //Update the charge of the end gate with whatever came in
    UpdateCharge()
    {
        this.visited = true;
        this.charge = this.incomingNodes[0].incomingConnection.parent.charge;
        this.updated = true;
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.lineWidth += 0.005;
        graphics.translate(this.pos.x,this.pos.y);
        graphics.scale(0.5,0.5);

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
        graphics.fillStyle = "white";
        graphics.beginPath();
        graphics.arc(0,0,0.5, 1.5 * Math.PI,  0.5 * Math.PI);
        graphics.closePath();
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