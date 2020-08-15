class InputClass
{
    constructor()
    {
        //Keyboard
        let keyCodes = new Array(43).fill(0);
        let keyCodesDown = new Array(43).fill(0);
        let keyCodesDownQueue = []; //For making the button go up

        //Mouse
        let mouseButton = new Array(3).fill(0);
        let mouseButtonDown = new Array(3).fill(0);
        let mouseButtonDownQueue = []; //For making the button go up


        //space, shift, cntl, alt, escape, tab, enter
        let specialKeyCodes = new Array(7).fill(0);

        //Mouse movement
        let mouse = {x:0,y:0};
        let scroll = 0;

        this.onKeyDown = function(event)
        {
            //Cant use this._keyCodes since 'this' refers to the event and not Input class
            let code = event.keyCode-48;
    
            //If a normal keycode
            if(code >=0 && code <= 90)
            {
                //if this is the first time we pressed the key mark it as down
                if(keyCodes[code] == 0)
                    keyCodesDown[code] = 1;
                
                //Set the key to down
                keyCodes[code] = 1;
            }
            else
                specialKeyCodes[Input.GetSpecialKey(event.key)] = 1;
    
        }
    
        this.onKeyUp = function(event)
        {
            //Cant use this._keyCodes since 'this' refers to the event and not Input class
            let code = event.keyCode-48;
    
            //If a normal keycode
            if(code >=0 && code <= 90)
            {
                keyCodes[code] = 0;
                keyCodesDown[code] = 0;
            }
            else
                specialKeyCodes[Input.GetSpecialKey(event.key)] = 0;
        }
    
        this.onMouseDown = function(event)
        {
            //If this is the first frame we pressed the mouse
            if(mouseButton[event.button] == 0)
                mouseButtonDown[event.button] = 1;

            mouseButton[event.button] = 1;
        }
    
        this.onMouseUp = function(event)
        {
            mouseButton[event.button] = 0;
            mouseButtonDown[event.button] = 0;

        }
    
        this.onWheel = function(event)
        {
            scroll = Math.sign(event.deltaY);
        }
    
        //Reset the mouse movement every frame
        this.ResetMouseProperties = function()
        {
            scroll = 0;

            while(mouseButtonDownQueue.length != 0)
            {
                mouseButtonDown[mouseButtonDownQueue.pop()] = 0;
            }
        }

        //Get Mouse Position based on coordinate system we are using for the specific canvas (Event is binded to the main)
        this.UpdateMousePos = function(event) 
        {
            var rect = this.canvas.getBoundingClientRect();
            let width = rect.width;
            let height= rect.height;
            
            //Calculate ratio
            let x = width / (this.xright-this.xleft);
            let y = height / (this.ybottom-this.ytop);

            
            //Return mouse position
            mouse = {
                x: ((event.clientX - rect.left)/x)+this.xleft,
                y: ((event.clientY - rect.top)/y)+this.ytop
            };
        }
    
        this.ResetKeyProperties = function()
        {
            while(keyCodesDownQueue.length != 0)
            {
                keyCodesDown[keyCodesDownQueue.pop()] = 0;
            }
        }
    
        /**
         * @param {keyCode} string The key value.
         * 
         * Retrieves whether the given key is pressed and returns true whilst the key is held.
         */
        this.GetKey = function(keyCode)
        {
            //Force input to be a string
            if(typeof keyCode != "string")
            {
                console.log("%cError, keycode must be a string value.", "color:red");
                return;
            }
    
            //Get the normal key code 0-9 and a-z
            if(keyCode.length == 1 && this.GetSpecialKey(keyCode) == -1)
            {
                keyCode = keyCode.toUpperCase().charCodeAt(0)-48;
                return keyCodes[keyCode]==1;
            }
            else
            {
                keyCode = this.GetSpecialKey(keyCode);
                return specialKeyCodes[keyCode]==1;
            }
        }
    
        /**
         * @param {keyCode} string The key value.
         * 
         * Retrieves whether the given key is pressed and returns true for the frame the key was checked.
         */
        this.GetKeyDown = function(keyCode)
        {
            //Force input to be a string
            if(typeof keyCode != "string")
            {
                console.log("%cError, keycode must be a string value.", "color:red");
                return;
            }
    
            keyCode = keyCode.toUpperCase().charCodeAt(0)-48;
            if(keyCodesDown[keyCode])
            {
                //Add the key we checked to a queue to be deselected so it is only true for the frame it is checked
                keyCodesDownQueue.push(keyCode);
                return true;
            }
            else
                return false;
        }

        /**
         * @param {axis} string The axis value.
         * 
         * Retrieves the axis controls.
         */
        this.GetAxis = function(axis)
        {
            switch(axis.toLowerCase())
            {
                case "mouse y":
                    return mouse.y;
                case "mouse x":
                    return mouse.x;
                case "mouse scrollwheel":
                    return scroll;
            }
            return 0;
        }

        /**
         * 
         * Returns mouse Pois
         */

        this.GetMousePos = function()
        {
            return mouse;
        }

        /**
         * @param {button} int The button code.
         * 
         * Returns true during the frame the button is pressed, 0-2
         */
        this.GetMouseButtonDown = function(button)
        {
            mouseButtonDownQueue.push(button);
            return mouseButtonDown[button]==1;
        }

        /**
         * @param {button} int The button code.
         * 
         * Returns true while the button is pressed, 0-2
         */
        this.GetMouseButton = function(button)
        {
            return mouseButton[button]==1;
        }

        this.GetSpecialKey = function(keyCode)
        {
            switch(keyCode.toLowerCase())
            {
                case "space":
                    return 0;
                case " ":
                    return 0;
                case "shift":
                    return 1;
                case "control":
                    return 2;
                case "alt":
                    return 3;
                case "escape":
                    return 4;
                case "tab":
                    return 5;
                case "enter":
                    return 6;
            }
            return -1;
        }
    
        this.Update = function()
        {
            this.ResetMouseProperties();
            this.ResetKeyProperties();
        }
        
        //Rebind events
        window.onkeydown = this.onKeyDown;
        window.onkeyup = this.onKeyUp;
        window.onmousedown = this.onMouseDown;
        window.onmouseup = this.onMouseUp;
        window.onmousemove = this.onMouseMove;
        window.onwheel = this.onWheel;
    }
}

var Input = new InputClass();