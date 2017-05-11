jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");

sap.ca.scfld.md.controller.BaseFullscreenController.extend("com.sap.fullscreen.view.Timesheet", {
	onInit : function() {
		that_ts = this;
		that_ts.week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var oOptions = {
				sI18NFullscreenTitle : "My Timesheet",
				buttonList : [{
					sI18nBtnTxt  : "ADDITIONAL_BTN1",
					sIcon        : "sap-icon://nav-back",
					onBtnPressed : function(evt) {
						that_ts.oRouter.navTo("fullscreen",true);
					}
				}]
		};
		oOptions.bSuppressBookmarkButton = true;
		that_ts.setHeaderFooterOptions(oOptions);
		that_ts.oRouter.attachRouteMatched(that_ts.handleRoutematchedForTimesheet,that_ts);
	},

	handleRoutematchedForTimesheet : function(oEvent) {
		that_ts.days = [];
		if(oEvent.getParameter("name") == "timesheet") {
			var dateObject = sap.ui.getCore().getModel("SelectedWeek");
			if(dateObject != undefined) {
				that_ts.setTimesheetTable(dateObject);
			} else {
				that_ts.oRouter.navTo("fullscreen",true);
			}
		}
	},

	setTimesheetTable  : function(dateObject) {
		var oTable  = that_ts.byId("ID_TIMSHEETTABLE");
		oTable.destroyColumns();
		oTable.destroyItems();
		var column1     = new sap.m.Column({
			minScreenWidth : "Tablet",
			demandPopin	 : true,
			hAlign		 : "Left",
			width        : "20%",
			header		 : new sap.m.Text({
				text : "Project" 
			})                                                     
		});
		oTable.addColumn(column1);
		var column2     = new sap.m.Column({
			minScreenWidth : "Tablet",
			demandPopin	   : true,
			hAlign		   : "Left",
			width          : "20%",
			header		   : new sap.m.Text({
				text : "Activity" 
			})                                                     
		});
		oTable.addColumn(column2);
		for(var i=dateObject.StartDate;i<=dateObject.EndDate;i=i+(24*60*60*1000)) {
			var oColumn = new sap.m.Column({
				minScreenWidth : "Tablet",
				demandPopin	 : true,
				hAlign		 : "Center",
				width        : "5%",
				header		 : new sap.m.Text({
					text : that_ts.week[new Date(i).getDay()] 
				})                                                     
			});
			oTable.addColumn(oColumn);
		}
	},

	onAddTimesheetRow : function() {
		var oTable  = that_ts.byId("ID_TIMSHEETTABLE");
		oTable.destroyItems();
		that_ts.days.push({"Project" : "","Activity" : "","DayCollection" : []});
		for(var i=0;i<that_ts.days.length;i++) {
			var oTemp = new sap.m.ColumnListItem({
				cells : [
				         new sap.m.Input({
				        	 value : that_ts.days[i].Project
				         }),
				         new sap.m.Input({
				        	 value : that_ts.days[i].Activity
				         }),
				         ]
			});
			for(var j=0;j<oTable.getColumns().length;j++) {
				that_ts.days[i].DayCollection.push({"Day" : j+1,"Hours" : ""});
				var oInput = new sap.m.Input({
					value : that_ts.days[i].DayCollection[j].Hours
				});
				oTemp.addCell(oInput);
			}
			oTable.addItem(oTemp);
		}
	}
});