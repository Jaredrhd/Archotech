class Sidebar
{
    constructor(coords)
    {
        this.coords = coords;
        this.spawners = Array();
    }

    AddSpawner(gate)
    {
        this.spawners.push(gate);
    }

    Draw(graphics)
    {
        this.DrawLeftPanel(graphics);
    }

    DrawLeftPanel(graphics)
    {
        graphics.save();
        graphics.fillStyle = "lightgrey";

        graphics.beginPath();
        graphics.moveTo(this.coords.xleft, this.coords.ytop);
        graphics.lineTo(this.coords.xleft+2, this.coords.ytop);
        graphics.lineTo(this.coords.xleft+2, this.coords.ybottom);
        graphics.lineTo(this.coords.xleft, this.coords.ybottom);
        graphics.closePath();
        graphics.stroke();
        graphics.fill();

        graphics.restore();
    }

    DrawBottomPanel(graphics)
    {

    }

    Update()
    {
        let spacingOffset = -0.6;
        let xPos = this.coords.xleft+1;
        let spacing = (Math.abs(this.coords.ytop - spacingOffset) + Math.abs(this.coords.ybottom) )/this.spawners.length;
        let top = (Math.abs(this.coords.ytop + 0.3));

        //Spawners
        this.spawners[0].pos.x = this.coords.xleft + 0.75;
        this.spawners[0].pos.y = this.coords.ytop - 0.35;
        this.spawners[1].pos.x = this.coords.xleft + 1.25;
        this.spawners[1].pos.y = this.coords.ytop - 0.35;

        //Remaining Gates
        for (let i = 2; i < this.spawners.length; i++)
        {
            this.spawners[i].pos.x = xPos;
            this.spawners[i].pos.y = top - i * spacing;
        }
    }
}