/*global QUnit*/

sap.ui.define([
	"fiori_agency/project1/controller/AGENCY.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AGENCY Controller");

	QUnit.test("I should test the AGENCY controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
