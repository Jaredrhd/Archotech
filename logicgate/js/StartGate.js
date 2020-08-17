class StartGate extends LogicGate //Maybe extend buffer gate in future?
{
    constructor()
    {
        super(2);

        let gate1 = new AndGate();
        let gate2 = new AndGate();

        this.incomingConnections.push(gate1);

        //Should result in false
        console.log(this.Correct());

        this.incomingConnections.push(gate2);

        //Should result in true
        console.log(this.Correct());

    }

    SelectedUpdate()
    {
        if(Input.GetKey("control"))
        {
            super.SelectedUpdate();
        }
        else
        {
            //Used for creating wire

            //BUG CHECK Create wire, then press control to swap, then let go to swap back.
        }
    }

    Draw(graphics)
    {
        graphics.translate(this.pos.x,this.pos.y);

        if(this.Correct())
            this.DrawCorrect(graphics);
        else
            this.DrawBroken(graphics);
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