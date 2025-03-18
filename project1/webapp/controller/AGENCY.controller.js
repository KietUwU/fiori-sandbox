sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("fioriagency.project1.controller.AGENCY", {
        onInit() {
        },

        onPress: function() {
            const c_message = "Hello World!";            
            alert(c_message);
        }
    });
});