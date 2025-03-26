sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/odata/v2/ODataModel",
    "../model/formatter"
], (Controller, JSONModel, MessageBox, ODataModel, formatter) => {
    "use strict";

    return Controller.extend("fioriagency.project1.controller.AGENCY", {
        formatter: formatter,

        onInit() {
            let oDataModel = this.getOwnerComponent().getModel();

            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this._oViewModel = new JSONModel({
                data: [],
                iTotal: 0,
                bEdit: false,
                bHasSelectedRow: false,
                bHasPendingChange: false
            });
            this._aOriginalData = [];
            this._oAgencyTable = this.getView().byId("agencyTable");

            this.getView().setModel(this._oViewModel, "mainView");
            this._readData(oDataModel);
        },

        _readData: function (oDataModel) {
            oDataModel.read("/YBTP_CR_KIETPA7_AGENCY", {
                // filters: []
                success: function (oData) {
                    if (oData.results.length > 0) {
                        this._aOriginalData = oData.results;

                        this.getView().getModel("mainView").setProperty("/data", oData.results);
                        this._oViewModel.setProperty("/iTotal", oData.results.length);
                    };
                }.bind(this),
                error: function (oError) {
                    console.log("oError: ", oError);
                }.bind(this)
            });
        },

        onRowSelectionChange: function () {
            let aSelectedData = this._oAgencyTable.getSelectedIndices();
            if (aSelectedData.length > 0) {
                this._oViewModel.setProperty("/bHasSelectedRow", true);
            } else {
                this._oViewModel.setProperty("/bHasSelectedRow", false);
            };
        },

        onPress: function () {
            const cMessage = "Hello World!";
            alert(cMessage);
        },

        onAddAgency: function (oEvent) {
            let aModelData = this._oViewModel.getProperty("/data");
            aModelData.push(
                { "zmstatus": "New" }
            );

            // Refresh Screen
            this._oViewModel.setProperty("/data", aModelData);

            // Check Pending Page
            this._oViewModel.setProperty("/bHasPendingChange", true);
        },

        onDelAgency: function (oEvent) {
            // MessageBox.error("Button Delete Placeholder.");

            MessageBox.error(this._oResourceBundle.getText("deleteConfirm"), {
                title: this._oResourceBundle.getText("delButton"),
                actions: [MessageBox.Action.OK, MessageBox.Action.CLOSE],
                emphasizedAction: MessageBox.Action.OK,
                initialFocus: sap.m.MessageBox.Action.CLOSE,
                onClose: function (sAction) {
                    if (sAction === "OK") {
                        let oTable = this.getView().byId("agencyTable");
                        const aSelectedIndices = this._oAgencyTable.getSelectedIndices();

                        // Delete data from Last Element
                        aSelectedIndices.forEach((iIndex) => {
                            let oContext = this._oAgencyTable.getContextByIndex(iIndex);
                            this._removeItem(oContext, iIndex);
                        });
                    };
                }.bind(this),
                dependentOn: this.getView()
            });
        },

        _removeItem: function (oContext, iIndex) {
            //MessageBox.success("Test Delete");
            console.log("oContext : ", oContext);

            let sPath = oContext.getPath();
            let oObject = oContext.getObject();

            switch (oObject.zmstatus) {
                case "New":
                    let aData = this._oViewModel.getProperty("/data",);
                    aData.splice(iIndex, 1);
                    // Update Data in List
                    this._oViewModel.setProperty("/data", aData);
                    break;
                default:
                    oObject.zmstatus = "Delete";
                    // Update Data in List
                    this._oViewModel.setProperty(sPath, oObject);
                    this._oViewModel.setProperty("/bHasPendingChange", true);
                    break;
            };
        },

        onSubmitAgency: function (oEvent) {
            MessageBox.error(this._oResourceBundle.getText("submitConfirm"), {
                title: this._oResourceBundle.getText("submitButton"),
                actions: [MessageBox.Action.OK, MessageBox.Action.CLOSE],
                emphasizedAction: MessageBox.Action.OK,
                initialFocus: sap.m.MessageBox.Action.CLOSE,
                onClose: function (sAction) {
                    if (sAction === "OK") {

                    };
                }.bind(this),
                dependentOn: this.getView()
            });
        },

        onToggleEdit: function (oEvent) {
            if (oEvent.getSource().getState() === true) {
                //MessageBox.information("Edit Enabled.");
                this._oViewModel.setProperty("/bEdit", true);
            } else {
                this._oViewModel.setProperty("/bEdit", false);
            };
        },

        onChange: function (oEvent) {
            // MessageBox.information("You edited the data.");
            /* let oDataModel = new ODataModel({
                serviceUrl: "/sap/opu/odata/sap/ZBTP_SRV_KIETPA7_AGENCY_UI"
            });

            let oTable = this.getView().byId("agencyTable");
            let aSelectedIndices = oTable.getSelectedIndices(); */

            const oSource = oEvent.getSource();
            const oContext = oSource.getBindingContext("mainView");

            // Update Object Status
            if (oContext) {
                let sPath = oContext.getPath();
                let oObject = oContext.getObject();
                if (oObject.zmstatus !== "New") {
                    oObject.zmstatus = "Update";
                };
                // Update Data in List
                this._oViewModel.setProperty(sPath, oObject);
                // Check Pending Page
                this._oViewModel.setProperty("/bHasPendingChange", true);
            };
        }

    });
});