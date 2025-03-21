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

            /* let oDataModel = new ODataModel({
                serviceUrl: "/sap/opu/odata/sap/ZBTP_SRV_KIETPA7_AGENCY_UI"
            }); */

            /* let oObject = {
                AGENCYID: "2",
                NAME: "Agency 2"
            };

            oDataModel.create("/ZBTP_SRV_KIETPA7_AGENCY_UI", oObject, {
                success: function (oResult) {
                    console.log("oResult: ", oResult);
                    // oDataModel.refresh(true)
                    this._readData(oDataModel);
                }.bind(this),
                error: function (oError) {
                    console.log("oError: ", oError);
                }
            }); */

            let aModelData = this._oViewModel.getData();

            console.log("aModelData: ", aModelData);
            aModelData.data.push({"zmstatus": "New"});

            this._oViewModel.setProperty("/data", aModelData.data); // Refresh Screen

            /* let sJsonString = this._oViewModel.getJSON();
            console.log("sJsonString: ", sJsonString); */
        },

        onDelAgency: function (oEvent) {
            // MessageBox.error("Button Delete Placeholder.");

            let oDataModel = new ODataModel({
                serviceUrl: "/sap/opu/odata/sap/ZBTP_SRV_KIETPA7_AGENCY_UI"
            });

            let oTable = this.getView().byId("agencyTable");
            let aSelectedIndices = oTable.getSelectedIndices();

            aSelectedIndices.forEach(iSelectedItem => {
                let oContext = oTable.getContextByIndex(iSelectedItem);
                let oObject = oContext.getObject();
                switch (oObject.zmstatus) {
                    case "New":
                        
                        break;
                
                    default:

                        break;
                }

                let sPath = "/YBTP_CR_KIETPA7_AGENCY('" + oObject.AGENCYID + "')";

                console.log("sPath: ", sPath);

                /* oDataModel.remove(sPath, {
                    success: function (oResult) {
                        console.log("oResult: ", oResult);

                        MessageBox.success("{i18n>delSuccess}");
                        oDataModel.refresh(true)
                        this._readData(oDataModel);
                    }.bind(this),
                    error: function (oError) {
                        console.log("oError: ", oError);
                        MessageBox.error("{i18n>delFailure}");
                    }.bind(this)
                }); */
            });
        },

        onSubmitAgency: function (oEvent) {
            let oAnswer = sap.m.MessageBox.confirm("Would you like to submit?", {
                title: "Confirm",
                onClose: null,
                styleClass: "",
                actions: [
                    sap.m.MessageBox.Action.OK,
                    sap.m.MessageBox.Action.CANCEL
                ],
                emphasizedAction: sap.m.MessageBox.Action.OK,
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit,
                dependentOn: null
            });

            console.log("oAnswer: ", oAnswer);
        },

        onToggleEdit: function (oEvent) {
            // MessageBox.success("Edit Toggle.");

            let oNameInput = this.byId("nameInput");

            if (oEvent.getSource().getState() === true) {
                MessageBox.information("Edit Enabled.");
            } else {
                MessageBox.information("Edit Disabled.");
            };

        },

        onChange: function (oEvent) {
            // MessageBox.information("You edited the data.");
            /* let oDataModel = new ODataModel({
                serviceUrl: "/sap/opu/odata/sap/ZBTP_SRV_KIETPA7_AGENCY_UI"
            });

            let oTable = this.getView().byId("agencyTable");
            let aSelectedIndices = oTable.getSelectedIndices();
 */
            const sNewValue = oEvent.mParameters.newValue;

            const oRow = oEvent.getSource().getParent();//Get Row
            const oTable = oRow.getParent();// Get Table

            if (sNewValue === "3nd Street") {
                MessageBox.error("Invalid Data");
            };

        }

    });
});