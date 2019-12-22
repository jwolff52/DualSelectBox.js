class DualSelectBox {
    
    /**
     * leftBox - an array of JSON objects in the form of {name,id} to be placed in the left <select> element
     * rightBox - an array of JSON objects in the form of {name,id} to be placed in the right <select> element
     * leftBoxId - the Html id of the left <select> element - Default: dsb-leftBox
     * rightBoxId - the Html id of the right <select> element - Default: dsb-rightBox
     * buttonDivId - the Html id of the <div> element that the shift buttons will be placed in - Default: dsb-buttons
     * submitButtonId - the HTML id of the <button> element that submits the form that the <select> boxes are in - Default: dsb-submit
     */
    constructor(leftBox, rightBox, leftBoxId = "dsb-leftBox", rightBoxId = "dsb-rightBox", buttonDivId = "dsb-buttons", submitButtonId = "dsb-submit") {
        this.leftBox = leftBox;
        this.rightBox = rightBox;
        this.leftBoxId = leftBoxId;
        this.rightBoxId = rightBoxId;
        this.buttonDivId = buttonDivId;
    }

    /**
     * Places the shift buttons and Populates bot boxes with their initial values
     * return - this DualSelectBox instance
     */
    init() {
        document.getElementById(this.buttonDivId).innerHTML =
            "<button id='rightSelected' type = 'button' class = 'btn btn-light btn-sm' disabled>&gt;</button><br />\r\n" +
            "<button id='rightAll' type = 'button' class = 'btn btn-light btn-sm' disabled>&gt;&gt;</button><br />\r\n" +
            "<button id='leftSelected' type = 'button' class = 'btn btn-light btn-sm' disabled>&lt;</button><br />\r\n" +
            "<button id='leftAll' type = 'button' class = 'btn btn-light btn-sm' disabled>&lt;&lt;</button>";

        this.AttachOnclickEvents();
        this.PopulateBoxes();
        return this;
    }

    /**
     * Attaches an event to the element with submitButtonId that automatically selects all options in the left <select> element
     * return - this DualSelectBox instance
     */
    LeftSubmit() {
        $("#" + this.submitButtonId).click(function() {
            $("#" + this.leftBoxId).each(function() {
                $("#" + this.leftBoxId + " option").attr("selected", "selected");
            });
        });
        return this;
    }

    /**
     * Attaches an event to the element with submitButtonId that automatically selects all options in the right <select> element
     * return - this DualSelectBox instance
     */
    RightSubmit() {
        $("#" + this.submitButtonId).click(function() {
            $("#" + this.rightBoxId).each(function() {
                $("#" + this.rightBoxId + " option").attr("selected", "selected");
            });
        });
        return this;
    }

    /**
     * Attaches appropriate functions to the click events for the shift buttons
     */
    AttachOnclickEvents() {

        /**
         * Moves any selected objects in the left <select> element over to the right <select> element then repopulates
         * both <select> elements with the updated values
         */
        $("#rightSelected").click(() => {
            var selectedOptions = [];
            $("#" + this.leftBoxId + " :selected").each(function () {
                selectedOptions.push($(this).val());
            });
            for (var i = 0; i < selectedOptions.length; i++) {
                for (var j = this.leftBox.length - 1; j >= 0; j--) {
                    if (this.leftBox[j]["id"] == selectedOptions[i]) {
                        this.rightBox.push(this.leftBox.splice(j, 1)[0]);
                        break;
                    }
                }
            }
            this.PopulateBoxes();
        });

        /**
         * Moves all objects in the left <select> element over to the right <select> element then repopulates
         * both <select> elements with the updated values
         */
        $("#rightAll").click(() => {
            for (var i = this.leftBox.length - 1; i >= 0; i--) {
                this.rightBox.push(this.leftBox.pop());
            }
            this.PopulateBoxes();
        });

        /**
         * Moves any selected objects in the right <select> element over to the left <select> element then repopulates
         * both <select> elements with the updated values
         */
        $("#leftSelected").click(() => {
            var selectedOptions = [];
            $("#" + this.rightBoxId + " :selected").each(function () {
                selectedOptions.push($(this).val());
            });
            for (var i = 0; i < selectedOptions.length; i++) {
                for (var j = this.rightBox.length - 1; j >= 0; j--) {
                    if (this.rightBox[j]["id"] == selectedOptions[i]) {
                        this.leftBox.push(this.rightBox.splice(j, 1)[0]);
                        break;
                    }
                }
            }
            this.PopulateBoxes();
        });

        /**
         * Moves all objects in the right <select> element over to the left <select> element then repopulates
         * both <select> elements with the updated values
         */
        $("#leftAll").click(() => {
            for (var i = this.rightBox.length - 1; i >= 0; i--) {
                this.leftBox.push(this.rightBox.pop());
            }
            this.PopulateBoxes();
        });
    }

    /**
     * Helper function that calls the Populate methods for both <select> elements
     */
    PopulateBoxes() {
        this.PopulateLeftBox();
        this.PopulateRightBox();
    };

    /**
     * Populates the Left <select> element with the objects currently in the leftBox Array and changes the enabled
     * state of the buttons that move objects to the right <select> element
     */
    PopulateLeftBox() {
        var sel = document.getElementById(this.leftBoxId);
        sel.innerHTML = "";
        var fragment = document.createDocumentFragment();
        this.leftBox.forEach(function (user, index) {
            var opt = document.createElement('option');
            opt.innerHTML = user["name"];
            opt.value = user["id"];
            fragment.appendChild(opt);
        });
        sel.appendChild(fragment);
        if (this.leftBox.length > 0) {
            document.getElementById("rightSelected").disabled = false;
            document.getElementById("rightAll").disabled = false;
        }
        else {
            document.getElementById("rightSelected").disabled = true;
            document.getElementById("rightAll").disabled = true;
        }
    }

    /**
     * Populates the right <select> element with the objects currently in the rightBox Array and changes the enabled
     * state of the buttons that move objects to the left <select> element
    */
    PopulateRightBox() {
        var sel = document.getElementById(this.rightBoxId);
        sel.innerHTML = "";
        var fragment = document.createDocumentFragment();
        this.rightBox.forEach(function (user, index) {
            var opt = document.createElement('option');
            opt.innerHTML = user["name"];
            opt.value = user["id"];
            fragment.appendChild(opt);
        });
        sel.appendChild(fragment);
        if (this.rightBox.length > 0) {
            document.getElementById("leftSelected").disabled = false;
            document.getElementById("leftAll").disabled = false;
        }
        else {
            document.getElementById("leftSelected").disabled = true;
            document.getElementById("leftAll").disabled = true;
        }
    }
}
