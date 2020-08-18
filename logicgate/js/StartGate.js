class StartGate extends OutgoingNode
{
    constructor(pos = {x:0, y:0}, circuit)
    {
        super(pos, circuit);
    }

    SelectedUpdate(stillDragging, gateDroppedOn)
    {
        //For dragging the start gate
        if(stillDragging && Input.GetKey("control"))
            super.SelectedUpdate(stillDragging, gateDroppedOn, true);
        else //Create a wire
            super.SelectedUpdate(stillDragging, gateDroppedOn);
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.translate(this.pos.x,this.pos.y);

        if(!this.Correct())
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