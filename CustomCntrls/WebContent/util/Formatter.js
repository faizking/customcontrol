jQuery.sap.declare("com.sap.fullscreen.util.Formatter");

com.sap.fullscreen.util.Formatter = {

		iconVisible : function(value) {
			if(value == "X") {
				return true;
			}
			return false;
		},
		
		displayDate : function(value1,value2) {
			var day  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			if(value2 == null || value1 == value2) {
				var date = new Date(value1);
				return day[date.getDay()]+" " + date.getDate();
			} else {
				var date1 = new Date(value1);
				var date2 = new Date(value2);
				return day[date1.getDay()]+" " + date1.getDate() + " - " + day[date2.getDay()]+" " + date2.getDate();
			}
		}
};