class Sidebar
{
    constructor(coords, circuit, origin, enabledSpawners)
    {
        this.circuit = circuit;
        this.coords = coords;
        this.spawners = Array();
        this.origin = origin;

        //Start,end, buffer, not and nand or nor xor xnor
        this.enabledSpawners = enabledSpawners.split(",");

        this.DrawLeft = true;
        this.AddSpawners();
    }

    DeleteSpawners()
    {
        for(let i = 0; i < this.spawners.length;i++)
            this.spawners[i].DeleteGate(this.circuit);

        this.spawners = Array();
    }

    AddSpawners()
    {
        for (let i = 0; i < this.enabledSpawners.length; i++) 
        {
            let scale = (i == 0 || i == 1) ? 0.5 : 0.6;
            if(this.enabledSpawners[i] != "null")
            {
                let gate = eval(`new ${this.enabledSpawners[i]}(undefined, ${scale}, this.circuit, this.origin)`);
                gate.spawner = true;
                this.spawners.push(gate);
                this.circuit.push(gate);
            }
        }
    }

    DeleteCanvasGates()
    {
        for(let i = 0; i < this.circuit.length;i++)
        {
            let index = this.GetGateIndex(this.circuit[i].constructor.name);
            if(index != -1 && this.enabledSpawners[index] == "null")
                this.circuit[i--].DeleteGate(this.circuit);
        }
    }

    ChangeSpawners(enabledSpawners)
    {
        this.enabledSpawners = enabledSpawners.split(",");
        this.DeleteSpawners();
        this.AddSpawners();
        this.DeleteCanvasGates();
    }

    CheckSpawnersCheckBoxes()
    {
        if(document.getElementById("id_buffergate") == null)
            return;

        let bufferGate = document.getElementById("id_buffergate").checked ? "BufferGate" : "null";
        let notGate = document.getElementById("id_notgate").checked ? "NotGate" : "null";
        let andGate = document.getElementById("id_andgate").checked ? "AndGate" : "null";
        let nandGate = document.getElementById("id_nandgate").checked ? "NandGate" : "null";
        let orGate = document.getElementById("id_orgate").checked ? "OrGate" : "null";
        let norGate = document.getElementById("id_norgate").checked ? "NorGate" : "null";
        let xorGate = document.getElementById("id_xorgate").checked ? "XorGate" : "null";
        let xnorGate = document.getElementById("id_xnorgate").checked ? "XnorGate" : "null";

        let enabledSpawners = `StartGate,EndGate,${bufferGate},${notGate},${andGate},${nandGate},${orGate},${norGate},${xorGate},${xnorGate}`;

        if(this.enabledSpawners != enabledSpawners)
            this.ChangeSpawners(enabledSpawners);
    }

    GetGateIndex(gate)
    {
        let index = -1;
        switch (gate) 
        {
            case 'StartGate':
                index = 0;
                break;
            case 'EndGate':
                index = 1;
                break;
            case 'BufferGate':
                index = 2;
                break;
            case 'NotGate':
                index = 3;
                break;
            case 'AndGate':
                index = 4;
                break;
            case 'NandGate':
                index = 5;
                break;
            case 'OrGate':
                index = 6;
                break;
            case 'NorGate':
                index = 7;
                break;
            case 'XorGate':
                index = 8;
                break;
            case 'XnorGate':
                index = 9;
                break;
        }
        return index;
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
        //Check if the enabled spawners have changed (Lecture side only)
        this.CheckSpawnersCheckBoxes();

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
        if(this.enabledSpawners[0] != "null" && this.enabledSpawners[1] != "null")
        {
            //If both gates enabled, no forced offset
            forceOffset = 0;
            spawnersLength--;
        }

        //Initial values
        let xPos = this.coords.xleft+0.75;
        let top = this.coords.ytop+0.35;
        let bottom = this.coords.ybottom+0.35;

        if(this.spawners.length < 8)
        {
            top = this.coords.ytop-0.35;
            spawnersLength++;
        }

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
        if(this.enabledSpawners[0] != "null" && this.enabledSpawners[1] != "null")
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