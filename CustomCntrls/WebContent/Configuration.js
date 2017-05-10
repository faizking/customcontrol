
jQuery.sap.declare("com.sap.fullscreen.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("com.sap.fullscreen.Configuration", {

	oServiceParams: {
		serviceList: [
			{
				name: "NorthwindEntities",
				 masterCollection: "Customers",
				serviceUrl: "http://services.odata.org/V4/Northwind/Northwind.svc/",
				isDefault: true,
				mockedDataSource: "/com.sap.fullscreen/model/metadata.xml"
			}
		]
	},

	getServiceParams: function () {
		return this.oServiceParams;
	},

	getAppConfig: function() {
		return this.oAppConfig;
	},

	/**
	 * @inherit
	 */
	getServiceList: function () {
		return this.oServiceParams.serviceList;
	},

	getMasterKeyAttributes: function () {
		return ["Id"];
	}

});
