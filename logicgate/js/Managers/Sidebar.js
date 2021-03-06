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
        //Delete the gates
        for(let i = 0; i < this.spawners.length;i++)
            this.spawners[i].DeleteGate(this.circuit);

        this.spawners = Array();
    }

    AddSpawners()
    {
        //Loop over enabled spawners
        for (let i = 0; i < this.enabledSpawners.length; i++) 
        {
            //Set a scale for now
            let scale = (i == 0 || i == 1) ? 0.5 : 0.6;
            if(this.enabledSpawners[i] != "null")
            {
                //Spawn the gate and set some properties
                let gate = eval(`new ${this.enabledSpawners[i]}(undefined, ${scale}, undefined, this.circuit, this.origin)`);
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
            let index = this.circuit[i].GetGateIndex();
            if(index != -1 && this.enabledSpawners[index] == "null")
                this.circuit[i--].DeleteGate(this.circuit);
        }
    }

    ChangeSpawners(enabledSpawners)
    {
        //Make the new string an array and add/remove the gates as needed
        this.enabledSpawners = enabledSpawners.split(",");
        this.DeleteSpawners();
        this.AddSpawners();
        this.DeleteCanvasGates();
    }

    CheckSpawnersCheckBoxes()
    {
        //Check if there is the buffer gate id, we will use this to determine what gates should be shown or not if it exists
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