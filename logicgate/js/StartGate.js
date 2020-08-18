class StartGate extends LogicGate //Maybe extend buffer gate in future?
{
    constructor(pos = {x:0, y:0})
    {
        super(pos);
    }

    SelectedUpdate(stillDragging, gateDroppedOn)
    {
        //Move gate
        if(stillDragging && Input.GetKey("control"))
        {
            super.SelectedUpdate();
        }
        else
        {
            //Used for creating wire
            if(stillDragging)
            {
                //Create wire to mouse
            }
            else if(!stillDragging && gateDroppedOn != null)
            {
                //Create wire to gate
                //this.AddOutgoingConnection(gateDroppedOn);
                gateDroppedOn.AddIncomingConnection(this);
            }
            else
            {
                //Delete wire
            }
            //BUG CHECK Create wire, then press control to swap, then let go to swap back.
        }
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.translate(this.pos.x,this.pos.y);

        if(this.Correct())
            this.DrawCorrect(graphics);
        else
            this.DrawBroken(graphics);
        graphics.restore();
    }

    DrawCorrect(graphics)
    {
        if(this.isCharged)
            graphics.fillStyle = 'white';
        else
            graphics.fillStyle = 'black';

        graphics.beginPath();
        graphics.arc(0,0,0.5, 0,  2 * Math.PI);
        graphics.fill();
        graphics.stroke();
    }

    DrawBroken(graphics)
    {
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.5 * Math.PI,  1.5 * Math.PI);
        graphics.fillStyle = 'black';
        graphics.fill();
        graphics.stroke();
    }
}