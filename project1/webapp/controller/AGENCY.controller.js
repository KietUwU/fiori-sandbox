sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageBox) => {
    "use strict";

    return Controller.extend("fioriagency.project1.controller.AGENCY", {
        onInit() {
            this._oViewModel = new JSONModel({
                data: []
            });
            this.getView().setModel(this._oViewModel, "mainView");

            let oDataModel = this.getOwnerComponent().getModel();
            oDataModel.read("/YBTP_CR_KIETPA7_AGENCY", {
                // filters: []
                success: function (oData) {
                    if (oData.results.length > 0) {
                        this.getView().getModel("mainView").setProperty("/data", oData.results);
                    };
                }.bind(this),
                error: function (oError) {
                    console.log("oError: ", oError);
                }.bind(this)
            });
        },

        onPress: function () {
            const cMessage = "Hello World!";
            alert(cMessage);
        },

        onAddAgency: function (oEvent) {
            // MessageBox.success("Button Add Placeholder.");

            let oDataModel = this.getOwnerComponent().getModel();
            let sLine = oDataModel.oData.JSONModel[1];
        },

        onDelAgency: function (oEvent) {
            MessageBox.error("Button Delete Placeholder.");
        }
    });
});