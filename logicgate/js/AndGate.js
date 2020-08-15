class AndGate extends LogicGate
{
    constructor()
    {
        super();
    }

    Draw(graphics)
    {
        graphics.translate(this.pos.x,this.pos.y);
        this.DrawBroken(graphics);
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

        // Rectangular base
        graphics.beginPath();
        graphics.moveTo(0, 0.5);
        graphics.lineTo(0.5, 0.5);
        graphics.stroke();
    
        // Connecting arc
        graphics.save();
        graphics.beginPath();
        graphics.rotate(-Math.PI/2);
        graphics.arc(0, 0.5, 0.5, 0, Math.PI);
        graphics.stroke();
        graphics.restore();

        // Rectangular base
        graphics.beginPath();
        graphics.moveTo(0.5, -0.5);
        graphics.lineTo(0, -0.5);
        graphics.lineTo(0, 0.51);
        graphics.stroke();
    }
}