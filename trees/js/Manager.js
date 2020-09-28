class Manager {
    constructor() {
        this.questions = [];

        let canvases = document.getElementsByTagName("canvas");
        
        for(let i = 0; i < canvases.length; i++) {
            let databaseMisc = this.configureMiscData(canvases[i].nextElementSibling.attributes)

            let canvas;

            if(databaseMisc.lecturer) {
                canvas = document.getElementById("canvas");
            }
            else {
                canvas = document.getElementById(canvases[i].id);
                this.updateHTMLElementIds(canvas, canvas.parentElement.parentElement);
            }

            if(!canvas.getContext) {
                console.error("Canvas not supported.");
                return;
            }

            this.questions.push(new Main(canvas, databaseMisc));
        }
    }

    configureMiscData(data) {
        let object = {};

        for(const item of data) {
            let attributeValue = item.value;

            if(attributeValue === "true" || attributeValue === "false") {
                attributeValue = attributeValue == "true"; // Convert any true and false strings to actual boolean values
            }

            object[item.name] = attributeValue;
        }

        return object;
    }
    
    /** Only called for a question attempt / review. Ensures that elements of separate questions are unique so that more than one question can be shown on the page */
    updateHTMLElementIds(canvas, parentDiv) {
        let currElement;

        for(let i = 0; i < parentDiv.children.length; i++) {
            currElement = parentDiv.children[i];

            if(currElement.hasAttribute("updateid")) { // If the current child needs its id updated
                if(currElement.tagName === "LABEL") { // If the current child is a label, update its "for" property otherwise update its id
                    currElement.setAttribute("for", canvas.id + ":" + currElement.getAttribute("for"));
                }
                else {
                    currElement.id = canvas.id + ":" + currElement.id;
                }

                if(currElement.hasChildNodes()) {
                    this.updateHTMLElementIds(canvas, currElement); // Recursively update all children id's if needed
                }
            }
        }
    }
}