sap.ui.define([
    "sap/ui/core/format/DateFormat"
],
    function (DateFormat) {
        "use strict";

        const oStatusIcon = {
            "New": "sap-icon://add-document",
            "Update": "sap-icon://edit",
            "Delete": "sap-icon://delete"
        };

        const oStatusState = {
            "New": "Success",
            "Update": "Information",
            "Delete": "Error"
        };

        return {
            /**
             * Format Status Icon
             * @param {*} sStatus
             * @return
             */
            statusIcon: function (sStatus) {
                // console.log("sStatus: ", sStatus);

                if (!sStatus) {
                    return null;
                } else {
                    return oStatusIcon[sStatus];
                };
            },

            /**
             * Format Status Status
             * @param {*} sStatus
             * @return
             */
            statusState: function (sStatus) {
                // console.log("sStatus: ", sStatus);

                if (!sStatus) {
                    return null;
                } else {
                    return oStatusState[sStatus];
                }
            }
        };

    });
