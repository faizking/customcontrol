jQuery.sap.declare("com.sap.fullscreen.customcontrols.CustomCalender");
jQuery.sap.require("com.sap.fullscreen.customcontrols.CustomAnchor");
jQuery.sap.require("sap.m.Label");
jQuery.sap.require("sap.m.Button");
jQuery.sap.require("sap.m.Toolbar");

sap.ui.core.Control.extend("com.sap.fullscreen.customcontrols.CustomCalender", { 
	metadata : {
		properties : {
			date : "int",
			dateText : "string"
		},
		aggregations  : {
			items     : {multiple : true, singularName : "item"}
		},
		events : {
			"changeDate" : {}
		}
	},

	renderer : function(oRm,oControl) {
		var toolbar = new sap.m.Toolbar({ height : "40px" });
		var mytext  = new sap.m.Label({ text : oControl.getDateText(), design : "Bold"});
		var button1 =  new sap.m.Button({
			type  : "Transparent",
			icon  : "sap-icon://navigation-left-arrow",
			press : function(oEvent) {
				var date  = new Date(oControl.getDate());
				var year  = oControl.getCurrentYear((date.getMonth()-1),date);
				var month = oControl.getCurrentMonth((date.getMonth()-1));
				var days  = oControl.getDaysOfMonth(month,year);
				date = new Date(year,month,days);
				oControl.setDate(date.getTime());
				oControl.setDateText(that.months[(date.getMonth())] + " " + date.getFullYear());
				mytext.setText(that.months[(date.getMonth())] + " " + date.getFullYear());
				oControl.fireChangeDate();
			}
		});
		var button2 =  new sap.m.Button({
			type : "Transparent",
			icon : "sap-icon://navigation-right-arrow",
			press : function(oEvent) {
				var date  = new Date(oControl.getDate());
				var year  = oControl.getCurrentYear((date.getMonth()+1),date);
				var month = oControl.getCurrentMonth((date.getMonth()+1));
				var days  = oControl.getDaysOfMonth(month,year);
				date = new Date(year,month,days);
				oControl.setDate(date.getTime());
				oControl.setDateText(that.months[(date.getMonth())] + " " + date.getFullYear());
				mytext.setText(that.months[(date.getMonth())] + " " + date.getFullYear());
				oControl.fireChangeDate();
			}
		});

		var date  = new Date(oControl.getDate());
		if(date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()) {
			button2.setEnabled(false);
		} else {
			button2.setEnabled(true);
		}
		toolbar.addContent(button1);
		toolbar.addContent(new sap.m.ToolbarSpacer());
		toolbar.addContent(mytext);
		toolbar.addContent(new sap.m.ToolbarSpacer());
		toolbar.addContent(button2);
		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.writeClasses();                     
		oRm.write(">");
		oRm.renderControl(toolbar);
		oRm.write("<div");
		oRm.addClass("calBody");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("<ul");
		oRm.addClass("calList");
		oRm.writeClasses();
		oRm.write(">");
		for (var i = 0; i < oControl.getItems().length; i++) { 
			oRm.renderControl(oControl.getItems()[i]);
		}
		oRm.write("</ul>");
		oRm.write("</div>");
		oRm.write("</div>");
	},

	getCurrentMonth : function(month) {
		if(month == -1) {
			return 11;
		} else if(month == 12) {
			return 0;
		} else {
			return month;
		}
	},

	getCurrentYear : function(month,date) {
		if(month == -1) {
			return date.getFullYear() - 1;
		} else if(month == 12) {
			return date.getFullYear() + 1;
		} else {
			return date.getFullYear();
		}
	},

	getDaysOfMonth : function(month,year) {
		if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7
				|| month == 9 || month == 11) {
			return 31;
		} else if(month == 3 || month == 5 || month == 7 || month == 8 || 
				month == 10) {
			return 30;
		} else if(month == 1) {
			if(((year%4) == 0) && ((year%100) != 0) || ((year%400) == 0)) {
				return 29;
			} else {
				return 28;
			}
		}
	}
});