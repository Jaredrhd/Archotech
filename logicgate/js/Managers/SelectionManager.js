class SelectionManager
{
    constructor(circuit, coords)
    {
        this.circuit = circuit;
        this.selected = null;
        this.justSpawned = false;

        this.coords = coords;
    }

    Update()
    {
        console.log(Input.GetMousePos().x - (this.coords.xleft + 2) < 0);
        //Check if we clicked
        if(Input.GetMouseButtonDown(0))
        {
            this.selected = this.GetNearestGate();
            //If we get here and we have a selected, give it some properties for offset and whatnot
            if(this.selected)
            {
                //If the selected is a spawner
                if(this.selected.spawner)
                {
                    //Get a the spawner constructor and spawn it
                    let spawnerClass = this.selected.constructor;
                    this.selected = new spawnerClass(Input.GetMousePos(), undefined, this.circuit);
                    //Add it to the circuit
                    this.circuit.push(this.selected);
                    this.justSpawned = true;
                }
                this.selected.offset = Object.assign({}, Input.GetMousePos());
                this.selected.offset.x -= this.selected.pos.x;
                this.selected.offset.y -= this.selected.pos.y;
            }
        }
        
        //If we have selected the node, and the mouse is still held down, drag it
        if(this.selected && Input.GetMouseButton(0))
        {
            //If the selected update returns a gate, use it as the newly selected
            let newSelected = this.selected.SelectedUpdate(true, null, this.justSpawned);
            if(newSelected != null)
                this.selected = newSelected;
        }
        else if(this.selected)
        {
            //Find the nearest gate to where we dropped
            let gate = this.GetNearestGate();

            //Don't return the same gate to itself      TODO Maybe connect to itself in future
            if(gate === this.selected)
                gate = null;

            this.selected.SelectedUpdate(false, gate);
            this.selected = null; 
            this.justSpawned = false;
        }
    }

    GetNearestGate()
    {
        let mousePos = Input.GetMousePos();
        let maxDistance = Number.MAX_VALUE;
        let gate = null;
        for (let i = 0, length = this.circuit.length; i < length; i++) 
        {
            if(!this.circuit[i].selectable)
                continue;
            //Get distance to this gate from the mouse
            let distance = this.circuit[i].GetDistanceToPoint(mousePos);

            //make sure distance is close enough and it is the closest
            if(distance < this.circuit[i].radius && distance < maxDistance)
            {
                gate = this.circuit[i];
                maxDistance = distance;
            }
        }

        return gate;
    }
}