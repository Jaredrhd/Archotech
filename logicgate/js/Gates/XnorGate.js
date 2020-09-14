class XnorGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, scale = 1, circuit, charge = false)
    {
        super(pos, scale);

        this.incomingNodes = [new IncomingNode({x:0,y:0}, circuit, this, {x:-0.85,y:0.25}), new IncomingNode({x:0,y:0},circuit, this, {x:-0.85,y:-0.25})];
        this.outgoingNodes = new OutgoingNode({x:0,y:0}, circuit, this, {x:1,y:0});
        super.AddNodesToCircuit(circuit);
    }

    UpdateCharge()
    {
        //Make sure we can update this gate
        if(!super.CanUpdateCharge())
            return;
        
        //Calculate the new charge and pass forward
        let charge1 = this.incomingNodes[0].incomingConnection.parent.charge;
        let charge2 = this.incomingNodes[1].incomingConnection.parent.charge;

        this.charge = !(!(charge1 && charge2) && (charge1 || charge2));
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
        graphics.moveTo(-0.375, 0.25);
        graphics.lineTo(0.125, 0.25);
        graphics.moveTo(-0.375, -0.25);
        graphics.lineTo(0.125, -0.25);
        graphics.moveTo(1, 0);
        graphics.lineTo(1.5, 0);
        graphics.stroke();

        //Circle
        graphics.save();
        graphics.fillStyle = "white";
        graphics.beginPath();
        graphics.arc(1.135, 0, 0.1, 0, 2*Math.PI);
        graphics.fill();
        graphics.stroke();
        graphics.restore();

        //Middle Shape
        graphics.beginPath();
        graphics.moveTo(0, 0.5);
        graphics.quadraticCurveTo(0.8, 0.5, 1, 0); // Left side of body
        graphics.quadraticCurveTo(0.8, -0.5, 0, -0.5); // Right side of body
        graphics.quadraticCurveTo(0.35, 0, 0, 0.5); // Bottom curve
        graphics.closePath();
        graphics.fill();
        
        //Extra line
        graphics.moveTo(-0.1, -0.5);
        graphics.quadraticCurveTo(0.25, 0, -0.1, 0.5); // Copy of bottom curve moved left slightly
        graphics.stroke();
    }

    DrawBroken(graphics)
    {
        graphics.fillStyle = "white";
        this.DrawCorrect(graphics);
    }
}