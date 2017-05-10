jQuery.sap.declare("com.sap.fullscreen.customcontrols.CustomAnchor");

sap.ui.core.Control.extend("com.sap.fullscreen.customcontrols.CustomAnchor", { 
	metadata : {
		properties    : {
			text      : "string",
			dateText  : "string",
			state     : {type : "string",defaultValue : "NB"},
			selected  : {type : "boolean",defaultValue : false},
			visible   : "string"
		},
		events: {
			"itemPress" : {}
		}
	},

	onclick : function(oEvent) { 
		if(this.getSelected() == false) {
			this.setSelected(true);	
		} else {
			this.setSelected(false);
		}
		this.fireItemPress();
	},

	renderer : function(oRm,oControl) {
		oRm.write("<li");
		oRm.writeControlData(oControl);
		oRm.addStyle("display",(oControl.getVisible() == "N"? "None" : "Initial"));
		oRm.writeStyles();
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("<div");
		oRm.writeClasses();
		oRm.write(">" + oControl.getText());
		oRm.write("</div>");
		oRm.write("<div");
		if(oControl.getSelected() == true) {
			oRm.addClass("itemActive");
		} else {
			oRm.addClass("itemInactive");
			if(oControl.getState() == "BK") {
				oRm.addClass("itemBooked");
			} else if(oControl.getState() == "PB"){
				oRm.addClass("itemPartiallyBooked");
			}
		}
		oRm.writeClasses();
		oRm.write(">" + oControl.getDateText());
		oRm.write("</div>");
		oRm.write("</li>");
	}
});