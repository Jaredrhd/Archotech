class Manager
{
    constructor()
    {

        //Make an array of the circuits (mains)
        let circuits = new Array();

        //Start adding canvases to the screen
        let scripts = document.getElementsByClassName("init");

        for(let i = 0; i < scripts.length;i++)
        {
            //Get the fiv
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

            //Add the circuit to the list
            circuits.push(new Main(canvas));
        }
    }
}