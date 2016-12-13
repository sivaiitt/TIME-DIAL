jQuery.sap.declare("ZTime_dial.util.ApplicationFacade");


ZTime_dial.util.ApplicationFacade = (function(){
	
var Timedata = null;
var oModel = null;
var Dates;
var Days;
var Week;
var data;

return {
	
setTimeData:function(data){
	Timedata = data;
},

getTimeData: function(){
	return Timedata;
},

setDays:function(data){
Days = data;  	
},

getDays:function(){
return Days;   	
},

setWeek:function(data){
Week = data;   	
},

getWeek:function(){
return Week;  	
},

getSelectedDates:function(){
	return Dates;
},

setSelectedDates:function(data){
	Dates = data;
}
	
};
	
}());