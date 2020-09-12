class Manager
{
    constructor()
    {
        //Make an array of the circuits (mains)
        this.circuits = new Array();
        this.canvases = new Array();

        //Start adding canvases to the screen
        let scripts = document.getElementsByClassName("init");

        for(let i = 0; i < scripts.length;i++)
        {
            //Get the div
            let canvasDiv = scripts[i].previousElementSibling;

            //Create canvas
            let canvas = document.createElement("canvas");
            canvas.width = "800";
            canvas.height = "600";
            canvas.style = "display:block";

            //Add canvas to div
            canvasDiv.appendChild(canvas);

            //Make sure browser supports canvas
            if (!canvas.getContext) 
            {
                document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
                return;
            }
            this.canvases.push(canvas);

            //Add the circuit to the list
            this.circuits.push(new Main(canvas));
        }

        //Start the program
        this.Update();
    }

    Update()
    {
        //Bind the animation request to this
        requestAnimationFrame(this.Update.bind(this));

        for(let i = 0, length = this.canvases.length; i < length; i++)
            //Canvas.canvasDiv.answerSpan.Holder
            this.canvases[i].width = this.canvases[i].parentElement.parentElement.parentElement.clientWidth-40;

        //Render each circuit
        for(let i = 0, length = this.circuits.length; i < length; i++)
            this.circuits[i].Render();

        //Update global classes
        Input.Update();
    }
}