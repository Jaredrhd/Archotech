class SelectionManager
{
    constructor(circuit, coords, origin, restrictions)
    {
        this.restrictions = restrictions.split(",");
        for(var i=0; i<this.restrictions.length;i++) this.restrictions[i] = +this.restrictions[i];
        this.circuit = circuit;
        this.selected = null;
        this.justSpawned = false;

        this.coords = coords;
        this.origin = origin;
    }

    Update()
    {
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
                    this.SpawnGate();
                }
                this.selected.offset = Object.assign({}, Input.GetMousePos());
                this.selected.offset.x -= this.selected.pos.x;
                this.selected.offset.y -= this.selected.pos.y;
            }
            else
            {
                this.selected = this.origin;
                this.selected.offsetX = Input.GetMousePos().x - this.origin.x;
                this.selected.offsetY = Input.GetMousePos().y - this.origin.y;
            }
        }
        
        //If we have selected the origin, pan the canvas instead
        if(this.selected == this.origin && Input.GetMouseButton(0))
        {
            let mousePos = Object.assign({}, Input.GetMousePos());
            mousePos.x -= this.selected.offsetX;
            mousePos.y -= this.selected.offsetY;
    
            //Set position
            this.origin.x = mousePos.x;
            this.origin.y = mousePos.y;

        }
        //If we have selected the node, and the mouse is still held down, drag it
        else if(this.selected && Input.GetMouseButton(0))
        {
            //If the selected update returns a gate, use it as the newly selected
            let newSelected = this.selected.SelectedUpdate(true, null, this.justSpawned);
            if(newSelected != null)
            {
                this.selected = newSelected;
                if(newSelected.spawner)
                    this.SpawnGate();
            }
        }
        else if(this.selected)
        {
            if(this.selected == this.origin )
            {
                this.selected = null; 
                return;
            }
            //Find the nearest gate to where we dropped
            let gate = this.GetNearestGate();

            //Don't return the same gate to itself
            if(gate != null && (gate === this.selected || (gate.spawner || (gate.parent && gate.parent.spawner))))
                gate = null;

            //Don't delete if it is an outgoing node since its a wire, or the start gate wire
            let shouldDeleteGate = !(this.selected instanceof OutgoingNode || (this.selected instanceof StartGate && this.selected.outgoingNodes.spawnedWire));
            if(shouldDeleteGate && Input.GetMousePos().x - (this.coords.xleft + 1.5) < 0)
                this.selected.DeleteGate(this.circuit);
            else
                this.selected.SelectedUpdate(false, gate);
            
            this.selected = null; 
            this.justSpawned = false;
        }
    }

    SpawnGate()
    {
        //Get a the spawner constructor and spawn it
        let spawnerClass = this.selected.constructor;

        let count = Array(10).fill(0);
        for (let i = 0; i < this.circuit.length; i++) 
        {
            if((this.circuit[i] instanceof Wire || this.circuit[i] instanceof IncomingNode || 
                this.circuit[i] instanceof OutgoingNode || this.circuit[i].spawner)) 
                continue;
            
            ++count[this.GetGateIndex(this.circuit[i].constructor.name)];
        }

        let gateIndex = this.GetGateIndex(spawnerClass.name);
        if(this.restrictions[gateIndex] != 0 && count[gateIndex] >= this.restrictions[gateIndex])
            return;

        this.selected = new spawnerClass(undefined, 0.7, this.circuit, this.origin);
        
        //Set the position
        this.selected.pos.x = Input.GetMousePos().x - this.origin.x;
        this.selected.pos.y = Input.GetMousePos().y - this.origin.y;

        //Add it to the circuit
        this.circuit.push(this.selected);
        this.justSpawned = true;
    }

    GetGateIndex(gate)
    {
        let index = -1;
        switch (gate) 
        {
            case 'StartGate':
                index = 0;
                break;
            case 'EndGate':
                index = 1;
                break;
            case 'BufferGate':
                index = 2;
                break;
            case 'NotGate':
                index = 3;
                break;
            case 'AndGate':
                index = 4;
                break;
            case 'NandGate':
                index = 5;
                break;
            case 'OrGate':
                index = 6;
                break;
            case 'NorGate':
                index = 7;
                break;
            case 'XorGate':
                index = 8;
                break;
            case 'XnorGate':
                index = 9;
                break;
        }
        return index;
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