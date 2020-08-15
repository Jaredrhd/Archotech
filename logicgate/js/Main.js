class Main
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.graphics = canvas.getContext("2d");
        this.circuit = Array();

        let andGate = new StartGate();
        this.circuit.push(andGate);

        this.Render();
    }

    Render()
    {
        //Bind the animation request to this render
        requestAnimationFrame(this.Render.bind(this));
        this.graphics.save();

        //Set color
        this.graphics.fillStyle = "white";  // background color
        this.graphics.fillRect(0,0,this.canvas.width,this.canvas.height);


        //Apply limits to canvas, graphics, xLeft, xRight, yTop, yBottom
        this.ApplyLimits(this.graphics,-4,4,-3,3,false);

        //Draw the circuit
        for(let i = 0, length = this.circuit.length; i < length; i++)
        {
            this.circuit[i].Draw(this.graphics);
        }

        //restore
        this.graphics.restore();
    }

    ApplyLimits(graphics, xleft, xright, ytop, ybottom, preserveAspect) {
        var width = this.canvas.width;   // The width of this drawing area, in pixels.
        var height = this.canvas.height; // The height of this drawing area, in pixels.
        if (preserveAspect) {
              // Adjust the limits to match the aspect ratio of the drawing area.
           var displayAspect = Math.abs(height / width);
           var requestedAspect = Math.abs(( ybottom-ytop ) / ( xright-xleft ));
           var excess;
           if (displayAspect > requestedAspect) {
              excess = (ybottom-ytop) * (displayAspect/requestedAspect - 1);
              ybottom += excess/2;
              ytop -= excess/2;
           }
           else if (displayAspect < requestedAspect) {
              excess = (xright-xleft) * (requestedAspect/displayAspect - 1);
              xright += excess/2;
              xleft -= excess/2;
           }
        }
        graphics.scale( width / (xright-xleft), height / (ybottom-ytop) );
        graphics.translate( -xleft, -ytop );
     }
}