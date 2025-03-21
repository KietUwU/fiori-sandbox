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
                if (!sStatus) {
                    return null;
                } else {
                    return oStatusState[sStatus];
                }
            }
        };

    });

sap.ui.define([], () => {
    "use strict";

    return {
        /**
         * Format Status Icon
         * @param {*} sStatus
         * @return
         */
        statusIcon: function (sStatus) {
            const oStatusIcon = {
                "New": "sap-icon://add-document",
                "Update": "sap-icon://edit",
                "Delete": "sap-icon://delete"
            };

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
            const oStatusState = {
                "New": "Success",
                "Update": "Information",
                "Delete": "Error"
            };

            if (!sStatus) {
                return null;
            } else {
                return oStatusState[sStatus];
            }
        }
    };
});