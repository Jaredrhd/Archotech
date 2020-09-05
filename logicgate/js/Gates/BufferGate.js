class BufferGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, circuit)
    {
        super(pos);

        this.incomingNodes = [new IncomingNode({x:0,y:0}, circuit, this, {x:-1,y:0})];
        this.outgoingNodes = new OutgoingNode({x:0,y:0}, circuit, this, {x:1,y:0});


        for (let i = 0; i < this.incomingNodes.length; i++) 
            circuit.push(this.incomingNodes[i]);

        circuit.push(this.outgoingNodes);
    }

    UpdateCharge()
    {
        //Make sure we can update this gate
        if(!super.CanUpdateCharge())
            return;

        //Calculate the new charge and pass forward
        this.charge = this.incomingNodes[0].incomingConnection.parent.charge;
        this.updated = true;

        //Update the next gate
        super.UpdateNextGate();
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.translate(this.pos.x,this.pos.y);

        if(this.charge)
            graphics.fillStyle = 'transparent';
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
        graphics.translate(-0.5, 0); // Centre at (0, 0)
        
        // Two line segments
        graphics.beginPath();
        graphics.moveTo(-0.5, 0);
        graphics.lineTo(0, 0);
        graphics.moveTo(1, 0);
        graphics.lineTo(1.5, 0);
        graphics.stroke();

        //Triangle
        graphics.rotate(-Math.PI/2);
        graphics.beginPath();
        graphics.moveTo(-0.5,0);
        graphics.lineTo(0.5,0);
        graphics.lineTo(0,1);
        graphics.closePath();
        graphics.fill();
        graphics.stroke();
    }

    DrawBroken(graphics)
    {
        graphics.fillStyle = "transparent";
        this.DrawCorrect(graphics);
    }
}