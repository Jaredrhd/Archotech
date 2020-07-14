class Tree {
    constructor(rootValue) {
        this._root = new Node(rootValue);
    }

    addLeftChild(selectedNode, childValue) {
        selectedNode.leftChild = new Node(childValue);
    }

    addRightChild(selectedNode, childValue) {
        selectedNode.rightChild = new Node(childValue);
    }
}