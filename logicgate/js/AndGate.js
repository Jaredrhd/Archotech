class AndGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, circuit)
    {
        super(pos);

        this.incomingNodes = [new IncomingNode({x:0,y:0}, circuit, this, {x:-1,y:0.25}), new IncomingNode({x:0,y:0},circuit, this, {x:-1,y:-0.25})];
        this.outgoingNodes = [new OutgoingNode({x:0,y:0}, circuit, this, {x:1,y:0})];


        for (let i = 0; i < this.incomingNodes.length; i++) 
            circuit.push(this.incomingNodes[i]);

        for (let i = 0; i < this.outgoingNodes.length; i++) 
            circuit.push(this.outgoingNodes[i]);

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
    }

    DrawBroken(graphics)
    {
        graphics.translate(-0.5, 0); // Centre at (0, 0)
        graphics.lineWidth = 0.025;

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
        graphics.fillStyle = "transparent";
        graphics.beginPath();
        graphics.moveTo(0.5, -0.5);
        graphics.lineTo(0, -0.5);
        graphics.lineTo(0, 0.5);
        graphics.lineTo(0.5, 0.5);
        graphics.fill();
        graphics.stroke();
        graphics.beginPath();
        graphics.arc(0.5, 0, 0.5, -Math.PI/2, Math.PI/2);
        graphics.fill();
        graphics.stroke();
    }
}