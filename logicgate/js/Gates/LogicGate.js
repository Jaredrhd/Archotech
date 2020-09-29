class LogicGate
{
    /**
     * @param {pos} Object {x,y} position
     * @param {scale} int scale of the logic gate
     * 
     */
    constructor(position = {x:0, y:0}, scale = 1, origin = {x : 0, y : 0, offsetX : 0, offsetY : 0})
    {
        this.charge = false;
        this.incomingNodes = Array();
        this.outgoingNodes = null;

        //The local position
        this.pos = position;
        this.origin = origin;

        //The global position
        this.position = position;
        
        this.scale = scale;

        this.radius = 0.55;
        this.selectable = true;

        //This is provided in the selection manager class. 
        this.offset = {x:0,y:0};

        this.visited = false;
        this.updated = false;
        this.spawner = false;
    }

    /**
     * Call this method to add the Incoming and Outgoing Nodes to the circuit so that selection manager works on them
     */
    AddNodesToCircuit(circuit)
    {
        circuit.push(this.outgoingNodes);

        for(let i = 0; i < this.incomingNodes.length;i++)
            circuit.push(this.incomingNodes[i]);
    }

    DeleteGate(circuit)
    {
        //If we have an outgoing node
        if(this.outgoingNodes)
        {
            //Remove outgoing node connections
            this.outgoingNodes.RemoveAllOutgoingConnections();
        
            //Remove outgoing node
            this.SliceCircuit(circuit, this.outgoingNodes.dragWire)
            this.SliceCircuit(circuit, this.outgoingNodes)
        }

        //Remove incoming nodes and their connections
        for(let i = 0; i < this.incomingNodes.length;i++)
        {
            this.incomingNodes[i].RemoveIncomingConnection();
            this.SliceCircuit(circuit, this.incomingNodes[i])
        }

        //Remove Gate
        this.SliceCircuit(circuit, this)
    }

    SliceCircuit(circuit,objToSlice)
    {
        let index = circuit.indexOf(objToSlice);
        if(index>=0)
            circuit.splice(index,1);
    }

    /**
     * This method is called when the gate/node has been selected
     */
    SelectedUpdate()
    {
        let mousePos = Object.assign({}, Input.GetMousePos());
        mousePos.x -= (this.offset.x);
        mousePos.y -= (this.offset.y);

        //Set position
        this.pos = mousePos;
    }

    UpdatePosition()
    {
        //Don't shift spawners, they have their own update method in SideBar
        if(this.spawner)
            return;

        //Update the global position for drawing
        this.position.x = this.pos.x + this.origin.x;
        this.position.y = this.pos.y + this.origin.y;
    }

    /**
     * This method is called when the canvas is focused on. Can be used for anything that needs to be updated per frame.
     */
    Update()
    {
    }

    CanUpdateCharge()
    {
        //If we have visited this node return to the previous one
        if(this.visited == true)
            return false;

        this.visited = true;

        //Check that we have all incoming connections
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(this.incomingNodes[i].incomingConnectionNode == null )
            {
                this.charge = false;
                return false;
            }
        }

        //Make sure both incoming connections are update
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(!this.incomingNodes[i].incomingConnectionNode.parent.updated)
                this.incomingNodes[i].incomingConnectionNode.parent.UpdateCharge();
        }

        return true;
    }

    /**
     * This method is called when the Logic Gate Charge needs to be calculated
     */
    UpdateCharge()
    {
        //ADD YOUR CODE HERE IN THE SPECIFIC GATE
        console.error("Need to add code to update charge in specific gate");
    }

    UpdateNextGate()
    {
        //If we don't have outgoing connections return
        if(!this.outgoingNodes.outgoingConnections)
            return;

        //Continue the charge forward
        for (let i = 0; i < this.outgoingNodes.outgoingConnections.length; i++) 
            this.outgoingNodes.outgoingConnections[i].gate.parent.UpdateCharge();
    }

    /**
     * Makes sure that the gate is correctly connected (Which means it has been updated)
     */
    Correct()
    {
        let correctlyConnected = true;
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(this.incomingNodes[i].incomingConnectionNode == null)
                correctlyConnected = false;
        }

        return this.visited && correctlyConnected;
    }

    /**
     * Returns the distance between a point and a gate
     */
    GetDistanceToPoint(point)
    {
        return Math.sqrt(Math.pow(this.position.x - point.x,2) + Math.pow(this.position.y - point.y,2));
    }

    /**
     * Returns the {X,Y} distance between a point and a gate
     */
    GetXYDistanceToPoint(point)
    {
        return {x:  point.x - this.position.x, y: point.y - this.position.y};
    }

     /**
     * By default this method will try to add a gate to a an open connection if it can. You can overwrite to change how incoming connections are added
     */
    AddIncomingConnection(gate)
    {
        for (let i = 0; i < this.incomingNodes.length; i++) 
        {
            if(this.incomingNodes[i].incomingConnectionNode == null)
            {
                return this.incomingNodes[i].AddIncomingConnection(gate);
            }
        }
    }

    /**
     * The function to draw a gate
     */
    Draw(graphics)
    {
        graphics.save();
        this.UpdatePosition();
        graphics.translate(this.position.x,this.position.y);
        graphics.scale(this.scale,this.scale);

        if(this.charge)
            graphics.fillStyle = "green";
        else
            graphics.fillStyle = "black";

        if(this.Correct())
            this.DrawCorrect(graphics);
        else
            this.DrawBroken(graphics);

        graphics.restore();
    }

    DrawCorrect()
    {
        //Draw an incorrect node to force the use of a proper draw gate function rather then the LogicGate Draw Correct
        DrawBroken();
    }

    DrawBroken()
    {
        graphics.beginPath();
        graphics.arc(0,0,0.5, 0.8 * Math.PI,  1.8 * Math.PI);
        graphics.stroke();
    }

    /**
     * The function to draw Incoming and Outgoing Nodes
     */
    DrawNodes(graphics)
    {
        graphics.save();
        this.outgoingNodes.Draw(graphics);

        for(let i = 0; i < this.incomingNodes.length;i++)
            this.incomingNodes[i].Draw(graphics);
        graphics.restore();
    }
}