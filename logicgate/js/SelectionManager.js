class SelectionManager
{
    constructor(circuit)
    {
        this.circuit = circuit;
        this.selected = null;
    }

    Update()
    {
        //Check if we clicked
        if(Input.GetMouseButtonDown(0))
        {
            let mousePos = Input.GetMousePos();
            let maxDistance = Number.MAX_VALUE;
            for (let i = 0, length = this.circuit.length; i < length; i++) 
            {
                //Get distance to this gate from the mouse
                let distance = this.circuit[i].GetDistanceToGate(mousePos);

                //make sure distance is close enough and it is the closest
                if(distance < this.circuit[i].radius && distance < maxDistance)
                {
                    this.selected = this.circuit[i];
                    maxDistance = distance;
                }
            }

            //If we get here and we have a selected, give it some properties
            if(this.selected)
            {
                this.selected.offset = Object.assign({}, Input.GetMousePos());
                this.selected.offset.x -= this.selected.pos.x;
                this.selected.offset.y -= this.selected.pos.y;
            }
        }

        //If we have selected the node, and the mouse is still held down, drag it
        if(this.selected && Input.GetMouseButton(0))
            this.selected.SelectedUpdate();
        else
            this.selected = null; //reset
    }
}