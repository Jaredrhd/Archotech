class Main
{
    constructor(canvas)
    {
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
        this.sidebar = new Sidebar(this.coords, this.circuit, this.origin);

        //Selection manager for clicking and dragging
        this.selectionManager = new SelectionManager(this.circuit, this.coords, this.origin);

        this.timer = Date.now();
        this.timerUpdate = 250;
    }

    Render()
    {
        //Apply limits to canvas, graphics
        this.ApplyLimits(this.graphics, true);

        //Save
        this.graphics.save();
        this.graphics.lineWidth = this.pixelSize;

        //Set color
        this.graphics.fillStyle = "white";  // background color
        this.graphics.fillRect(0,0,this.canvas.width,this.canvas.height);
        
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
            //Only update gates if we are focused on canvas
            this.circuit[i].Update();
            
            //Draw Wires
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
            this.selectionManager.Update();

        //restore
        this.graphics.restore();
    }

    UpdateCircuitCharge()
    {
        let startNodes = Array();
        //Find all start nodes
        for(let i = 0; i < this.circuit.length; ++i)
        {
            if(this.circuit[i] instanceof StartGate)
                startNodes.push(this.circuit[i]);
        }

        for(let i = 0; i < startNodes.length; ++i)
        {
            startNodes[i].UpdateCharge();
        }
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

    ApplyLimits(graphics, preserveAspect) 
    {
        var width = this.canvas.width;   // The width of this drawing area, in pixels.
        var height = this.canvas.height; // The height of this drawing area, in pixels.

        if (preserveAspect) 
        {
               // Adjust the limits to match the aspect ratio of the drawing area.
            //    var displayAspect = Math.abs(height / width);
            //    var requestedAspect = Math.abs(( this.coords.ybottom-this.coords.ytop ) / ( this.coords.xright-this.coords.xleft ));
            //    var excess;
               
            //    excess = (this.coords.ybottom-this.coords.ytop) * (displayAspect/requestedAspect - 1);
            //    this.coords.ybottom += excess/2;
            //    this.coords.ytop -= excess/2;
   
            //    if(this.coords.ytop < 3)
            //    {
            //        this.coords.ytop = 3;
            //        this.coords.ybottom = -3;
            //        excess = (this.coords.xright-this.coords.xleft) * (requestedAspect/displayAspect - 1);
            //        this.coords.xright += excess/2;
            //        this.coords.xleft -= excess/2;
            //    }
        }
        
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