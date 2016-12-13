jQuery.sap.declare("ZTime_dial.view.Customcontrol");
sap.ui.core.Control.extend("my.rpb", {

			polarToCartesian: function (centerX, centerY, radius, angleInDegrees) {
		        var angleInRadians = angleInDegrees * Math.PI / 180.0;
		        var x = centerX + radius * Math.cos(angleInRadians);
		        var y = centerY + radius * Math.sin(angleInRadians);
		        return [x, y];
		    },
    		drawCircle: function (elm, centerX, centerY, radius, percentage) {
		        var angle = (360 * (percentage / 100)) % 360;
		        var start = this.polarToCartesian(centerX, centerY, radius, -90);
		        var end = this.polarToCartesian(centerX, centerY, radius, -(angle + 90));
		        var large = percentage < 50 ? 0 : 1;
		        var length = (2 * Math.PI * radius) * (percentage / 100);
//		        console.log(start, end, angle);
		        elm.setAttribute('d', 'M ' + start[0] + ',' + start[1] + ' A ' + radius + ',' + radius + ' ' + 0 + ' ' + large + ',' + 0 + ' ' + end[0] + ',' + end[1]);
		        //elm.setAttribute('stroke-dasharray', length);
		        //elm.setAttribute('stroke-dashoffset', length);
		    },
			metadata: {
				properties: {
					"size" : {type: "sap.ui.core.CSSSize", defaultValue: "200px"},
					"radius": {type: "int", defaultValue: 100},
					"thickness": {type: "int", defaultValue: 8},
					"bgcolor": {type: "sap.ui.core.CSSColor", defaultValue: "white"},
					"progresscolor": {type: "sap.ui.core.CSSColor", defaultValue: "yellow"}
				},
				
				event: {"click" : {}}
			},
			
			renderer: function(oRm, oControl) {
				var radius = parseInt(oControl.getProperty('radius'), 10);
				var thickness = parseInt(oControl.getProperty('thickness'), 10);
				var computedRadius = radius - thickness/2;
				var ocomputedRadius = computedRadius - 20; 
//				var scomputedRadius = ocomputedRadius - 5;
				oRm.write("<div"); 
				oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
				oRm.addStyle("width", oControl.getSize());  // write the Control property size; the Control has validated it to be a CSS size
				oRm.addStyle("height", oControl.getSize());
				oRm.writeStyles();
				oRm.addClass("rpb");        // add a CSS class for styles common to all control instances
				oRm.writeClasses();              // this call writes the above class plus enables support for Square.addStyleClass(...)
				oRm.write(">");
				oRm.write('<svg id= "svgid"  width="'+oControl.getSize()+'" height="'+oControl.getSize()+'"><circle id ="cid" cx="'+radius+'" cy="110" r="'+computedRadius+'" stroke="'+oControl.getProperty('bgcolor')+'" stroke-width="'+thickness+'" fill="none" />'+
//				oRm.write('<svg id= "svgid"  width="'+oControl.getSize()+'" height="'+oControl.getSize()+'"><circle id ="cid" cx="'+radius+'" cy="110" r="'+computedRadius+'"" stroke-width="'+thickness+'" fill="none" />'+				
						'<circle id ="sid" cx="'+radius+'" cy="110" r="'+ocomputedRadius+'" stroke="lightgreen" stroke-width="'+thickness+'" fill="none" />'+
						'<text id="rpb_text" fill="black" font-size="15" font-family="Verdana" x ="80" y ="120" ></text>'+
//						'<circle id ="oid" cx="'+radius+'" cy="110" r="'+scomputedRadius+'" stroke="lightblue" stroke-width="'+thickness+'" fill="none" />'+ 
						'<path id="svgpath" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" fill="none" stroke="'+oControl.getProperty('progresscolor')+'" stroke-width="'+thickness+'"></path>'+
						'<path id="osvgpath" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" fill="none" stroke="green" stroke-width="'+thickness+'"></path>'+
						'<path id="ssvgpath" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" fill="none" stroke="blue" stroke-width="'+thickness+'"></path>'+
						  '</svg>');
//				oRm.write('<span X="'+radius+' Y="110" class="rpb_text"></text>');
//				oRm.write('<text X="'+radius+' Y="110" id="rpb_text"></text>');
//				oRm.writeEscaped('0%'); // write another Control property, with XSS protection
//				oRm.write('</span>');
				oRm.write("</div>");
				
			},

			setPercentage: function(percentage) {
				var radius = parseInt(this.getProperty('radius'), 10);
//				var radius = 
				var thickness = parseInt(this.getProperty('thickness'), 10);
				var computedRadius = radius - thickness/2;
				var ocomputedRadius = computedRadius - 20; 
				this.drawCircle(document.getElementById('svgpath'), radius, 110, computedRadius, percentage);
			    if(percentage > 99.5)
			  {
				  percentage = 100;
			  }	  
				var hrs = (percentage * 8)/100;
			    document.getElementById("rpb_text").innerHTML = hrs.toFixed(2);
//				this.drawCircle(document.getElementById('osvgpath'), radius, 110, ocomputedRadius, percentage);
//				$('.rpb_text').text(percentage + "%");	//TODO This selection should be context specific and not generic class based otherwise it will change value on all rpb 
//                var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';
				
			},
			
			setPercentageText: function(percentage,text) {
				var radius = parseInt(this.getProperty('radius'), 10);
//				var radius = 
				var thickness = parseInt(this.getProperty('thickness'), 10);
				var computedRadius = radius - thickness/2;
				var ocomputedRadius = computedRadius - 20; 
				this.drawCircle(document.getElementById('svgpath'), radius, 110, computedRadius, percentage);
			 //   if(percentage > 99.5)
			 // {
				//   percentage = 100;
			 // }	  
				// var hrs = (percentage * 8)/100;
			    document.getElementById("rpb_text").innerHTML = text;
//				this.drawCircle(document.getElementById('osvgpath'), radius, 110, ocomputedRadius, percentage);
//				$('.rpb_text').text(percentage + "%");	//TODO This selection should be context specific and not generic class based otherwise it will change value on all rpb 
//                var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';
				
			},			
			
			
			setOvertime: function(percentage) {
				var radius = parseInt(this.getProperty('radius'), 10);
//				var radius = 
				var thickness = parseInt(this.getProperty('thickness'), 10);
				var computedRadius = radius - thickness/2;
				var ocomputedRadius = computedRadius - 20; 
//				this.drawCircle(document.getElementById('svgpath'), radius, 110, computedRadius, percentage);
				this.drawCircle(document.getElementById('osvgpath'), radius, 110, ocomputedRadius, percentage);
//				$('.rpb_text').text(percentage + "%");	//TODO This selection should be context specific and not generic class based otherwise it will change value on all rpb 
//                var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';
				
			},
			
			setFull: function(percentage) {
				var radius = parseInt(this.getProperty('radius'), 10);
//				var radius = 
				var thickness = parseInt(this.getProperty('thickness'), 10);
				var computedRadius = radius - thickness/2;
				var ocomputedRadius = computedRadius - 20; 
				this.drawCircle(document.getElementById('svgpath'), radius, 110, computedRadius, percentage);
//				this.drawCircle(document.getElementById('osvgpath'), radius, 110, ocomputedRadius, percentage);
//				$('.rpb_text').text(percentage + "%");	//TODO This selection should be context specific and not generic class based otherwise it will change value on all rpb 
                var path = document.querySelector('svg path');
				var length = path.getTotalLength();
				// Clear any previous transition
				path.style.transition = path.style.WebkitTransition =
				  'none';
				// Set up the starting positions
				path.style.strokeDasharray = length + ' ' + length;
				path.style.strokeDashoffset = length;
				// Trigger a layout so styles are calculated & the browser
				// picks up the starting position before animating
				path.getBoundingClientRect();
				// Define our transition
				path.style.transition = path.style.WebkitTransition =
				  'stroke-dashoffset 2s ease-in-out';
				// Go!
				path.style.strokeDashoffset = '0';
				
			}						
			
			
			
			


		});

