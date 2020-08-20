class NotGate extends LogicGate
{
    constructor(pos = {x:0, y:0}, circuit)
    {
        super(pos);

        this.incomingNodes = [new IncomingNode({x:0,y:0}, circuit, this, {x:-1,y:0})];
        this.outgoingNodes = new OutgoingNode({x:0,y:0}, circuit, this, {x:1,y:0});


        for (let i = 0; i < this.incomingNodes.length; i++) 
            circuit.push(this.incomingNodes[i]);

        circuit.push(this.outgoingNodes);
    }

    UpdateCharge()
    {
        //If we have visited this node return to the previous one
        if(this.visited == true)
            return;

        this.visited = true;

        if(this.incomingNodes[0].incomingConnection == null)
        {
            this.charge = false;
            return null;
        }

        //Make sure both incoming connections are update
        if(!this.incomingNodes[0].incomingConnection.parent.updated)
            this.incomingNodes[0].incomingConnection.parent.UpdateCharge();

        //Calculate the new charge and pass forward
        this.charge = !this.incomingNodes[0].incomingConnection.parent.charge;
        this.updated = true;

        //If we don't have outgoing connections return
        if(!this.outgoingNodes.outgoingConnections)
            return;

        //Continue the charge forward
        for (let i = 0; i < this.outgoingNodes.outgoingConnections.length; i++) 
        {
            this.outgoingNodes.outgoingConnections[i].gate.parent.UpdateCharge();
        }
    }

    Draw(graphics)
    {
        graphics.save();
        graphics.translate(this.pos.x,this.pos.y);

        if(this.charge)
            graphics.fillStyle = 'white';
        else
            graphics.fillStyle = 'black';

        if(!this.Correct())
            this.DrawCorrect(graphics);
        else
            this.DrawBroken(graphics);

        graphics.restore();
    }

    DrawCorrect(graphics)
    {
        this.DrawBroken(graphics);
    }

    DrawBroken(graphics)
    {
        graphics.translate(-0.5, 0); // Centre at (0, 0)
        
        // Two line segments
        graphics.beginPath();
        graphics.moveTo(-0.5, 0);
        graphics.lineTo(0, 0);
        graphics.moveTo(1, 0);
        graphics.lineTo(1.5, 0);
        graphics.stroke();

        //Circle
        graphics.save();
        graphics.fillStyle = "white";
        graphics.beginPath();
        graphics.arc(1.135, 0, 0.1, 0, 2*Math.PI);
        graphics.fill();
        graphics.stroke();
        graphics.restore();

        //Triangle
        graphics.rotate(-Math.PI/2);
        graphics.beginPath();
        graphics.moveTo(-0.5,0);
        graphics.lineTo(0.5,0);
        graphics.lineTo(0,1);
        graphics.closePath();
        graphics.fill();
        graphics.stroke();
    }
}