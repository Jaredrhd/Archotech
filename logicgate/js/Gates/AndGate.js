class AndGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, scale = 0.8, globalScale, circuit, origin, charge = false)
    {
        super(pos, scale, globalScale, origin);

        this.incomingNodes = [new IncomingNode({x:0,y:0}, circuit, this, {x:-1,y:0.25}), new IncomingNode({x:0,y:0},circuit, this, {x:-1,y:-0.25})];
        this.outgoingNodes = new OutgoingNode({x:0,y:0}, circuit, this, {x:1,y:0});
        super.AddNodesToCircuit(circuit);
    }

    UpdateCharge()
    {
        //Make sure we can update this gate
        if(!super.CanUpdateCharge())
            return;
        
        //Calculate the new charge and pass forward
        this.charge = this.incomingNodes[0].incomingConnectionNode.parent.charge && this.incomingNodes[1].incomingConnectionNode.parent.charge;
        this.updated = true;

        //Update the next gate
        super.UpdateNextGate();
    }

    Draw(graphics)
    {
        super.Draw(graphics);
        super.DrawNodes(graphics);
    }

    DrawCorrect(graphics)
    {
        graphics.translate(-0.5, 0); // Centre at (0, 0)

        // Three line segments
        graphics.beginPath();
        graphics.moveTo(-0.5, 0.25);
        graphics.lineTo(0, 0.25);
        graphics.moveTo(-0.5, -0.25);
        graphics.lineTo(0, -0.25);
        graphics.moveTo(1, 0);
        graphics.lineTo(1.5, 0);
        graphics.stroke();

        //Middle Shape
        graphics.beginPath();
        graphics.moveTo(0.5, -0.5);
        graphics.lineTo(0, -0.5);
        graphics.lineTo(0, 0.5);
        graphics.lineTo(0.5, 0.5);
        graphics.fill();
        graphics.stroke();

        graphics.beginPath();
        //Start x at 0.49 to prevent anti-aliasing from making white seams
        graphics.arc(0.49, 0, 0.5, -Math.PI/2, Math.PI/2);
        graphics.fill();
        graphics.stroke();
    }

    DrawBroken(graphics)
    {
        graphics.fillStyle = "white";
        this.DrawCorrect(graphics);
    }
}