my.rpb.prototype.onAfterRendering= function(){
	
//	document.getElementById("cid").addEventListener("mouseover",function(){
//		 $(document.getElementById("cid")).mousemove(function(event){ 
////			    $("span").text("X: " + event.pageX + ", Y: " + event.pageY);
//			    document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '110' + ' A ' + '95' + ',' + '95' + ' ' + 0 + ' ' + large + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);
//		 });
		
//	});
	document.getElementById("cid").addEventListener("click", function(){
//		var rpb = new my.rpb({size: "100px", radius: 100, thickness: 10, bgcolor: "lightgreen", progresscolor: "green"});
//		rpb.setPercentage(60);
//		document.write("Hello world");
		$(document.getElementById("cid")).ready(function(){
			  $(document.getElementById("cid")).mousemove(function(event){
//			$(document.getElementById("cid")).dragStart(function(event){
//			    $("span").text("X: " + event.pageX + ", Y: " + event.pageY); 
//			    document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '5' + ' A ' + '85' + ',' + '85' + ' ' + 0 + ' ' + '0' + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);
			  
			 
			  var center = [100,110];
			  var second = [event.pageX,event.pageY];
			  var x = angle(center,second);
			  function angle(center, p1) {
				    var p0 = {x: center[0], y: center[1] - Math.sqrt(Math.abs(p1[0] - center[0]) * Math.abs(p1[0] - center[0])
				            + Math.abs(p1[1] - center[1]) * Math.abs(p1[1] - center[1]))};
				    return (2 * Math.atan2(p1[1] - p0.y, p1[0] - p0.x)) * 180 / Math.PI;
				}
			  var rem = 360 - x;
			  var per = (rem * 100) / 360;
			  if(per > 99.5)
			  {
				  per = 99.99;
			  }	  
				  
			  var rpb = new my.rpb({size: "100px", radius: 100, thickness: 30, bgcolor: "white", progresscolor: "yellow"});
			  rpb.setPercentage(per);	
			  var hrs = (per * 8)/100;
			  //$("span").text(hrs.toFixed(2)+"hrs"); 
			  document.getElementById("rpb_text").innerHTML = hrs.toFixed(2);
			  
//			  document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '5' + ' A ' + '95' + ',' + '95' + ' ' + 0 + ' ' + '1' + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);	
//              var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';		
			  });
		});
		
		
		
		
	
	});
	
	document.getElementById("svgpath").addEventListener("click", function(){
//		var rpb = new my.rpb({size: "100px", radius: 100, thickness: 10, bgcolor: "lightgreen", progresscolor: "green"});
//		rpb.setPercentage(60);
		var rpb = new my.rpb({size: "100px", radius: 100, thickness: 30, bgcolor: "white", progresscolor: "yellow"});
		  rpb.setOvertime(0);
		$(document.getElementById("svgpath")).ready(function(){
			  $(document.getElementById("svgpath")).mousemove(function(event){ 
//			    $("span").text("X: " + event.pageX + ", Y: " + event.pageY); 
			  
			  var center = [100,110];
			  var second = [event.pageX,event.pageY];
			  var x = angle(center,second);
			  function angle(center, p1) {
				    var p0 = {x: center[0], y: center[1] - Math.sqrt(Math.abs(p1[0] - center[0]) * Math.abs(p1[0] - center[0])
				            + Math.abs(p1[1] - center[1]) * Math.abs(p1[1] - center[1]))};
				    return (2 * Math.atan2(p1[1] - p0.y, p1[0] - p0.x)) * 180 / Math.PI;
				}
			  var rem = 360 - x;
			  var per = (rem/360) * 100;
			  if(per >= 99.5)
			  {
				  per = 99.99;
			  }	  			  
			  var rpb = new my.rpb({size: "100px", radius: 100, thickness: 30, bgcolor: "white", progresscolor: "yellow"});
			  rpb.setPercentage(per);	
			  var hrs = (per * 8)/100
			  //$("span").text(hrs.toFixed(2)+"hrs"); 
//			  document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '5' + ' A ' + '95' + ',' + '95' + ' ' + 0 + ' ' + '1' + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);	
//              var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';		
			  });
		});
	
	
});
	
	document.getElementById("sid").addEventListener("click", function(){
//		var rpb = new my.rpb({size: "100px", radius: 100, thickness: 10, bgcolor: "lightgreen", progresscolor: "green"});
//		rpb.setPercentage(60);
//		document.write("Hello world");
		var rpb = new my.rpb({size: "100px", radius: 100, thickness: 30, bgcolor: "lightgreen", progresscolor: "green"});
		rpb.setFull(99.99);
		$(document.getElementById("sid")).ready(function(){
			  $(document.getElementById("sid")).mousemove(function(event){ 
//			    $("span").text("X: " + event.pageX + ", Y: " + event.pageY); 
//			    document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '5' + ' A ' + '85' + ',' + '85' + ' ' + 0 + ' ' + '0' + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);
			  
			 
			  var center = [100,110];
			  var second = [event.pageX,event.pageY];
			  var x = angle(center,second);
			  function angle(center, p1) {
				    var p0 = {x: center[0], y: center[1] - Math.sqrt(Math.abs(p1[0] - center[0]) * Math.abs(p1[0] - center[0])
				            + Math.abs(p1[1] - center[1]) * Math.abs(p1[1] - center[1]))};
				    return (2 * Math.atan2(p1[1] - p0.y, p1[0] - p0.x)) * 180 / Math.PI;
				}
			  var rem = 360 - x;
			  var per = (rem * 100) / 360;
			  if(per >= 99.5)
			  {
				  per = 99.99;
			  }	  			  
			  var rpb = new my.rpb({size: "100px", radius: 100, thickness: 30, bgcolor: "lightgreen", progresscolor: "green"});
			  
			  rpb.setOvertime(per);
			  var hrs = (per * 8)/100 + 8
			  //$("span").text(hrs.toFixed(2)+"hrs"); 
			  document.getElementById("rpb_text").innerHTML = hrs.toFixed(2);
//			  document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '5' + ' A ' + '95' + ',' + '95' + ' ' + 0 + ' ' + '1' + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);	
//              var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';		
			  });
		});
		
		
		
		
	
	});


	document.getElementById("osvgpath").addEventListener("click", function(){
//		var rpb = new my.rpb({size: "100px", radius: 100, thickness: 10, bgcolor: "lightgreen", progresscolor: "green"});
//		rpb.setPercentage(60);
		$(document.getElementById("osvgpath")).ready(function(){
			  $(document.getElementById("osvgpath")).mousemove(function(event){ 
//			    $("span").text("X: " + event.pageX + ", Y: " + event.pageY); 
			  
			  var center = [100,110];
			  var second = [event.pageX,event.pageY];
			  var x = angle(center,second);
			  function angle(center, p1) {
				    var p0 = {x: center[0], y: center[1] - Math.sqrt(Math.abs(p1[0] - center[0]) * Math.abs(p1[0] - center[0])
				            + Math.abs(p1[1] - center[1]) * Math.abs(p1[1] - center[1]))};
				    return (2 * Math.atan2(p1[1] - p0.y, p1[0] - p0.x)) * 180 / Math.PI;
				}
			  var rem = 360 - x;
			  var per = (rem/360) * 100;
			  if(per >= 99.5)
			  {
				  per = 99.99;
			  }	  			  
			  var rpb = new my.rpb({size: "100px", radius: 100, thickness: 30, bgcolor: "lightgreen", progresscolor: "green"});
			  rpb.setOvertime(per);	
			  var hrs = (per * 8)/100 + 8
			  //$("span").text(hrs.toFixed(2)+"hrs"); 
			  document.getElementById("rpb_text").innerHTML = hrs.toFixed(2);
//			  document.getElementById("svgpath").setAttribute('d', 'M ' + '100' + ',' + '5' + ' A ' + '95' + ',' + '95' + ' ' + 0 + ' ' + '1' + ',' + 0 + ' ' + event.pageX + ',' + event.pageY);	
//              var path = document.querySelector('svg path');
//				var length = path.getTotalLength();
//				// Clear any previous transition
//				path.style.transition = path.style.WebkitTransition =
//				  'none';
//				// Set up the starting positions
//				path.style.strokeDasharray = length + ' ' + length;
//				path.style.strokeDashoffset = length;
//				// Trigger a layout so styles are calculated & the browser
//				// picks up the starting position before animating
//				path.getBoundingClientRect();
//				// Define our transition
//				path.style.transition = path.style.WebkitTransition =
//				  'stroke-dashoffset 2s ease-in-out';
//				// Go!
//				path.style.strokeDashoffset = '0';		
			  });
		});
	
	
});	
	



}