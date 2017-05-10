jQuery.sap.declare("com.sap.fullscreen.Component");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

sap.ca.scfld.md.ComponentBase.extend("com.sap.fullscreen.Component", {
	metadata : sap.ca.scfld.md.ComponentBase.createMetaData("FS", {
		"name": "Fullscreen Sample",
		"version" : "${project.version}",
		"library" : "com.sap.fullscreen",
		"includes" : ["css/style.css"],
		"dependencies" : {
			"libs" : ["sap.m"],
			"components" : [],
		},
		viewPath : "com.sap.fullscreen.view",
		fullScreenPageRoutes : {
			"fullscreen" : {
				"pattern" : "",
				"view" : "S1"
			},
			"timesheet" : {
				"pattern" : "Timesheet",
				"view" : "Timesheet"
			}
		},
	}),	

	createContent : function() {
		var oViewData = {component: this};
		return sap.ui.view({
			viewName : "com.sap.fullscreen.Main",
			type : sap.ui.core.mvc.ViewType.XML,
			viewData : oViewData
		});
	}
});