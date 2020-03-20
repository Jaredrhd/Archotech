    var canvas;   // The canvas that is used as the drawing surface
    var graphics; // The 2D graphics context for drawing on the canvas.

    var X_LEFT = -4;    // The xy limits for the coordinate system.
    var X_RIGHT = 4;
    var Y_BOTTOM = -3;
    var Y_TOP = 3;
    
    var BACKGROUND = "white";  // The display is filled with this color before the scene is drawn.
         
    var pixelSize;  // The size of one pixel, in the transformed coordinates.
            
    var frameNumber = 0;  // Current frame number. goes up by one in each frame.

    var world;  // A SceneGraphNode representing the entire scene. 
    
    // TODO: Define global variables to represent animated objects in the scene.
    
    //Initialization of variables.
    var skyObject;
    //Variables for whether the propeller object's scale increases or decreases and what it's current scale is.
    var propellerToggle = 0;
    var propellerCount = 1;
    //Variable for what the current direction that the plane object is moving.
    var planeDirectionToggle = 0;
    //Variable for whether the airtrails of the plane are upside down or not.
    var airtrailsToggle = 0;
    //Variables for the current scale of the two cloud objects.
    var cloudOneScale = 1;
    var cloudTwoScale = 1;

    /**
     *  Builds the data structure that represents the entire picture.
     */
    function createWorld() {

        world = new CompoundObject();  // Root node for the scene graph.

        // TODO: Create objects and add them to the scene graph.

        //Assigning of the skyObject variable its sky object and its addition to the canvas.
        skyObject = new TransformedObject(sky);
        world.add(skyObject);

    }
    
    /**
     * This method is called just before each frame is drawn.  It updates the modeling
     * transformations of the objects in the scene that are animated.
     */
    function updateFrame() {
        frameNumber++;

        //Animation of the propeller of the plane.
        if (frameNumber % 2 == 0) {

            //If else block for whether the propeller's scale is being added to or subtracted from to simulate rotation from a side view perspective. At its maximum scale, the toggle is set to 0 to start subtracting from the scale; vice versa for its minimum scale.
            if (propellerCount == 1) {
                propellerToggle = 0;
            } else if (propellerCount == 0) {
                propellerToggle = 1;
            }

            //If else block to manage the addition or subtraction from the propeller's scale. The propeller's scale is rounded to 1 decimal place to account for any possible addition or subtraction inaccuracy. 
            if (propellerToggle == 0) {
                propellerCount = propellerCount - 0.1;
                propellerCount = Number(propellerCount.toFixed(1));
                skyObject.object.subobjects[3].object.subobjects[3].setScale(0.9*propellerCount, 0.9);
            } else if (propellerToggle == 1) {
                propellerCount = propellerCount + 0.1;
                propellerCount = Number(propellerCount.toFixed(1));
                skyObject.object.subobjects[3].object.subobjects[3].setScale(0.9*propellerCount, 0.9);
            }
        }

        //If else block for the vertical flipping of the airtrails of the plane.
        if (frameNumber % 10 == 0) {
            if (airtrailsToggle == 0) {
                airtrailsToggle = 1;
                skyObject.object.subobjects[3].object.subobjects[1].setScale(0.5, -0.5);;
                skyObject.object.subobjects[3].object.subobjects[5].setScale(0.625, -0.625);;
            } else {
                airtrailsToggle = 0;
                skyObject.object.subobjects[3].object.subobjects[1].setScale(0.5, 0.5);;
                skyObject.object.subobjects[3].object.subobjects[5].setScale(0.625, 0.625);;
            }
        }

        //Animation of the plane.
        if (frameNumber % 2 == 0) {

            //If else block for changing the direction through the changing of the toggles value when the plane travels when it reaches certain coordinates on the canvas.
            if (skyObject.object.subobjects[3].translateX == 0 && skyObject.object.subobjects[3].translateY == 0) {
                planeDirectionToggle = 0;
            } else if (skyObject.object.subobjects[3].translateX == -2 && skyObject.object.subobjects[3].translateY == 2) {
                planeDirectionToggle = 1;
            } else if (skyObject.object.subobjects[3].translateX == 0 && skyObject.object.subobjects[3].translateY == -2) {
                planeDirectionToggle = 2;
            } else if (skyObject.object.subobjects[3].translateX == 2 && skyObject.object.subobjects[3].translateY == 2) {
                planeDirectionToggle = 3;
            }

            //If else block to simulate flying of the plane by change the plane object's coordinates on the canvas. The coordinates or fixed to either 3 or 4 decimal places to account for any possible addition or subtraction inaccuracy.
            if (planeDirectionToggle == 0) {
                skyObject.object.subobjects[3].setTranslation(Number((skyObject.object.subobjects[3].translateX - 0.0125).toFixed(4)), Number((skyObject.object.subobjects[3].translateY + 0.0125).toFixed(4)));
            } else if (planeDirectionToggle == 1) {
                skyObject.object.subobjects[3].setTranslation(Number((skyObject.object.subobjects[3].translateX + 0.008).toFixed(3)), Number((skyObject.object.subobjects[3].translateY - 0.016).toFixed(3)));
            } else if (planeDirectionToggle == 2) {
                skyObject.object.subobjects[3].setTranslation(Number((skyObject.object.subobjects[3].translateX + 0.008).toFixed(3)), Number((skyObject.object.subobjects[3].translateY + 0.016).toFixed(3)));
            } else if (planeDirectionToggle == 3) {
                skyObject.object.subobjects[3].setTranslation(Number((skyObject.object.subobjects[3].translateX - 0.0125).toFixed(4)), Number((skyObject.object.subobjects[3].translateY - 0.0125).toFixed(4)));
            }
            
            //The scaling of the plane object based on the Y coordinate to simulate distance from the perpective of the viewer; the closer to the top of the canvas the plane object is, the smaller its scale and vice versa.
            var planeScalingFactor = Number(((2 - skyObject.object.subobjects[3].translateY)/4).toFixed(2)) + 0.5;
            skyObject.object.subobjects[3].setScale(0.5*planeScalingFactor, 0.5*planeScalingFactor);

        }

        //The movement of the two cloud objects with them moving leftwards towards the edge of the canvas. The rate of change of their coordinates is adjusted by their current scale with the cloudTwoScale and cloudOneScale storing their current scale.
        skyObject.object.subobjects[2].setTranslation(skyObject.object.subobjects[2].translateX - 0.0125*cloudTwoScale, skyObject.object.subobjects[2].translateY);
        skyObject.object.subobjects[4].setTranslation(skyObject.object.subobjects[4].translateX - 0.1*cloudTwoScale, skyObject.object.subobjects[4].translateY);

        //If else block of the cloud object closest to the top of the canvas for when it reaches the end of the left edge of the canvas; the block accounts for its entire dimension not being visible on the canvas.
        if (skyObject.object.subobjects[2].translateX + 1*cloudTwoScale <= -4) {
            //Calculating of its new scale between half its base scale and its base scale, fixed to 1 decimal place.
            cloudTwoScale = Number((Math.random() + 0.5).toFixed(1));
            if (cloudTwoScale > 1) {
                cloudTwoScale = 1;
            }
            //If else block for translating to the right of the right edge of the canvas and rescaling of the cloud to emulate the appearance of a new cloud appearing on the canvas. The translation takes into account the entire dimension of the rescaled cloud so that it doesn't initially appear on the canvas.
            if (cloudTwoScale - 0.5 >= 0.25) {
                skyObject.object.subobjects[2].setScale(0.5*cloudTwoScale, 0.5*cloudTwoScale).setTranslation(4 + 1.0025*cloudTwoScale, 1 + 0.25*cloudOneScale + cloudTwoScale); //The new Y coordinate of the cloud is calculated based the the current scale of the other cloud and the new scale of this cloud to prevent a great change from the base Y coordinate of the cloud.
            } else {
                skyObject.object.subobjects[2].setScale(0.5*cloudTwoScale, 0.5*cloudTwoScale).setTranslation(4 + 1.0025*cloudTwoScale, 1 - 0.25*cloudOneScale + cloudTwoScale);
            }
            
        }

        //If else block of the cloud object closest to the bottom of the canvas for when it reaches the end of the left edge of the canvas; the block accounts for its entire dimension not being visible on the canvas; it's identical to the above if else block except for the base coordinates of this cloud.
        if (skyObject.object.subobjects[4].translateX + 2*cloudOneScale <= -4) {
            cloudOneScale = Number((Math.random() + 0.5).toFixed(1));
            if (cloudOneScale > 1) {
                cloudOneScale = 1;
            }
            if (cloudOneScale - 0.5 >= 0.25) {
                skyObject.object.subobjects[4].setScale(cloudOneScale, cloudOneScale).setTranslation(4 + 2.005*cloudOneScale, -2.25 + 0.25*cloudTwoScale + cloudOneScale);
            } else {
                skyObject.object.subobjects[4].setScale(cloudOneScale, cloudOneScale).setTranslation(4 + 2.005*cloudOneScale, -2.25 - 0.25*cloudTwoScale + cloudOneScale);
            }
            
        }

        //Animation for the rotation of the sun object.
        skyObject.object.subobjects[1].setRotation(0.5*frameNumber);

        // TODO: Update state in preparation for drawing the next frame.

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
    function TransformedObject(object) {
        SceneGraphNode.call(this);  // do superclass initialization
        this.object = object;
        this.rotationInDegrees = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.translateX = 0;
        this.translateY = 0;
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
    
           // Create some basic shapes as custom SceneGraphNode objects.
           
    var line = new SceneGraphNode();  // Line from (-0.5,0) to (0.5,0)
    line.doDraw = function(g) {
        g.beginPath();
        g.moveTo(-0.5,0);
        g.lineTo(0.5,0);
        g.stroke();
    }
    
    var filledRect = new SceneGraphNode();  // Filled square, size = 1, center = (0,0)
    filledRect.doDraw = function(g) {
        g.fillRect(-0.5,-0.5,1,1);
    }
    
    var rect = new SceneGraphNode(); // Stroked square, size = 1, center = (0,0)
    rect.doDraw = function(g) {
        g.strokeRect(-0.5,-0.5,1,1);
    }
    
    var filledCircle = new SceneGraphNode(); // Filled circle, diameter = 1, center = (0,0)
    filledCircle.doDraw = function(g) {
        g.beginPath();
        g.arc(0,0,0.5,0,2*Math.PI);
        g.fill();
    }
    
    var circle = new SceneGraphNode();// Stroked circle, diameter = 1, center = (0,0)
    circle.doDraw = function(g) {
        g.beginPath();
        g.arc(0,0,0.5,0,2*Math.PI);
        g.stroke();
    }
    
    var filledTriangle = new SceneGraphNode(); // Filled Triangle, width 1, height 1, center of base at (0,0)
    filledTriangle.doDraw = function(g) {
        g.beginPath();
        g.moveTo(-0.5,0);
        g.lineTo(0.5,0);
        g.lineTo(0,1);
        g.closePath();
        g.fill();
    }

    //Airtrail shape of the colour white and linewidth 0.1 composed of 3 pairs of bezier curves displaced by a distance of 1 from eachother; the bezier curves within each pair are displaced by a distance of 1 from eachother with other bezier curve flipped horizontally.
    var airtrail = new SceneGraphNode();
    airtrail.doDraw = function(g) {
        g.lineWidth = 0.1;
        g.strokeStyle = "white";

        g.beginPath();
        g.moveTo(-0.5, 0);
        g.bezierCurveTo(0, 0.25, 0, 0.25, 0.5, 0);
        g.stroke();
        g.closePath();
        g.beginPath();
        g.moveTo(0.5, 0);
        g.bezierCurveTo(1, -0.25, 1, -0.25, 1.5, 0);
        g.stroke();
        g.closePath();
        
        g.beginPath();
        g.moveTo(-0.5, 1);
        g.bezierCurveTo(0, 1.25, 0, 1.25, 0.5, 1);
        g.stroke();
        g.closePath();
        g.beginPath();
        g.moveTo(0.5, 1);
        g.bezierCurveTo(1, 0.75, 1, 0.75, 1.5, 1);
        g.stroke();
        g.closePath();

        g.beginPath();
        g.moveTo(-0.5, -1);
        g.bezierCurveTo(0, -0.75, 0, -0.75, 0.5, -1);
        g.stroke();
        g.closePath();
        g.beginPath();
        g.moveTo(0.5, -1);
        g.bezierCurveTo(1, -1.25, 1, -1.25, 1.5, -1);
        g.stroke();
        g.closePath();
    }

    //Wheel shape to represent the plane's wheels. The shape is composed of a semi circle to round the edge of the rectangle that represents the bar which has at its other edge a black circle to represent the wheel's tire and an inner gray circle to represent the rim of the wheel.
    var wheel = new SceneGraphNode();
    wheel.doDraw = function(g) {
        g.beginPath();
        g.arc(-0.5, 0, 0.5, Math.PI/2, 3*Math.PI/2);
        g.moveTo(-0.5, 0.5);
        g.lineTo(6.5, 0.5);
        g.lineTo(6.5, -0.5);
        g.lineTo(-0.5, -0.5);
        g.closePath();
        g.fill();
        g.stroke();
        g.beginPath();
        g.arc(6.5, 0, 1.5, 0, 2*Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
        g.beginPath();
        g.arc(6.5, 0, 1, 0, 2*Math.PI);
        g.closePath();
        g.fillStyle = "grey";
        g.fill();
        g.stroke();
    }

    //Shape of the frame of the plane composed of a non-uniform shape to represent the frame's body, a red semi circle for the tail, a yellow semi circle for the nose and a non-regular trapezoid for the cabin.
    var planeFrame = new SceneGraphNode();
    planeFrame.doDraw = function(g) {
        g.fillStyle = "red";
        g.beginPath();
        g.moveTo(3, 2);
        g.lineTo(2.25, 5);
        g.lineTo(-2, 5);
        g.lineTo(-2.75, 2);
        g.lineTo(-2.75, 1.9);
        g.lineTo(-1.75, 1.9);
        g.lineTo(-1.75, 4.5);
        g.lineTo(2, 4.5);
        g.lineTo(2, 1.9);
        g.lineTo(3, 1.9);
        g.closePath();
        g.fill();
        g.stroke();
        g.beginPath();
        g.moveTo(-6, -2);
        g.lineTo(4, -2);
        g.lineTo(4, 2);
        g.lineTo(-6, 2);
        g.lineTo(-16, 1.5);
        g.lineTo(-16.175, 5);
        g.lineTo(-19.175, 4.825);
        g.lineTo(-19, 1);
        g.closePath();
        g.fill();
        g.stroke();
        g.beginPath();
        g.arc(-17.675, 4.9125, 1.5, 0.049958395719868, Math.PI+0.049958395719868);
        g.closePath();
        g.fill();
        g.stroke();
        g.fillStyle = "yellow";
        g.beginPath();
        g.arc(4, 0, 2, 3*Math.PI/2, Math.PI/2);
        g.closePath();
        g.fill();
        g.stroke();
    }

    //Cloud object composed of many white circles and ovals and transparent circles and ovals with black outlines to give the entire cloud a white colour and a black outline.
    var cloud = new CompoundObject();
    cloud.add(new TransformedObject(circle).setScale(3.01, 1.51).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(0, 0.75).setScale(1.01, 1.01).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-0.85, 0.4).setScale(1.51, 1.01).setRotation(-40).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-0.55, 0.5).setScale(1.51, 1.01).setRotation(-80).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-1.5, 0).setScale(1.01, 1.01).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-0.25, -0.75).setScale(1.01, 1.01).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(0.25, -0.75).setScale(1.01, 1.01).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(1.5, 0).setScale(1.01, 1.01).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-1.2, -0.9).setScale(0.76, 0.76).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-1.35, -0.55).setScale(0.96, 0.96).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(-0.8, -0.95).setScale(0.76, 0.76).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(0.8, 0.9).setScale(0.96, 0.96).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(1.4, 0.65).setScale(0.76, 0.76).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(1.4, -0.65).setScale(0.76, 0.76).setColor("black"));
    cloud.add(new TransformedObject(circle).setTranslation(0.85, -0.85).setScale(0.76, 0.76).setColor("black"));
    cloud.add(new TransformedObject(filledCircle).setScale(3, 1.5).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(0, 0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-0.85, 0.4).setScale(1.5, 1).setRotation(-40).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-0.55, 0.5).setScale(1.5, 1).setRotation(-80).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-1.5, 0).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-0.25, -0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(0.25, -0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(1.5, 0).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-1.2, -0.9).setScale(0.75, 0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-1.35, -0.55).setScale(0.95, 0.95).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(-0.8, -0.95).setScale(0.75, 0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(0.8, 0.9).setScale(0.95, 0.95).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(1.4, 0.65).setScale(0.75, 0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(1.4, -0.65).setScale(0.75, 0.75).setColor("white"));
    cloud.add(new TransformedObject(filledCircle).setTranslation(0.85, -0.85).setScale(0.75, 0.75).setColor("white"));

    //Sun object composed of many yellow and black outlined rectangles with rounded edges using semi circles that represent the Sun's rays which are radially translated to surround a yellow and black outlined circle representing the body of the Sun. 
    var sun = new CompoundObject();
    sun.add(new TransformedObject(filledCircle).setColor("yellow"));

    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.7, 0).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.89, 0).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.49497474, 0.49497474).setRotation(45).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.62932503, 0.62932503).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.64671567, 0.26787840).setRotation(22.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.82225278, 0.34058825).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.26787840, 0.64671567).setRotation(67.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.34058825, 0.82225278).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0, 0.7).setRotation(90).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0, 0.89).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.49497474, -0.49497474).setRotation(-45).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.62932503, -0.62932503).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.64671567, -0.26787840).setRotation(-22.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.82225278, -0.34058825).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0.26787840, -0.64671567).setRotation(-67.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0.34058825, -0.82225278).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(0, -0.7).setRotation(-90).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(0, -0.89).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.49497474, -0.49497474).setRotation(45).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.62932503, -0.62932503).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.64671567, -0.26787840).setRotation(22.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.82225278, -0.34058825).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.26787840, -0.64671567).setRotation(67.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.34058825, -0.82225278).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.49497474, 0.49497474).setRotation(-45).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.62932503, 0.62932503).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.64671567, 0.26787840).setRotation(-22.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.82225278, 0.34058825).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.26787840, 0.64671567).setRotation(-67.5).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.34058825, 0.82225278).setColor("black"));
    sun.add(new TransformedObject(filledRect).setScale(0.395, 0.145).setTranslation(-0.7, 0).setColor("black"));
    sun.add(new TransformedObject(filledCircle).setScale(0.147, 0.147).setTranslation(-0.89, 0).setColor("black"));
    
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.7, 0).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.89, 0).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.49497474, 0.49497474).setRotation(45).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.62932503, 0.62932503).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.64671567, 0.26787840).setRotation(22.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.82225278, 0.34058825).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.26787840, 0.64671567).setRotation(67.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.34058825, 0.82225278).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0, 0.7).setRotation(90).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0, 0.89).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.49497474, -0.49497474).setRotation(-45).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.62932503, -0.62932503).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.64671567, -0.26787840).setRotation(-22.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.82225278, -0.34058825).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0.26787840, -0.64671567).setRotation(-67.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0.34058825, -0.82225278).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(0, -0.7).setRotation(-90).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(0, -0.89).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.49497474, -0.49497474).setRotation(45).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.62932503, -0.62932503).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.64671567, -0.26787840).setRotation(22.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.82225278, -0.34058825).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.26787840, -0.64671567).setRotation(67.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.34058825, -0.82225278).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.49497474, 0.49497474).setRotation(-45).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.62932503, 0.62932503).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.64671567, 0.26787840).setRotation(-22.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.82225278, 0.34058825).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.26787840, 0.64671567).setRotation(-67.5).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.34058825, 0.82225278).setColor("yellow"));
    sun.add(new TransformedObject(filledRect).setScale(0.375, 0.125).setTranslation(-0.7, 0).setColor("yellow"));
    sun.add(new TransformedObject(filledCircle).setScale(0.127, 0.127).setTranslation(-0.89, 0).setColor("yellow"));

    sun.add(new TransformedObject(circle).setScale(1.01, 1.01).setColor("black"));

    //Airtrails object to rotate the airtrails shape 90 degrees and recenter its origin.
    var airTrails = new CompoundObject();
    airTrails.add(new TransformedObject(airtrail).setRotation(180).setTranslation(1, 0));

    //Propeller object composed of a black rectangle shape with rounded edges using black semi circles.
    var propeller = new CompoundObject();
    propeller.add(new TransformedObject(filledRect).setScale(1.5, 0.14646465).setColor("black"));
    propeller.add(new TransformedObject(filledCircle).setTranslation(-0.75, 0).setScale(0.147, 0.147).setColor("black"));
    propeller.add(new TransformedObject(filledCircle).setTranslation(0.75, 0).setScale(0.147, 0.147).setColor("black"));

    //Stickman object composed of a black rectangle for the body, a black circle for the head and a white circle for the eye.
    var stickman = new CompoundObject();
    stickman.add(new TransformedObject(filledCircle).setColor("black"));
    stickman.add(new TransformedObject(filledCircle).setScale(0.25, 0.25).setTranslation(0.175, 0.125).setColor("white"));
    stickman.add(new TransformedObject(filledRect).setScale(1, 0.14646465).setRotation(90).setTranslation(0, -1).setColor("black"));

    //Plane object composed of the plane's frame shape, the stickman object in the cabin, wheel shapes for the wheels, propeller object on the nose, airtrail objects to the left of the tail and the propeller and an oval for the wing.
    var plane = new CompoundObject();
    plane.add(new TransformedObject(stickman).setScale(0.5, 0.5).setTranslation(0.9, 0.85));
    
    plane.add(new TransformedObject(airTrails).setScale(0.5, 0.5).setTranslation(-4.8, 0.8));
    plane.add(new TransformedObject(planeFrame).setScale(0.25, 0.25).setTranslation(0.85, 0));

    plane.add(new TransformedObject(propeller).setTranslation(2.43, 0).setRotation(90).setScale(0.9, 0.9));

    plane.add(new TransformedObject(circle).setScale(1.1, 0.25).setTranslation(0.5, 0.125));
    plane.add(new TransformedObject(airTrails).setScale(0.625, 0.625).setTranslation(1.3, 0));
    plane.add(new TransformedObject(wheel).setScale(0.155, 0.155).setTranslation(1.25, -0.4).setRotation(-45));
    plane.add(new TransformedObject(wheel).setScale(0.125, 0.125).setTranslation(-2.5, 0).setRotation(-135));

    //Sky object composed of a aqua coloured rectangle representing the sky, the sun object, the plane object and two cloud objects.
    var sky = new CompoundObject();
    sky.add(new TransformedObject(filledRect).setScale(8, 8).setColor("aqua"));
    sky.add(new TransformedObject(sun).setTranslation(3, 2));
    sky.add(new TransformedObject(cloud).setTranslation(-1.5, 1.5).setScale(0.5, 0.5));
    sky.add(new TransformedObject(plane).setScale(0.5, 0.5).setTranslation(0, 0));
    sky.add(new TransformedObject(cloud).setTranslation(1, -1.75));

    // ------------------------------- graphics support functions --------------------------
    
    /**
      * Draw one frame of the animation.  Probably doesn't need to be changed,
      * except maybe to change the setting of preserveAspect in applyLimits().
      */
    function draw() {
        graphics.save();  // to make sure changes don't carry over from one call to the next
        graphics.fillStyle = BACKGROUND;  // background color
        graphics.fillRect(0,0,canvas.width,canvas.height);
        graphics.fillStyle = "black";
        applyLimits(graphics,X_LEFT,X_RIGHT,Y_TOP,Y_BOTTOM,false);
        graphics.lineWidth = pixelSize;  // Use 1 pixel as the default line width
        world.draw(graphics);
        graphics.restore();
    }
    
    /**
     * Applies a coordinate transformation to the graphics context, to map
     * xleft,xright,ytop,ybottom to the edges of the canvas.  This is called
     * by draw().  This does not need to be changed.
     */
    function applyLimits(g, xleft, xright, ytop, ybottom, preserveAspect) {
       var width = canvas.width;   // The width of this drawing area, in pixels.
       var height = canvas.height; // The height of this drawing area, in pixels.
       if (preserveAspect) {
             // Adjust the limits to match the aspect ratio of the drawing area.
          var displayAspect = Math.abs(height / width);
          var requestedAspect = Math.abs(( ybottom-ytop ) / ( xright-xleft ));
          var excess;
          if (displayAspect > requestedAspect) {
             excess = (ybottom-ytop) * (displayAspect/requestedAspect - 1);
             ybottom += excess/2;
             ytop -= excess/2;
          }
          else if (displayAspect < requestedAspect) {
             excess = (xright-xleft) * (requestedAspect/displayAspect - 1);
             xright += excess/2;
             xleft -= excess/2;
          }
       }
       var pixelWidth = Math.abs(( xright - xleft ) / width);
       var pixelHeight = Math.abs(( ybottom - ytop ) / height);
       pixelSize = Math.min(pixelWidth,pixelHeight);
       g.scale( width / (xright-xleft), height / (ybottom-ytop) );
       g.translate( -xleft, -ytop );
    }
    
    
    //------------------ Animation framework ------------------------------
    
    var running = false;  // This is set to true when animation is running
    
    function frame() {
        if (running) {
               // Draw one frame of the animation, and schedule the next frame.
            updateFrame();
            draw();
            requestAnimationFrame(frame);
        }
    }
    
    function doAnimationCheckbox() { 
        var shouldRun = document.getElementById("animateCheck").checked;
        if ( shouldRun != running ) {
            running = shouldRun;
            if (running)
                requestAnimationFrame(frame);
        }
    }
    
    //----------------------- initialization -------------------------------

    function init() {
        canvas = document.getElementById("thecanvas");
        if (!canvas.getContext) {
            document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
            return;
        }
        graphics = canvas.getContext("2d");
        document.getElementById("animateCheck").checked = false; 
        document.getElementById("animateCheck").onchange = doAnimationCheckbox; 
        createWorld();
        draw();
    }
