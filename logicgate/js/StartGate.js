class StartGate extends OutgoingNode
{
    constructor(pos = {x:0, y:0}, circuit)
    {
        super(pos, null, null, circuit);
    }

    SelectedUpdate(stillDragging, gateDroppedOn)
    {
        //Make sure the drag wire is deleted each round
        this.dragWire.mousePos = null;

        if(stillDragging && Input.GetKey("control"))
        {
            //For dragging the start gate
            super.SelectedUpdate();
        }
        else
        {
            //Used for creating wire
            if(stillDragging)
            {
                //Create wire to mouse
                this.dragWire.mousePos = Input.GetMousePos();
            }
            else if(!stillDragging && gateDroppedOn != null)
            {
                //Try create a wire to the gate, we might get back a gate which we should rather connect to as it is a node.
                let attached = gateDroppedOn.AddIncomingConnection(this);
                if(attached != null)
                    this.AddOutgoingConnection(attached);
            }
        }
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
        graphics.fillStyle = 'transparent';
        graphics.fill();
        graphics.stroke();
    }
}