class OutgoingNode extends LogicGate
{
    constructor()
    {
        this.outgoingConnections = Array();
        this.outgoingConnectionsNeeded = outgoingConnectionsNeeded;
    }

    AddOutgoingConnection(gate)
    {
        this.outgoingConnections.push(gate);
    }
    
    SelectedUpdate(){}
}