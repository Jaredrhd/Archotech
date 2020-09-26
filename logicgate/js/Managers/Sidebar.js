class Sidebar
{
    constructor(coords, circuit, origin)
    {
        this.circuit = circuit;
        this.coords = coords;
        this.spawners = Array();
        this.origin = origin;

        //Start,end, buffer, not and nand or nor xor xnor
        //this.enabledSpawners = [StartGate, EndGate, BufferGate, NotGate, AndGate, NandGate, OrGate, NorGate, XorGate, XnorGate];
        this.enabledSpawners = [StartGate, EndGate, BufferGate, NotGate, AndGate, NandGate, OrGate, NorGate, XorGate, XnorGate];

        this.DrawLeft = true;
        this.AddSpawners();
    }

    AddSpawners()
    {
        for (let i = 0; i < this.enabledSpawners.length; i++) 
        {
            let scale = (i == 0 || i == 1) ? 0.5 : 0.6;
            if(this.enabledSpawners[i])
            {
                let gate = new this.enabledSpawners[i](undefined, scale, this.circuit, this.origin);
                gate.spawner = true;
                this.spawners.push(gate);
                this.circuit.push(gate);
            }
        }
    }

    Draw(graphics)
    {
        if(this.DrawLeft)
            this.DrawLeftPanel(graphics);
        else
            this.DrawBottomPanel(graphics);
    }

    DrawLeftPanel(graphics)
    {
        graphics.save();
        graphics.fillStyle = "lightgrey";

        graphics.beginPath();
        graphics.moveTo(this.coords.xleft, this.coords.ytop);
        graphics.lineTo(this.coords.xleft+1.5, this.coords.ytop);
        graphics.lineTo(this.coords.xleft+1.5, this.coords.ybottom);
        graphics.lineTo(this.coords.xleft, this.coords.ybottom);
        graphics.closePath();
        graphics.stroke();
        graphics.fill();

        graphics.restore();
    }

    DrawBottomPanel(graphics)
    {
        graphics.save();
        graphics.fillStyle = "lightgrey";

        graphics.beginPath();
        graphics.moveTo(this.coords.xleft, this.coords.ybottom);
        graphics.lineTo(this.coords.xright, this.coords.ybottom);
        graphics.lineTo(this.coords.xright, this.coords.ybottom + 1);
        graphics.lineTo(this.coords.xleft, this.coords.ybottom + 1);
        graphics.closePath();
        graphics.stroke();
        graphics.fill();

        graphics.restore();
    }

    Update()
    {
        if(this.DrawLeft)
            this.PlaceGatesDown();
        else
            this.PlaceGatesAcross();
    }

    PlaceGatesDown()
    {
        //Force offset is used to move the gates down by atleast one position
        let forceOffset = 1;

        //Get spawners length
        let spawnersLength = this.spawners.length;
        //Start Gate and End Gate count as 1 gate when spacing
        if(this.enabledSpawners[0] && this.enabledSpawners[1])
        {
            //If both gates enabled, no forced offset
            forceOffset = 0;
            spawnersLength--;
        }
        
        //Initial values
        let xPos = this.coords.xleft+0.75;
        let top = this.coords.ytop+0.35;
        let bottom = this.coords.ybottom+0.35;

        //Spacing between gates
        let spacing = (top + Math.abs(bottom)) / spawnersLength;

        //Spawn the gates in
        for (let i = 0; i < this.spawners.length; i++)
        {
            //Apply Pos
            if(this.spawners[i] instanceof StartGate)
            {
                this.spawners[i].pos.y = top - spacing;
                this.spawners[i].pos.x = xPos-0.1;
            }
            else if(this.spawners[i] instanceof EndGate)
            {
                this.spawners[i].pos.y = top - spacing;
                this.spawners[i].pos.x = xPos+0.1;
            }
            else
            {
                this.spawners[i].pos.y = top - (i+forceOffset) * spacing;
                this.spawners[i].pos.x = xPos;
            }
        }
    }

    PlaceGatesAcross()
    {
        //Force offset is used to move the gates down by atleast one position
        let forceOffset = 1;

        //Get spawners length
        let spawnersLength = this.spawners.length;
        //Start Gate and End Gate count as 1 gate when spacing
        if(this.enabledSpawners[0] && this.enabledSpawners[1])
        {
            //If both gates enabled, no forced offset
            forceOffset = 0;
            spawnersLength--;
        }
        
        //Initial values
        let yPos = this.coords.ybottom+0.5;
        let left = this.coords.xleft-0.6;
        let right = this.coords.xright-0.5;

        //Spacing between gates
        let spacing = (right + Math.abs(left)) / spawnersLength;

        //Spawn the gates in
        for (let i = 0; i < this.spawners.length; i++)
        {
            //Apply Pos
            if(this.spawners[i] instanceof StartGate)
            {
                this.spawners[i].pos.y = yPos;
                this.spawners[i].pos.x = left+spacing;
            }
            else if(this.spawners[i] instanceof EndGate)
            {
                this.spawners[i].pos.y = yPos;
                this.spawners[i].pos.x = left+spacing;
            }
            else
            {
                
                this.spawners[i].pos.y = yPos;
                this.spawners[i].pos.x = left + (i+forceOffset) * spacing;
            }
        }
    }
}