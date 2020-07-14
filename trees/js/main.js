onload = init;

let canvas, context;
let tree = null;
const nodeValue = document.getElementById("node-value");
const addNodeButton = document.getElementById("add-node");

function init() {
    canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
        document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
        return;
    }

    context = canvas.getContext("2d");

    initListeners();
}

function initListeners() {
    addNodeButton.addEventListener("click", addNode);
}

function addNode() {
    if(nodeValue.value === "") return; // No value for node

    if(!tree) { // Tree is empty
        tree = new Tree(Number(nodeValue.value));
        addNodeButton.innerHTML = "ADD NODE";
    }
    else {

    }
}

function draw() {

}

//------------------- A Simple Scene Object-Oriented Scene Graph API ----------------
    
/**
 * The (abstract) base class for all nodes in the scene graph data structure.
 */
function SceneGraphNode() {
    this.fillColor = null;   // If non-null, the default fillStyle for this node.
    this.strokeColor = null; // If non-null, the default strokeStyle for this node.
}
SceneGraphNode.prototype.doDraw = function(g) {
        // This method is meant to be abstract and must be OVERRIDDEN in an actual
        // object. It is not meant to be called; it is called by draw().
    throw "doDraw not implemented in SceneGraphNode"
}
SceneGraphNode.prototype.draw = function(g) {
        // This method should be CALLED to draw the object It should NOT
        // ordinarily be overridden in subclasses.
    graphics.save();
    if (this.fillColor) {
        g.fillStyle = this.fillColor;
    }
    if (this.strokeColor) {
        g.strokeStyle = this.strokeColor;
    }
    this.doDraw(g);
    graphics.restore();
}
SceneGraphNode.prototype.setFillColor = function(color) {
        // Sets fillColor for this node to color.
        // Color should be a legal CSS color string, or null.
    this.fillColor = color;
    return this;
}
SceneGraphNode.prototype.setStrokeColor = function(color) {
        // Sets strokeColor for this node to color.
        // Color should be a legal CSS color string, or null.
    this.strokeColor = color;
    return this;
}
SceneGraphNode.prototype.setColor = function(color) {
        // Sets both the fillColor and strokeColor to color.
        // Color should be a legal CSS color string, or null.
    this.fillColor = color;
    this.strokeColor = color;
    return this;
}

/**
 *  Defines a subclass, CompoundObject, of SceneGraphNode to represent
 *  an object that is made up of sub-objects.  Initially, there are no
 *  sub-objects.  Objects are added with the add() method.
 */
function CompoundObject() {
    SceneGraphNode.call(this);  // do superclass initialization
    this.subobjects = [];  // the list of sub-objects of this object
}
CompoundObject.prototype = new SceneGraphNode(); // (makes it a subclass!)
CompoundObject.prototype.add = function(node) {
    this.subobjects.push(node);
    return this;
}
CompoundObject.prototype.doDraw = function(g) {
        // Just call the sub-objects' draw() methods.
    for (var i = 0; i < this.subobjects.length; i++)
        this.subobjects[i].draw(g);
}

    /**
 *  Define a subclass, TransformedObject, of SceneGraphNode that
 *  represents an object along with a modeling transformation to
 *  be applied to that object.  The object must be specified in
 *  the constructor.  The transformation is specified by calling
 *  the setScale(), setRotate() and setTranslate() methods. Note that
 *  each of these methods returns a reference to the TransformedObject
 *  as its return value, to allow for chaining of method calls.
 *  The modeling transformations are always applied to the object
 *  in the order scale, then rotate, then translate.
 */
function TransformedObject() {
    SceneGraphNode.call(this);  // do superclass initialization
}

TransformedObject.prototype = new SceneGraphNode();  // (makes it a subclass!)
TransformedObject.prototype.setRotation = function(angle) {
    // Set the angle of rotation, measured in DEGREES.  The rotation
    // is always about the origin.
    this.rotationInDegrees = angle;
    return this;
}
TransformedObject.prototype.setScale = function(sx, sy) {
    // Sets scaling factors.
    this.scaleX = sx;
    this.scaleY = sy;
    return this;
}
TransformedObject.prototype.setTranslation = function(dx,dy) {
    // Set translation mounts.
    this.translateX = dx;
    this.translateY = dy;
    return this;
}
TransformedObject.prototype.doDraw = function(g) {
        // Draws the object, with its modeling transformation.
    g.save();
    if (this.translateX != 0 || this.translateY != 0) {
        g.translate(this.translateX, this.translateY);
    }
    if (this.rotationInDegrees != 0) {
        g.rotate(this.rotationInDegrees/180*Math.PI);
    }
    if (this.scaleX != 1 || this.scaleY != 1) {
        g.scale(this.scaleX, this.scaleY);
    }
    this.object.draw(g);
    g.restore();
}

var treeNode = new SceneGraphNode();
treeNode.doDraw = function() {
    context.save();

    context.beginPath();
    context.arc(1.1, 0, 0.1, 0, 2*Math.PI);
    context.stroke();

    context.restore();
}

export {TransformedObject, treeNode};