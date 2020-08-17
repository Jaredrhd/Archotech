class AndGate extends LogicGate
{
    constructor(incomingConnectionsNeeded = 0, outgoingConnectionsNeeded = 0, pos= {x:0, y:0})
    {
        super(incomingConnectionsNeeded, outgoingConnectionsNeeded, pos);
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.translate(this.pos.x,this.pos.y);
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