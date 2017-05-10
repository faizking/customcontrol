jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("com.sap.fullscreen.customcontrols.CustomAnchor");
jQuery.sap.require("com.sap.fullscreen.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");

sap.ca.scfld.md.controller.BaseFullscreenController.extend("com.sap.fullscreen.view.S1", {
	onInit : function() {
		//this is edited to check impact on git
		that = this;
		that.months  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var oOptions = {
				sI18NFullscreenTitle : "My Timesheet",
				oPositiveAction : {
					sI18nBtnTxt : "Create",
					onBtnPressed : function() {
						var flag = 0;
						var cal  = that.byId("ID_TIMECAL");
						var dateObject = null;
						for(var i=0;i<cal.getItems().length;i++) {
							if(cal.getItems()[i].getSelected()) {
								dateObject = cal.getItems()[i].getBindingContext().getObject();
								flag = 1;
								break;
							}
						}
						if(flag == 1) {
							sap.ui.getCore().setModel(dateObject,"SelectedWeek");
							that.oRouter.navTo("timesheet",true);
						} else {
							var message = "Please select the week in the calender";
							sap.m.MessageBox.show(message,{
								icon : sap.m.MessageBox.Icon.ERROR,
								title :  "Error",
								actions : sap.m.MessageBox.Action.OK});
						}
					},
				},
				buttonList : [{
					sI18nBtnTxt  : "ADDITIONAL_BTN1",
					sIcon        : "sap-icon://nav-back",
					onBtnPressed : function(evt) {

					}
				}]
		};
		oOptions.bSuppressBookmarkButton = true;
		that.setHeaderFooterOptions(oOptions);
		that.oRouter.attachRouteMatched(that.handleRoutematched,that);
	},

	handleRoutematched : function(oEvent) {
		if(oEvent.getParameter("name") == "fullscreen") {
			that.setCalenderForTimesheet();
		}
	},

	setCalenderForTimesheet : function() {
		var date = new Date();
		var cal  = that.byId("ID_TIMECAL");
		var days = cal.getDaysOfMonth(date.getMonth(),date.getFullYear());
		date.setDate(days);
		that.setWeeks(date);
		setTimeout(function() {
			that.showCurrentWeekData();
		},100);
		cal.setDate(date.getTime());
		cal.setDateText((that.months[(date.getMonth())]) + " " + date.getFullYear());
	},

	handleDate : function(oEvent) {
		var date   = new Date(oEvent.getSource().getDate());
		that.setWeeks(date);
	},

	setWeeks : function(date) {
		var i = 1;
		var count = 1;
		var newDate = null;
		var weekJson            = {};
		weekJson.WeekCollection = [];
		var currentDay = new Date();
		while(i <= date.getDate()) {
			newDate = new Date(date.getFullYear(),date.getMonth(),i);
			if(newDate.getDate() == 1) {
				if(newDate.getDay() == 0) {
					weekJson.WeekCollection.push({ "WeekNo"    : "WEEK " + count,
						"StartDate" : newDate.getTime(),
						"EndDate"   : newDate.getTime(),
						"Flag"      : "Y"});
					i = i + 1;
				} else {
					weekJson.WeekCollection.push({ "WeekNo"    : "WEEK " + count,
						"StartDate" : newDate.getTime(),
						"EndDate"   : newDate.getTime() + ((7 - newDate.getDay()) * 24 * 60 * 60 * 1000),
						"Flag"      : "Y"});
					i = (7 - newDate.getDay()) + 2;
				}
				++count;
			} else {
				if((date.getDate() - newDate.getDate()) <= 6) {
					weekJson.WeekCollection.push({ "WeekNo"    : "WEEK " + count,
						"StartDate" : newDate.getTime(),
						"EndDate"   : date.getTime(),
						"Flag"      : "Y"});
				} else {
					weekJson.WeekCollection.push({ "WeekNo"    : "WEEK " + count,
						"StartDate" : newDate.getTime(),
						"EndDate"   : newDate.getTime() + (6 * 24 * 60 * 60 * 1000),
						"Flag"      : "Y"});
				}
				i = i + 7;
				++count;
			}
		}
		for(var i=0;i<weekJson.WeekCollection.length;i++) {
			if(weekJson.WeekCollection[i].StartDate <= currentDay.getTime()) {
				continue;
			} else {
				weekJson.WeekCollection[i].Flag = "N";
			}
		}
		that.weekModel = new sap.ui.model.json.JSONModel(weekJson);
		that.getView().invalidate();
	},

	handleWeek : function(oEvent) {
		var itemParent   = oEvent.getSource().getParent(); 
		var selectedItem = parseInt(oEvent.getSource().getBindingContext().sPath.split('/')[2]);
		for(var i=0;i<itemParent.getItems().length;i++) {
			if(i != selectedItem) {
				itemParent.getItems()[i].setSelected(false);
			}
		}
	},

	onAfterRendering : function() {
		var cal  = that.byId("ID_TIMECAL");
		var oTemp = new com.sap.fullscreen.customcontrols.CustomAnchor({
			text      : "{WeekNo}",
			dateText  : "{parts: [{path: 'StartDate'},{path: 'EndDate'}],formatter: 'com.sap.fullscreen.util.Formatter.displayDate'}",
			visible   : "{Flag}",
			itemPress : that.handleWeek
		});
		cal.unbindAggregation("items");
		cal.setModel(that.weekModel);
		cal.bindAggregation("items","/WeekCollection",oTemp);
	},

	showCurrentWeekData : function() {
		var count = 0;
		var cal   = that.byId("ID_TIMECAL");
		for(var i=0;i<cal.getItems().length;i++) {
			if(cal.getItems()[i].getVisible() == "Y") {
				++count;
			}
		}
		cal.getItems()[count-1].setSelected(true);
	}
});