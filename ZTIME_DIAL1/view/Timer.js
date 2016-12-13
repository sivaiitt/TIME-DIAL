jQuery.sap.declare("ZTime_dial.view.Timer");
jQuery.sap.require("ZTime_dial.view.Customcontrol");
//	Simple example of using private variables
//
//	To start the stopwatch:
//		obj.start();
//
//	To get the duration in milliseconds without pausing / resuming:
//		var	x = obj.time();
//
//	To pause the stopwatch:
//		var	x = obj.stop();	// Result is duration in milliseconds
//
//	To resume a paused stopwatch
//		var	x = obj.start();	// Result is duration in milliseconds
//
//	To reset a paused stopwatch
//		obj.stop();
//
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds
		var lat = 0;
		var lon = 0;
		var lv_lat,lv_lon;

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
			
		// var	now_geo	= function(lat,lon) {
  //  if (navigator.geolocation) {
  //      navigator.geolocation.getCurrentPosition(
  //  function(position) {
  //  lv_lat = position.coords.latitude;
  //  lv_lon = position.coords.longitude;			

  //  if(parseFloat((lat).toFixed(5)) === parseFloat((lv_lat).toFixed(5)) && parseFloat((lon).toFixed(5)) === parseFloat((lv_lon).toFixed(5))){
		// 		return (new Date()).getTime(); 
  //  } else{
  //  	stop();
  //  }	   	
    	
  //  });}
     
 
		// 	}; 			
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};
			
		// this.start_geo = function(lat,lon) {
		// 		startAt	= startAt ? startAt : now_geo(lat,lon);
		// 	};			

		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
			
		// this.time_geo = function(lat,lon) {
		// 		return lapTime + (startAt ? now_geo(lat,lon) - startAt : 0); 
		// 	};			
	};

var x = new clsStopwatch();
var $time;
var clocktimer;
var GeoFence;

function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
var m,s,ms;
	var h = m = s = ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}

function show() {
	$time = document.getElementById('rpbLabel');
	update();
}

function update() {
	$time = document.getElementById('rpbLabel');
	var rpb = sap.ui.getCore().byId('rpb');
	if(rpb){
	$time.innerHTML = formatTime(x.time());
    var Value = sap.ui.getCore().byId("rpbLabel");
    var Hours = parseInt(formatTime(x.time()).split(":")[0]);
    var Min = parseInt(formatTime(x.time()).split(":")[1]);
    var Sec = parseInt(formatTime(x.time()).split(":")[2]);
    var FValue = (Hours * 60) + Min + (Sec / 60);
    var per = (FValue / 1440)*100;
    if(FValue <= 480){
         var plan = (FValue / 481)*100;
         rpb.setPercentageText(plan, Hours +":"+ Min); 
          rpb.setOvertime(0); 
        } else {
         var over = ( (FValue - 480) / 961)*100;	
         rpb.setPercentageText(99.9,Hours+":"+Min); 	
         rpb.setOvertime(over); 
        }  
	}   
  	
}

// function update_geo(lat,lon) {
// 	$time = document.getElementById('rpbLabel');
// 	var rpb = sap.ui.getCore().byId('rpb');
// 	$time.innerHTML = formatTime(x.time_geo(lat,lon));
//     var Value = sap.ui.getCore().byId("rpbLabel");
//     var Hours = parseInt(formatTime(x.time()).split(":")[0]);
//     var Min = parseInt(formatTime(x.time()).split(":")[1]);
//     var Sec = parseInt(formatTime(x.time()).split(":")[2]);
//     var FValue = (Hours * 60) + Min + (Sec / 60);
//     var per = (FValue / 1440)*100;
//     if(FValue <= 480){
//          var plan = (FValue / 481)*100;
//          rpb.setPercentageText(plan, Hours +":"+ Min); 
//           rpb.setOvertime(0); 
//         } else {
//          var over = ( (FValue - 480) / 961)*100;	
//          rpb.setPercentageText(99.9,Hours+":"+Min); 	
//          rpb.setOvertime(over); 
//         }    
  	
// }

function start() {
	clocktimer = setInterval("update()", 1);
	x.start();
}

function stop() {
	x.stop();
	clearInterval(clocktimer);
}

function start_geo(lat, lon) {
	clocktimer = setInterval("update()", 1);
	GeoFence = setInterval("check("+lat+","+lon+")", 1);
	x.start();

}

function reset() {
	stop();
    clearInterval(GeoFence);	
    clearInterval(clocktimer);
	x.reset();
	update();
}

function check(lat,lon) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
    function(position) {
    var lv_lat = position.coords.latitude;
    var lv_lon = position.coords.longitude;			

    if(parseFloat((lat).toFixed(2)) === parseFloat((lv_lat).toFixed(2)) && parseFloat((lon).toFixed(2)) === parseFloat((lv_lon).toFixed(2))){
				return; 
    }else{
    	stop();
    	clearInterval(GeoFence);
    }	   	
    	
    });}
}