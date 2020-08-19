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
        graphics.translate(this.pos.x,this.pos.y);

        if(this.charge)
            graphics.fillStyle = 'white';
        else
            graphics.fillStyle = 'black';

        if(this.Correct())
            this.DrawCorrect(graphics);
        else
            this.DrawBroken(graphics);
        
        graphics.restore();
    }

    DrawCorrect(graphics)
    {
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0,  2 * Math.PI);
        graphics.fill();
        graphics.stroke();
    }

    DrawBroken(graphics)
    {
        graphics.beginPath();
        graphics.arc(0,0,0.5, 1.5 * Math.PI,  0.5 * Math.PI);
        graphics.fill();
        graphics.stroke();
    }
}