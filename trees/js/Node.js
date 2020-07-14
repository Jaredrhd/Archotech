import {TransformedObject, treeNode} from "./main.js";

class Node {
    constructor(value) {
        this._value = value;
        this._outline = new TransformedObject(treeNode);
        this._children = {leftChild: null, rightChild: null};
    }

    get value() {
        return this._value;
    }   

    get outline() {
        return this._outline;
    }

    get children() {
        return this._children;
    }

    set leftChild(node) {
        this._children.leftChild = node;
    }

    set rightChild(node) {
        this._children.rightChild = node;
    }
}