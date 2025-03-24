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

            /* oDataModel.read("/YBTP_CR_KIETPA7_AGENCY", {
                // filters: []
                success: function (oData) {
                    if (oData.results.length > 0) {
                        this._aOriginalData = oData.results;
                        // Set Data
                        this.getView().getModel("mainView").setProperty("/data", oData.results);
                        // Set Total
                        this._oViewModel.setProperty("/iTotal", oData.results.length);
                    };
                }.bind(this),
                error: function (oError) {
                    console.log("oError: ", oError);
                }.bind(this)
            }); */

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
                        const iTotal = this._oViewModel.getProperty("/iTotal");

                        let oTable = this.getView().byId("agencyTable");
                        let aSelectedIndices = this._oAgencyTable.getSelectedIndices();

                        // Delete data from Last Element
                        for (let i = 0; i < iTotal; i++) {
                            let oContext = this._oAgencyTable.getContextByIndex(aSelectedIndices[iTotal - i - 1]);
                            this._removeItem(oContext);
                        };
                        // Check Pending Page
                    };
                }.bind(this),
                dependentOn: this.getView()
            });
        },

        _removeItem: function (oContext) {
            //MessageBox.success("Test Delete");
        },

        onSubmitAgency: function (oEvent) {
            let oAnswer = sap.m.MessageBox.confirm("Would you like to submit?", {
                title: "Confirm",
                onClose: null,
                styleClass: "",
                actions: [
                    sap.m.MessageBox.Action.OK,
                    sap.m.MessageBox.Action.CLOSE
                ],
                emphasizedAction: sap.m.MessageBox.Action.OK,
                initialFocus: sap.m.MessageBox.Action.CLOSE,
                textDirection: sap.ui.core.TextDirection.Inherit,
                onClose: function (sAction) {
                    if (sAction === "OK") {
                        MessageBox.success("You submitted!");
                    };
                }.bind(this),
                dependentOn: this.getView()
            });

            console.log("oAnswer: ", oAnswer);
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
            };

        }

    });
});