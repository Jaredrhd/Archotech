class Main
{
    constructor(canvas, saveField, properties)
    {
        this.saveField = saveField;
        this.properties = properties;
        //Canvas coordinates
        this.coords = {xleft : -4, xright : 4, ybottom : -3, ytop : 3};
        this.origin = {x : 0, y : 0, offsetX : 0, offsetY : 0};

        //Set up canvas properties
        this.pixelSize = 1;
        this.canvasFocused = false;
        this.canvas = canvas;
        this.graphics = canvas.getContext("2d");
        this.canvas.onmousemove = Input.UpdateMousePos.bind(this);
        this.canvas.onmouseleave = this.OnCanvasLeave.bind(this);
        this.canvas.onmouseenter = this.OnCanvasEnter.bind(this);
        
        //Circuit stuff
        this.circuit = Array();
        this.sidebar = new Sidebar(this.coords, this.circuit, this.origin, properties.getAttribute("spawners"));

        //Selection manager for clicking and dragging
        this.selectionManager = new SelectionManager(this.circuit, this.coords, this.origin);

        this.timer = Date.now();
        this.timerUpdate = 250;

        //Set up the previous save
        this.LoadCircuit(properties.getAttribute("save").split(";")[0]);
    }

    Render()
    {
        //Save
        this.graphics.save();
        this.graphics.lineWidth = this.pixelSize;

        //Set color
        this.graphics.fillStyle = "white";  // background color
        this.graphics.fillRect(0,0,this.canvas.width,this.canvas.height);

        //Apply limits to canvas, graphics
        this.ApplyLimits(this.graphics);
        
        let time = this.timer - Date.now();
        //First Update the the charges
        if(time < 0)
        {
            this.ResetCircuit(); //Then Reset
            this.UpdateCircuitCharge();
            this.timer = Date.now() + this.timerUpdate;
        }

        //Draw Sidebar and update the gates on it
        this.sidebar.Draw(this.graphics);
        this.sidebar.Update();

        //Draw Wires first and update circuit
        for(let i = 0; i < this.circuit.length; ++i)
        {
            //Update the gate
            this.circuit[i].Update();
            
            //Draw Wires first so they are under
            if(this.circuit[i] instanceof Wire)
                this.circuit[i].Draw(this.graphics);
        }

        //Then draw the circuit
        for(let i = 0; i < this.circuit.length; ++i)
        {
            //Wires and Nodes are drawn separately
            if(!(this.circuit[i] instanceof Wire || this.circuit[i] instanceof IncomingNode || this.circuit[i] instanceof OutgoingNode))
                this.circuit[i].Draw(this.graphics);
        }

        //Update the selection manager
        if(this.canvasFocused)
        {
            this.selectionManager.Update();
            this.SaveCircuit();
        }

        //restore
        this.graphics.restore();
    }

    UpdateCircuitCharge(startNodes, endNodes)
    {
        let save = "";
        //If we don't have the start nodes, calculate them and update the circuit once (For drawing looks)
        if(startNodes == null)
        {
            //Get StartGates
            let startNodes = this.GetStartNodes();

            for(let i = 0; i < startNodes.length; ++i)
                startNodes[i].UpdateCharge();
        }
        else
        {
            let old = Array();

            //Set to start behaviour
            for(let j = 0; j < startNodes.length; ++j)
                old.push(startNodes[j].charge);

            //In this case we provided the startNodes, so we are gonna calculate the circuit charge foreach combination of start gates being on and off
            for(let i = 0, length = Math.pow(2,startNodes.length); i < length; ++i)
            {
                //Get binary number
                let bin = (i >>> 0).toString(2).padStart(startNodes.length,"0");

                for(let j = 0; j < startNodes.length; j++)
                    startNodes[j].charge = bin[j] == "1";

                for(let j = 0; j < startNodes.length; ++j)
                    startNodes[j].UpdateCharge();
                
                //Save the updated circuit
                save += this.ExtractEndGatesData(endNodes) + ";";
                this.ResetCircuit();

            }

            //Copy back to previous values
            for(let j = 0; j < startNodes.length; ++j)
                startNodes[j].charge = old[j];

            //Update to recalculate charge
            this.UpdateCircuitCharge();
        }

        return save;
    }

    ResetCircuit()
    {
        for(let i = 0; i < this.circuit.length; ++i)
        {
            //If we never visited the circuit, it's not part of the main circuit, deactivate it's charge
            if(!this.circuit[i].visited && !this.circuit[i].updated)
                this.circuit[i].charge = false;

            //Reset for next loop
            this.circuit[i].visited = false;

            //Reset updated unless it's a start gate. Start gates don't update
            if(!(this.circuit[i] instanceof StartGate))
                this.circuit[i].updated = false;
        }
    }

    SaveCircuit()
    {
        //Save the current circuit
        this.saveField.value = this.BuildCircuit();

        //Get Nodes
        let startNodes = this.GetStartNodes();
        let endNodes = this.GetEndNodes();

        //Update all
        if(startNodes.length > 0)
            this.saveField.value += ";" + startNodes.length + "," + endNodes.length + ";" + this.UpdateCircuitCharge(startNodes, endNodes);
    }

    GetStartNodes()
    {
        //Get start nodes for calculating all charges in the circuit
        let startNodes = Array();
        //Find all start nodes
        for(let i = 0; i < this.circuit.length; ++i)
        {
            if(!this.circuit[i].spawner && this.circuit[i] instanceof StartGate)
                startNodes.push(this.circuit[i]);
        }
        //Sort by y position
        startNodes.sort(function(a,b){return b.position.y - a.position.y});

        return startNodes;
    }

    GetEndNodes()
    {
        let endNodes = Array();
        //Find all start nodes
        for(let i = 0; i < this.circuit.length; ++i)
        {
            if(!this.circuit[i].spawner && this.circuit[i] instanceof EndGate)
            endNodes.push(this.circuit[i]);
        }
        //Sort by y position
        endNodes.sort(function(a,b){return b.position.y - a.position.y});

        return endNodes;
    }

    LoadCircuit(save)
    {
        if(save=="SAVED_DATA" || save=="")
            return;

        //Set Scale
        let scale = 0.7;
        let newIDs = Object();
        save = save.split("|")

        //Spawn Gates
        for(let i = 0; i < save.length; i++)
        {
            //Split
            let data = save[i].split(",");
            
            //Spawn gate
            let gateToSpawn = `new ${data[1]}({x:${data[2]},y:${data[3]}}, ${scale}, this.circuit, this.origin)`;
            let gate = eval(gateToSpawn);

            //Set charge and push to circuit
            gate.charge = data[4] == "true";
            this.circuit.push(gate);

            //For mapping previous saves ID to the new Save ID
            newIDs[data[0]] = this.circuit.length-1;
        }

        //Set up connections
        for(let i = 0; i < save.length; i++)
        {
            let fullData = save[i].split(",");

            //Skip end gate since this is for setting up outgoing connections
            if(fullData[1] == "EndGate")
                continue;
            
            //Get the outgoing connections
            let data = fullData[5];
            data = data.substring(1,data.length-1);
            data = data.split("/");

            //Make sure we have an actual connection
            if(data.length == 1 && data[0] == "")
                continue;

            //The NewID from one save to the next of the current gate
            let newID = newIDs[fullData[0]];

            //Loop over outgoing connections and set them up
            for(let j = 0; j < data.length; j++)
            {
                //The NewID of the gate we want to connect to
                let keyValue = data[j].split(":");
                let newConnectionID = newIDs[keyValue[0]];
                this.circuit[newID].outgoingNodes.AddSpecificConnections(this.circuit[newConnectionID], parseInt(keyValue[1]));
            }
        }
    }

    BuildCircuit()
    {
        let save = "";

        for(let i = 0; i < this.circuit.length; i++)
        {
            //Skip Wires or nodes
            if((this.circuit[i] instanceof Wire || this.circuit[i] instanceof IncomingNode || 
                this.circuit[i] instanceof OutgoingNode || this.circuit[i].spawner)) 
                continue;

            //[outputConnections] = [idx:0 , idy:1, idz,0] where idx is id of gate and :0 is first input connection
            //id,Gate,x,y,charge,[outputConnections]|...
            save += i + "," + this.circuit[i].constructor.name + "," + 
                this.circuit[i].pos.x.toFixed(2) + "," + this.circuit[i].pos.y.toFixed(2) + "," + this.circuit[i].charge + ",[";

            //Check that this has a outgoing node (EndGate the exception)
            if(this.circuit[i].outgoingNodes)
            {
                //Cache outgoing connections
                let outgoing = this.circuit[i].outgoingNodes.outgoingConnections;

                //loop over connections
                for(let j = 0; j < outgoing.length; j++)
                {
                    //Get the gate it is connected to
                    let gateID = this.circuit.indexOf(outgoing[j].gate.parent);
                    
                    if(this.circuit[gateID].incomingNodes[0] == outgoing[j].gate)
                        save += gateID + ":0:" + this.circuit[gateID].constructor.name;
                    else
                        save += gateID + ":1:" + this.circuit[gateID].constructor.name;

                    //Add to the save
                    if(j != outgoing.length -1) 
                        save += "/";
                }
                save += "]";
            }
            else
                save += "]"
            
            save += "|"
        }

        //Remove the last | 
        return save.substring(0, save.length-1);
    }

    ExtractEndGatesData(endNodes)
    {
        let save = "";

        for(let i = 0; i < endNodes.length;i++)
        {
            save += endNodes[i].charge;
            if(i != endNodes.length-1)
                save += ","
        }

        return save;
    }

    ApplyLimits(graphics) 
    {
        var width = this.canvas.width;   // The width of this drawing area, in pixels.
        var height = this.canvas.height; // The height of this drawing area, in pixels.

        var pixelWidth = Math.abs(( this.coords.xright - this.coords.xleft ) / width);
        var pixelHeight = Math.abs(( this.coords.ybottom - this.coords.ytop ) / height);
        this.pixelSize = Math.min(pixelWidth,pixelHeight) + 0.01;
        graphics.scale( width / (this.coords.xright-this.coords.xleft), height / (this.coords.ybottom-this.coords.ytop) );
        graphics.translate( -this.coords.xleft, -this.coords.ytop );
    }

    //For unfocusing canvas
    OnCanvasLeave()
    {
        this.canvasFocused = false;
    }

    //For focusing canvas
    OnCanvasEnter()
    {
        this.canvasFocused = true;
    }

}