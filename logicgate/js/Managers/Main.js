class Main
{
    constructor(canvas)
    {
        //Canvas coordinates
        this.xleft = -4;
        this.xright = 4;
        this.ybottom = -3;
        this.ytop = 3;

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

        let startGate = new StartGate({x:-3,y:2.5}, this.circuit, true);
        this.circuit.push(startGate);

        let endGate = new EndGate({x:2,y:0}, this.circuit);
        this.circuit.push(endGate);

        let bufferGate = new BufferGate({x:-3,y:1}, this.circuit);
        this.circuit.push(bufferGate);
        
        let notGate = new NotGate({x:-3,y:0}, this.circuit);
        this.circuit.push(notGate);

        let andGate = new AndGate({x:-3,y:-1}, this.circuit);
        this.circuit.push(andGate);

        let nandGate = new NandGate({x:-3,y:-2.5}, this.circuit);
        this.circuit.push(nandGate);

        let orGate = new OrGate({x:-1,y:2.5}, this.circuit);
        this.circuit.push(orGate);

        let norGate = new NorGate({x:-1,y:1}, this.circuit);
        this.circuit.push(norGate);

        let xorGate = new XorGate({x:-1,y:0}, this.circuit);
        this.circuit.push(xorGate);

        let xnorGate = new XnorGate({x:-1,y:-1}, this.circuit);
        this.circuit.push(xnorGate);

        //Selection manager for clicking and dragging
        this.selectionManager = new SelectionManager(this.circuit);

        this.timer = Date.now();
        this.timerUpdate = 250;
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
        this.ApplyLimits(this.graphics,false);
        
        let time = this.timer - Date.now();
        //First Update the the charges
        if(time < 0)
        {
            this.ResetCircuit(); //Then Reset
            this.UpdateCircuitCharge();
            this.timer = Date.now() + this.timerUpdate;
        }

        //Then draw the circuit
        for(let i = 0; i < this.circuit.length; ++i)
        {
            //Only update gates if we are focused on canvas
            if(this.canvasFocused)
                this.circuit[i].Update();
            
            //Draw circuit
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
           var displayAspect = Math.abs(height / width);
           var requestedAspect = Math.abs(( this.ybottom-this.ytop ) / ( this.xright-this.xleft ));
           var excess;
           if (displayAspect > requestedAspect) 
           {
              excess = (this.ybottom-this.ytop) * (displayAspect/requestedAspect - 1);
              this.ybottom += excess/2;
              this.ytop -= excess/2;
           }
           else if (displayAspect < requestedAspect) 
           {
              excess = (this.xright-this.xleft) * (requestedAspect/displayAspect - 1);
              this.xright += excess/2;
              this.xleft -= excess/2;
           }
        }
        var pixelWidth = Math.abs(( this.xright - this.xleft ) / width);
        var pixelHeight = Math.abs(( this.ybottom - this.ytop ) / height);
        this.pixelSize = Math.min(pixelWidth,pixelHeight);
        graphics.scale( width / (this.xright-this.xleft), height / (this.ybottom-this.ytop) );
        graphics.translate( -this.xleft, -this.ytop );
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