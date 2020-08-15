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
        this.canvas = canvas;
        this.graphics = canvas.getContext("2d");

        //Circuit stuff
        this.circuit = Array();

        //Temp for testing
        let andGate = new StartGate();
        this.circuit.push(andGate);

        this.mousePos = {x:0,y:0};

        this.canvas.onmousemove = this.GetMousePos.bind(this);

        this.Render();
    }

    Render()
    {
        //Bind the animation request to this render
        requestAnimationFrame(this.Render.bind(this));
        this.graphics.save();
        this.graphics.lineWidth = this.pixelSize;
        //Set color
        this.graphics.fillStyle = "white";  // background color
        this.graphics.fillRect(0,0,this.canvas.width,this.canvas.height);

        //Apply limits to canvas, graphics, xLeft, xRight, yTop, yBottom
        this.ApplyLimits(this.graphics,false);


        //Draw the circuit
        for(let i = 0, length = this.circuit.length; i < length; i++)
        {
            this.circuit[i].Update(this.mousePos);
            this.circuit[i].Draw(this.graphics);
        }

        //restore
        this.graphics.restore();
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

    //Get Mouse Position based on coordinate system we are using
    GetMousePos(evt) 
    {
        var rect = this.canvas.getBoundingClientRect();
        let width = rect.width;
        let height= rect.height;
        
        //Calculate ratio
        let x = width / (this.xright-this.xleft);
        let y = height / (this.ybottom-this.ytop);

        
        //Return mouse position
        this.mousePos = {
            x: ((evt.clientX - rect.left)/x)+this.xleft,
            y: ((evt.clientY - rect.top)/y)+this.ytop
        };
    }
}