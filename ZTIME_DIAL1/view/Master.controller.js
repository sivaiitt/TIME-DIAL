jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("ZTime_dial.view.Customcontrol");
jQuery.sap.require("ZTime_dial.view.Timer");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("ZTime_dial.util.ApplicationFacade");
jQuery.sap.require("sap.m.Dialog");

sap.ui.core.mvc.Controller.extend("ZTime_dial.view.Master", {
	_oCatalog: null,
	_oResourceBundle: null,

	onInit: function() {

		this.initializeTable();
		this.changeToOneWeek();

		oApplication = ZTime_dial.util.ApplicationFacade;
		// this.oApplication = this.oApplicationFacade.oApplicationImplementation;     	

		var oModel = new sap.ui.model.json.JSONModel({
			phone: sap.ui.Device.system.phone
		});
		//Application Facade changes
		// this.oApplication.setModel(oModel);     	

		this.getTimeDataList("20151211", "20161217", function(data) {
			// var a = data.results;
			var oModel = new sap.ui.model.json.JSONModel({
				phone: sap.ui.Device.system.phone
			});
			oModel.setData(data);
			oApplication.setTimeData(oModel);
		});
		// oApplication.setTimeData(data);
		this.getDays("20161211", "20161217", function(data) {
			var oModel = new sap.ui.model.json.JSONModel({
				phone: sap.ui.Device.system.phone
			});
			oModel.setData(data.results);
			oApplication.setDays(oModel);
		});

		var oModel = oApplication.getTimeData();
		var data = oModel.getData();
		this.updateData(data);

		var result = this.byId("SplitAppDemo");
		result.setMode("HideMode");
		// var oSegBut = this.getView().byId("lab");
		// oSegBut.setSelectedButton("Record");
		var oHorizontal = this.getView().byId("horizontal1");
		var oHorizontal1 = this.getView().byId("horizontal2");
		var oHorizontal2 = this.getView().byId("horizontal3");
		var oVertical = this.getView().byId("vertical");
		//  var tab = new sap.m.IconTabBar("recTab",{
		//      expanded:false
		//  }).addStyleClass("sapUiResponsiveContentPadding");
		//  var tab_filter = new sap.m.IconTabFilter("Filt1",{count:4,
		//  text:"Records"});
		//  var list = new sap.m.List("list1",{
		//      growing:true,
		// growingThreshold:4,
		// growingScrollToLoad:false	
		//  });
		//  var standardl = new sap.m.StandardListItem("slist",{
		//    title: "Records"
		//  });
		//  list.addItem(standardl);    
		//  tab_filter.addContent(list);
		//  tab.addItem(tab_filter);

		var rpb = new my.rpb("rpb", {
			size: "250px",
			radius: 100,
			thickness: 30,
			bgcolor: "pink",
			progresscolor: "orange"
		});
		var Hours_Label = new sap.m.Label("HLabel",{text:"Hours:"});
		var slide_hours = new sap.m.Slider("slide_h", {
			min: 0,
			max: 23,
			enabled: true,
			liveChange: function() {
				var a = this.getValue();
				var b = sap.ui.getCore().byId("slide_m").getValue();
				var min = (a * 60) + b;
				var per = (min / 1440) * 100;

				if (min <= 480) {
					var plan = (min / 481) * 100;
					rpb.setPercentageText(plan, a + ":" + b);
					rpb.setOvertime(0);
				} else {
					var over = ((min - 480) / 961) * 100;
					rpb.setPercentageText(99.9, a + ":" + b);
					rpb.setOvertime(over);
				}

			}

		}).addStyleClass("sapUiSmallMarginBottom");
		var Minutes_Label = new sap.m.Label("MLabel",{text:"Minutes:"});
		var slide_min = new sap.m.Slider("slide_m", {
			min: 0,
			max: 59,
			enabled: true,
			liveChange: function() {
				var a = this.getValue();
				var b = sap.ui.getCore().byId("slide_h").getValue();
				var min = (b * 60) + a;
				var per = (min / 1440) * 100;

				if (min <= 480) {
					var plan = (min / 481) * 100;
					rpb.setPercentageText(plan, b + ":" + a);
					rpb.setOvertime(0);
				} else {
					var over = ((min - 480) / 961) * 100;
					rpb.setPercentageText(99.9, b + ":" + a);
					rpb.setOvertime(over);
				}

			}
		});
		var Startt = new sap.m.Button("start", {
			text: "Start",
			type: "Accept",
			Visible: false,
			press: function() {
				if (sap.ui.getCore().byId("start").getText() == "Start") {
					sap.ui.getCore().byId("start").setText("Pause");
					start();
					// this.attachPress(OnAttributes());  		
					var Value = sap.ui.getCore().byId("rpbLabel");
					// var Hours = Value.getText().split(":")[0].parseInt();
					// var Min = Value.getText().split(":")[1].parseInt();
					// var Sec = Value.getText().split(":")[2].parseInt();
					// var FValue = (Hours * 60) + Min + (Sec / 60);

				} else {
					sap.ui.getCore().byId("start").setText("Start");
					stop();
					// OnAttributes();
					// sap.ui.getController
					// var dialog = new sap.m.Dialog({
					// 	title: 'Working Time Attributes',
					// 	contentWidth: "300px",
					// 	contentHeight: "300px",
					// 	resizable: true,
					// 	beginButton: new sap.m.Button({
					// 		text: 'Close',
					// 		press: function () {
					// 			dialog.close();
					// 		}
					// 	}),
					// 	afterClose: function() {
					// 		dialog.destroy();
					// 	}
					// });	
					// var VText = new sap.m.Text({text:"Attendance/Absence Type: "});
					// var VInput = new sap.m.Input({text:"Attendance/Absence Type: "});
					// var VLay = new sap.ui.layout.VerticalLayout();
					// var HLay = new sap.ui.layout.HorizontalLayout();
					//         // VLay.addContent(HLay);
					//         HLay.addContent(VText);
					//         HLay.addContent(VInput);
					//         VLay.addContent(HLay);
					//         dialog.addContent(VLay);

				}

			}
		});

		var Stopp = new sap.m.Button("stop", {
			text: "Stop",
			type: "Reject",
			Visible: false,
			press: function() {
				stop();
				var results;
				var dialog = new sap.m.Dialog({
					title: 'Working Time Attributes',
					contentWidth: "300px",
					contentHeight: "300px",
					resizable: true,
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function() {
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancel',
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/SRA002_TIMESHEET_SRV");
				oModel.read("/ValueHelpList", null, [
					"$filter=FieldName eq 'AWART' and StartDate eq '20151115' and EndDate eq '20151115' &$top=30&$skip=0"
				], false, function(Odata) {
					results = Odata.results;
				}, function(oError) {});
				var VText = new sap.m.Text({
					text: " Att/Abs Type: "
				});

				var VItem = new sap.ui.core.Item({
					key: "{FieldId}",
					text: "{FieldValue}"
				});
				var VInput = new sap.m.ComboBox({
					items: {
						path: "/",
						template: VItem
					}
				});
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(results);
				VInput.setModel(oModel);
				// VItem.setModel(oModel);
				// VItem.bindElement("/");
				// VInput.addItem(VItem);
				var VLay = new sap.ui.layout.VerticalLayout();
				var HLay = new sap.ui.layout.HorizontalLayout();
				// VLay.addContent(HLay);
				HLay.addContent(VText);
				HLay.addContent(VInput);
				VLay.addContent(HLay);
				dialog.addContent(VLay);
				// this.getView().addDependent(dialog);
				dialog.open();

			}
		});

		oHorizontal.addContent(rpb);
		// oHorizontal.addContent(tab);
		var oLabel = new sap.m.Label("rpbLabel", {
			text: "00:00:00:000"
		}).addStyleClass("TimerLabel");
		oLabel.setVisible(false);
		oHorizontal1.insertContent(oLabel, 4);
		oHorizontal2.addItem(Startt);
		oHorizontal2.addItem(Stopp);
		oVertical.addContent(Hours_Label);
		oVertical.addContent(slide_hours);
		oVertical.addContent(Minutes_Label);
		oVertical.addContent(slide_min);
		this.onRecord();

	},

	onTimer: function() {
		var oSlide = sap.ui.getCore().byId("slide_h");
		oSlide.setVisible(false);
		var oSlide = sap.ui.getCore().byId("slide_m");
		oSlide.setVisible(false);
		var oStart = sap.ui.getCore().byId("start");
		oStart.setVisible(true);
		var oStart = sap.ui.getCore().byId("stop");
		oStart.setVisible(true);
		var HLabel = sap.ui.getCore().byId("HLabel");
	    HLabel.setVisible(false);
		var MLabel = sap.ui.getCore().byId("MLabel");
	    MLabel.setVisible(false);	    

		var Label = sap.ui.getCore().byId("rpbLabel");
		Label.setVisible(true);
	},

	onRecord: function() {
		var oStart = sap.ui.getCore().byId("start");
		oStart.setVisible(false);
		var oStop = sap.ui.getCore().byId("stop");
		oStop.setVisible(false);
		var oSlide = sap.ui.getCore().byId("slide_h");
		oSlide.setVisible(true);
		var oSlide = sap.ui.getCore().byId("slide_m");
		oSlide.setVisible(true);
		var Label = sap.ui.getCore().byId("rpbLabel");
		Label.setVisible(false);
		var HLabel = sap.ui.getCore().byId("HLabel");
		HLabel.setVisible(true);		
		var MLabel = sap.ui.getCore().byId("MLabel");
		MLabel.setVisible(true);		


	},

	liveChange: function(oEvt) {
		var v = oEvt;
	},

	changeToOneWeek: function() {
		var oCalendar = this.getView().byId("durationCalendar");
		oCalendar.setMonthsPerRow(1);
		oCalendar.setWeeksPerRow(1);
		oCalendar.setSingleRow(true);
	},

	changeToTwoWeeks: function() {
		var oCalendar = this.getView().byId("durationCalendar");
		oCalendar.setMonthsPerRow(1);
		oCalendar.setWeeksPerRow(2);
		oCalendar.setSingleRow(true);
	},

	changeToOneMonth: function() {
		var oCalendar = this.getView().byId("durationCalendar");
		oCalendar.setSingleRow(false);
		oCalendar.setMonthsToDisplay(1);
		oCalendar.setWeeksPerRow(1);
		oCalendar.setMonthsPerRow(1);
	},

	changeToTwoMonths: function() {
		var oCalendar = this.getView().byId("durationCalendar");
		oCalendar.setSingleRow(false);
		oCalendar.setMonthsToDisplay(2);
		oCalendar.setWeeksPerRow(1);
		oCalendar.setMonthsPerRow(2);
	},
	onSettings: function() {
		var oSlide = sap.ui.getCore().byId("slide_h");
		oSlide.setVisible(false);
		var oSlide = sap.ui.getCore().byId("slide_m");
		oSlide.setVisible(false);
		var oStart = sap.ui.getCore().byId("start");
		oStart.setVisible(true);
		var oStart = sap.ui.getCore().byId("stop");
		oStart.setVisible(true);
		var Label = sap.ui.getCore().byId("rpbLabel");
		Label.setVisible(true);
		var dialog = new sap.m.Dialog({
			title: 'Geo Fence Settings',
			contentWidth: "300px",
			contentHeight: "300px",
			resizable: true,
			beginButton: new sap.m.Button({
				text: 'Close',
				press: function() {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});
		var VLay = new sap.ui.layout.VerticalLayout("GeoVLayout");
		var HLay = new sap.ui.layout.HorizontalLayout("GeoHLayout");
		var glabel = new sap.m.Label("glabel", {
			text: "Geo Location    : "
		});
		var gswitch = new sap.m.Switch("gswitch", {
			state: false,
			change: function() {
				var gv_lat, gv_lon;
				if (this.getState() == true) {
					var oStart = sap.ui.getCore().byId("start");
					oStart.setVisible(false);
					var oStart = sap.ui.getCore().byId("stop");
					oStart.setVisible(false);
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(
							//     	function(position){
							// var latlon = position.coords.latitude + "," + position.coords.longitude;

							// var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
							// +latlon+"&zoom=14&size=400x300&sensor=false";
							// // document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
							// var image = sap.ui.getCore().byId("GeoImage");
							// image.setSrc(img_url);
							//}
							function(position) {
								var lat = position.coords.latitude;
								var lon = position.coords.longitude;
								gv_lat = position.coords.latitude;
								gv_lon = position.coords.longitude;

								var latlon = new google.maps.LatLng(lat, lon);
								var mapholder = document.getElementById("GeoImage");
								mapholder.style.height = '250px';
								mapholder.style.width = '500px';

								var myOptions = {
									center: latlon,
									zoom: 14,
									mapTypeId: google.maps.MapTypeId.ROADMAP,
									mapTypeControl: false,
									navigationControlOptions: {
										style: google.maps.NavigationControlStyle.SMALL
									}
								};

								var map = new google.maps.Map(document.getElementById("GeoImage"), myOptions);
								var marker = new google.maps.Marker({
									position: latlon,
									map: map,
									title: "You are here!"
								});
								var bounds = {
									north: position.coords.latitude + 0.001,
									south: position.coords.latitude - 0.001,
									east: position.coords.longitude + 0.001,
									west: position.coords.longitude - 0.001
								};
								var rectangle = new google.maps.Rectangle({
									bounds: bounds,
									editable: true
								});
								rectangle.setMap(map);
								var drawingManager = new google.maps.drawing.DrawingManager({
									drawingMode: google.maps.drawing.OverlayType.MARKER,
									drawingControl: true,
									drawingControlOptions: {
										position: google.maps.ControlPosition.TOP_CENTER,
										drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
									},
									markerOptions: {
										icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
									},
									circleOptions: {
										fillColor: '#FF0000',
										fillOpacity: 0.8,
										strokeWeight: 2,
										clickable: false,
										editable: true,
										fillOpacity: 0.35,
										zIndex: 1
									}
								});
								drawingManager.setMap(map);
								start_geo(gv_lat, gv_lon);
								sap.ui.getCore().byId("start").setText("Pause");
							}
						);
					} else {
						// x.innerHTML = "Geolocation is not supported by this browser.";

					}

				} else {
					var off = sap.ui.getCore().byId("GeoImage");
					off.destroyContent();
					stop();
				}

			}
		});
		// var image = new sap.m.Image("GeoImage");
		var image = new sap.ui.layout.HorizontalLayout("GeoImage");

		VLay.addContent(HLay);
		HLay.addContent(glabel);
		HLay.addContent(gswitch);
		VLay.addContent(image);
		dialog.addContent(VLay);
		//to get access to the global model
		this.getView().addDependent(dialog);
		dialog.open();
	},

	onSelect: function(oEvent) {
		var selectedDate = new Date(oEvent.getParameter("date"));
		var didSelect = oEvent.getParameter("didSelect");
		// selectDate(selectedDate, didSelect);
		// this.scrollTo(oEvent);
	},

	selectDate: function() {

	},

	OnAttributes: function() {
		reset();
		var dialog = new sap.m.Dialog({
			title: 'Working Time Attributes',
			contentWidth: "300px",
			contentHeight: "300px",
			resizable: true,
			beginButton: new sap.m.Button({
				text: 'Close',
				press: function() {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});
		var VText = new sap.m.Text({
			text: "Att/Abs Type: "
		});
		var VInput = new sap.m.ComboBox();
		var VItem = new sap.ui.core.Item({
			Key: "0800",
			Text: "Productive Hours"
		});
		VInput.addItem(VItem);
		var VLay = new sap.ui.layout.VerticalLayout("IVLay");
		var HLay = new sap.ui.layout.HorizontalLayout("IHLay");
		// VLay.addContent(HLay);
		HLay.addContent(VText);
		HLay.addContent(VInput);
		VLay.addContent(HLay);
		dialog.addContent(VLay);
		this.getView().addDependent(dialog);
		dialog.open();

	},

	initializeTable: function() {
		this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
		var headerCol = new sap.m.Column({
			hAlign: "Left",
			/*demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",*/
			header: new sap.m.Label({
				design: "Bold",
				text: "COST ASSIGNMENT"
			})
		});
		this.entryListContents.addColumn(headerCol);
		if (this.clockEntry) {

			headerCol = new sap.m.Column({
				hAlign: "Center",
				demandPopin: true,
				minScreenWidth: "Tablet",
				popinDisplay: "Inline",
				header: new sap.m.Label({
					design: "Bold",
					text: "START TIME"
				})
			});

			this.entryListContents.addColumn(headerCol);

			headerCol = new sap.m.Column({
				hAlign: "Center",
				demandPopin: true,
				minScreenWidth: "Tablet",
				popinDisplay: "Inline",
				header: new sap.m.Label({
					design: "Bold",
					text: "END TIME"
				})
			});

			this.entryListContents.addColumn(headerCol);

		}

		headerCol = new sap.m.Column({
			hAlign: "Center",
			demandPopin: true,
			minScreenWidth: "Tablet",
			popinDisplay: "Inline",
			header: new sap.m.Label({
				design: "Bold",
				text: "DURATION"
			})
		});

		this.entryListContents.addColumn(headerCol);

		headerCol = new sap.m.Column({
			hAlign: "Right",
			demandPopin: true,
			minScreenWidth: "Tablet",
			popinDisplay: "Inline",
			header: new sap.m.Label({
				design: "Bold",
				text: "STATUS"
			})
		});
		/**
		 * @ControllerHook Modify the clumns in the table
		 * This hook method can be used to add and remove columns for the table used to display the entries
		 * It is called after the standard columns are added to the table
		 * @callback hcm.mytimesheet.view.S3~extHookAlterColumns
		 * @param {object} Table Header Object
		 * @return {object} Table Footer Object
		 */

		if (this.extHookAlterColumns) {
			headerCol = this.extHookAlterColumns(headerCol);
		}
		this.entryListContents.addColumn(headerCol);
	},

	getTimeDataList: function(begda, endda, fSuccess) {
		var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/SRA002_TIMESHEET_SRV/");
		oModel.read(
			"/TimeDataList",
			null, [
				// "$filter=Pernr eq '" + pernr
				//+ "' and 
				"$filter=StartDate eq '" + begda + "' and EndDate eq '" + endda + "'"
			],
			false,
			function(oData) {
				for (var i = 0; i < oData.results.length; i++) {
					oData.results[i].Level = oData.results[i].Level.toString().trim();
				}
				// self.hideBusy();
				fSuccess(oData.results);

			},
			function(oError) {
				// self.hideBusy(true);
				self.processError(oError);
			});

	},

	getDays: function(begda, endda, fSuccess) {
		var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/SRA002_TIMESHEET_SRV/");
		oModel
			.read(
				"/WorkCalendars",
				null, ["$filter=StartDate eq '" + begda + "' and EndDate eq '" + endda + "'"],
				false,
				function(oData) {

					// mainModel.oHeaders =
					// oResponse.headers["x-csrf-token"];
					fSuccess(oData);
					// self.hideBusy();
				},
				function() {

				});
	},

	updateData: function(list_data) {
		// grab the entry list contents vbox for populating
		var oModel = oApplication.getDays();
		var oTime_data = new sap.ui.model.json.JSONModel({
			phone: sap.ui.Device.system.phone
		});
		var days = oModel.getData();
		var self = this;
		var oObject;
		this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
		this.entryListContents.destroyItems();

		for (var i = 0; i < days.length; i++) {
			// 	// var sheaderData = (!days[i].entries[0].mainItem)? " (No Data)": "";
			// 	// create and prepare a day entry
			var oWeekEntryDayHeader = new sap.m.GroupHeaderListItem({
				title: days[i].Date.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3-$2-$1')
					// + sheaderData
			});

			oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
				key: "day",
				value: days[i].Date
			}));

			this.entryListContents.addItem(oWeekEntryDayHeader);
			var oSingleListEntry = new sap.m.ColumnListItem({
				type: "Inactive",
				tap: function(oEvent) {
					// self.onItemSelectGotoEdit(oEvent);
				}
			});

			for (var j = 0; j < list_data.length; j++) {

				// 	// Commenting the No Data Header
				// 	/*

				if (days[i].Date === list_data[j].WorkDate) {
					//var oSingleListEntry = new sap.m.GroupHeaderListItem({title : "No Data "});	

					// 	 *
					// 	 * (!days[i].entries[0].mainItem)? this.entryListContents.addItem(oSingleListEntry): "";
					// 	 */

					// 	// set whether this day is selected or not
					// 	// oWeekEntryDayHeader.setSelected(days[i].selected);

					// 	// TODO added for new entries always
					// 	if (!days[i].entries[days[i].entries.length]) {
					// 		if (days[i].entries[days[i].entries.length - 1]) {
					// 			if (days[i].entries[days[i].entries.length - 1].newEntry) {

					// 			}
					// 			// Changed New Entry to false
					// 			else {
					// 				days[i].entries.push({
					// 					newEntry: true
					// 				});
					// 			}
					// 		}
					// 	}

					// 	// load the items for this day entry
					// 	for (var j = 0; j < days[i].entries.length; j++) {
					// 		var list_item_entry = days[i].entries[j];

					// 		if (list_item_entry.deleted) {
					// 			continue;
					// 		}

					// 		oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
					// 			key: "day",
					// 			value: i
					// 		}));
					// 		oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
					// 			key: "entry",
					// 			value: j
					// 		}));
					// 		oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
					// 			key: "dateformated",
					// 			value: days[i].dateFormatted
					// 		}));
					// 		oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
					// 			key: "selectedDate",
					// 			value: days[i].dateStr
					// 		}));

					// 		if (list_item_entry.newEntry) {
					// 			// Removing adding of New Cell for New entry as it is not required for new Mockup
					// 			oSingleListEntry.addCell(new sap.m.Label({
					// 				text: this.oBundle.getText("ADD_NEW")
					// 			}));
					// 			// var cell = new sap.ui.layout.VerticalLayout();
					// 			// cell.addContent(new sap.m.ObjectStatus());
					// 			oSingleListEntry.addCell(new sap.m.Label());
					// 			//two Extra labels 
					// 			oSingleListEntry.addCell(new sap.m.Label());
					// 			oSingleListEntry.addCell(new sap.m.Label());
					// 			oSingleListEntry.addCell(new sap.m.ObjectStatus());
					// 		} else {
					// 			oObject = new sap.m.ObjectIdentifier({
					// 				title: list_item_entry.mainItem,
					// 				text: list_item_entry.subItems,
					// 				badgeNotes: list_item_entry.hasNotes
					// 			});
					// 			if (list_item_entry.showError || list_item_entry.rejectionReason) {
					// 				/*var cell = new sap.ui.layout.VerticalLayout();
					// 								cell.addContent(oObject);

					// 								if (list_item_entry.showError) {
					// 									cell.addContent(new sap.m.ObjectStatus({
					// 										text : list_item_entry.error,
					// 										state : sap.ui.core.ValueState.Error
					// 									}));
					// 								} else {
					// 									cell.addContent(new sap.m.ObjectStatus({
					// 										text : list_item_entry.rejectionReason,
					// 										state : sap.ui.core.ValueState.Error
					// 									}));
					// 								}*/
					// 				if (list_item_entry.showError) {
					// 					oObject = new sap.m.ObjectIdentifier({
					// 						title: list_item_entry.mainItem,
					// 						text: list_item_entry.error,
					// 						badgeNotes: list_item_entry.hasNotes
					// 					});
					// 				} else {
					// 					oObject = new sap.m.ObjectIdentifier({
					// 						title: list_item_entry.mainItem,
					// 						text: list_item_entry.rejectionReason,
					// 						badgeNotes: list_item_entry.hasNotes
					// 					});
					// 				}
					// 				oSingleListEntry.addCell(oObject);
					// 			} else {
					// 				oSingleListEntry.addCell(oObject);
					// 			}
					// 			var hrsMinText = list_item_entry.hours + this.oBundle.getText("HOURS_LABEL") + " " + list_item_entry.minutes + this.oBundle.getText(
					// 				"MINUTES_LABEL");
					// 			//Datetime
					// 			var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
					// 				pattern: "HHmmss"
					// 			});
					// 			var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
					// 				style: "medium"
					// 			});
					// 			var startTimeFormatted;
					// 			var endTimeFormatted;
					// 			if (this.clockEntry) {
					// 				startTimeFormatted = timeParser.parse(list_item_entry.startTime);
					// 				oSingleListEntry.addCell(new sap.m.Label({
					// 					text: timeFormatter.format(startTimeFormatted)
					// 				}));
					// 				endTimeFormatted = timeParser.parse(list_item_entry.endTime);
					// 				oSingleListEntry.addCell(new sap.m.Label({
					// 					text: timeFormatter.format(endTimeFormatted)
					// 				}));
					// 			} else {
					// 				oSingleListEntry.addCell(new sap.m.Label());
					// 				oSingleListEntry.addCell(new sap.m.Label());
					// 			}

					// 			//Note 1959135: Display decimal time format or HH:MM time format
					// 			var InitalInfoModel = self.oApplication.getModel("timesheet_initialInfo");
					// 			var decimalTimeEntry = InitalInfoModel.getData().decimalTimeEntry;

					// 			if (decimalTimeEntry) {
					// 				oSingleListEntry.addCell(new sap.m.Label({
					// 					text: sap.ca.ui.model.format.NumberFormat.getInstance({
					// 						style: 'standard'
					// 					}).format(list_item_entry.time), //dot-comma issue
					// 					visible: list_item_entry.showTime
					// 				}));
					// 			} else {
					// 				oSingleListEntry.addCell(new sap.m.Label({
					// 					text: hrsMinText,
					// 					visible: list_item_entry.showTime
					// 				}));
					// 			}

					// 			// Adding the status in the table
					// 			var stateOfStatus;
					// 			if (list_item_entry.statusId == "REJECTED" || list_item_entry.statusId == "MSAVE") { //Note:save should also be in red color	
					// 				stateOfStatus = sap.ui.core.ValueState.Error;
					// 			} else {
					// 				stateOfStatus = sap.ui.core.ValueState.Success;
					// 			}
					// oSingleListEntry.setType("Navigation");
					if (list_data[j].FieldName === "AWART") {
						oSingleListEntry.addCell(new sap.m.ObjectStatus({
							text: list_data[j].FieldValueText
								// state: 
						}));
					} else if (list_data[j].FieldName === "TIME") {
						oSingleListEntry.insertCell(new sap.m.ObjectStatus({
							text: list_data[j].FieldValue + " " + list_data[j].FieldValueText
								// state: 
						}), 1);

					} else if (list_data[j].FieldName === "STATUS") {
						oSingleListEntry.insertCell(new sap.m.ObjectStatus({
							text: list_data[j].FieldValueText
								// state: 
						}), 2);
						this.entryListContents.addItem(oSingleListEntry);
					}

				}
				// 		// TODO Check

			}

			// 		/*
			// 		 * if(list_item_entry.mainItem){ this.entryListContents.ad"dItem(oSingleListEntry); }else{
			// 		 *  };
			// 		 */

			// 	}
			// }
			// // if (sap.ui.Device.system.phone) {
			// // 	this.byId("WEEKLY_PAGE").setTitle(
			// // 		this.oBundle.getText("SUMMARY", [
			// // 			this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().start)),
			// // 			this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().end))
			// // 		]));
			// // }
			// if (sap.ui.Device.system.phone || sap.ui.Device.system.tablet) {
			// 	var oSwipeContent = new sap.m.Button({
			// 		text: this.oBundle.getText("DELETE"),
			// 		type: "Reject"

			// 	});
			// 	var self = this;
			// 	oSwipeContent.attachPress(function(event) {
			// 		/*
			// 						 * var oData = oModel.getData();
			// 						oData.days[self.dayIndex].entries[self.entryIndex].deleted = true;
			// 						self.checkHours(oData, self.dayIndex);
			// 						self.loadListWithoModel();
			// 						self.checkSubmit();
			// 						*
			// 						*/
			// 		//Note 2085833: Delete button functionality which appears on swipe 
			// 		var dayIndex;
			// 		var entryIndex;
			// 		var oData = oModel.getData();
			// 		var swipedItem = event.getSource().getParent().getSwipedItem();
			// 		dayIndex = swipedItem.data().day;
			// 		entryIndex = swipedItem.data().entry;
			// 		oData.days[dayIndex].entries[entryIndex].deleted = true;
			// 		self.checkHours(oData, dayIndex);
			// 		self.deleteForSwipe(dayIndex, entryIndex);
			// 		self.loadListWithoModel();
			// 		self.checkSubmit();
			// 	});
			// 	this.byId("ENTRY_LIST_CONTENTS").setSwipeContent(oSwipeContent);
			// }

			// // this sets the size of the status bar to fill the height of the whole row
			// /*setTimeout(function() {
			// 					$(".sapTSM-WPEntryColor").each(function(index, value) {
			// 						var $value = $(this);
			// 						var height = $value.parent().parent().height();
			// 						$value.height(height);
			// 					});
			// 				}, 500);*/
			// /**
			//  * @ControllerHook Extend behavior of Load List
			//  * This hook method can be used to add UI or business logic
			//  * It is called when the LoadList method executes
			//  * @callback hcm.emp.mytimesheet.view.S3~extHookLoadList
			//  */
			// if (this.extHookLoadList) {
			// 	this.extHookLoadList();
		}
	},

	convertDateFormat: function(date) {
		return sap.ui.core.format.DateFormat.getDateInstance({
			style: "medium"
		}).format(date);
	},

	onListItemPress: function(oEvent) {
		var oScreen = oEvent.getParameter("listItem").getCustomData()[0].getValue();
		if (oScreen === "Manual") {
			this.onRecord();
		} else if (oScreen === "Timer") {
			this.onTimer();
		} else if (oScreen === "GeoFence") {
			this.onSettings();
		} else if (oScreen === "KPI") {
			this.KpiMonitor();
		}

	},
	UpdateDates: function() {
		var oCalendar = this.getView().byId("durationCalendar");
		var aSelectedDates = oCalendar.getSelectedDates();
		var strDate;
		var oData = {
			selectedDates: []
		};
		if (aSelectedDates.length > 0) {
			for (var i = 0; i < aSelectedDates.length; i++) {
				strDate = aSelectedDates[i];
				oData.selectedDates.push({
					Date: strDate
				});
				// Because of potential issues due to DST and the time in the night at which the change happens,
				// the recommended way to instantiate a Date object is:
				// var oDate = sap.me.Calendar.parseDate(strDate);
				// Do not rely on anything lower than the day unit in this Date object.
				// Hours, minutes, seconds, milliseconds must not be taken into account.

				// Since you are reading this, the explanation why the hours must not be taken into account.
				// Change your computer's time zone to Brasilia (UTC-3)
				// Open your favorite browser and create a Date object for October 19th, 2014:
				// var oTheDayBefore = new Date(2014, 9, 19);
				// Display 'oTheDayBefore'.
			}
			// this.oModel.setData(oData);
			oApplication.setSelectedDates(oData);
		} else {
			this._clearModel();
		}
	},

	_clearModel: function() {
		oApplication.setSelectedDates({
			selectedDates: []
		});
	},

	onSelect: function() {
		this.UpdateDates();

	},
	onSave: function() {
				stop();
				var results;
				var dialog = new sap.m.Dialog({
					title: 'Working Time Attributes',
					contentWidth: "300px",
					contentHeight: "300px",
					resizable: true,
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function() {
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancel',
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/SRA002_TIMESHEET_SRV");
				oModel.read("/ValueHelpList", null, [
					"$filter=FieldName eq 'AWART' and StartDate eq '20151115' and EndDate eq '20151115' &$top=30&$skip=0"
				], false, function(Odata) {
					results = Odata.results;
				}, function(oError) {});
				var VText = new sap.m.Text({
					text: " Att/Abs Type: "
				});

				var VItem = new sap.ui.core.Item({
					key: "{FieldId}",
					text: "{FieldValue}"
				});
				var VInput = new sap.m.ComboBox({
					items: {
						path: "/",
						template: VItem
					}
				});
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(results);
				VInput.setModel(oModel);
				// VItem.setModel(oModel);
				// VItem.bindElement("/");
				// VInput.addItem(VItem);
				var VLay = new sap.ui.layout.VerticalLayout();
				var HLay = new sap.ui.layout.HorizontalLayout();
				// VLay.addContent(HLay);
				HLay.addContent(VText);
				HLay.addContent(VInput);
				VLay.addContent(HLay);
				dialog.addContent(VLay);
				// this.getView().addDependent(dialog);
				dialog.open();

			},
 KpiMonitor: function(){
				var dialog = new sap.m.Dialog({
					title: 'KPI Monitor',
					contentWidth: "300px",
					contentHeight: "300px",
					resizable: true,
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function() {
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancel',
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				}); 
				
               var Image = new sap.m.Image({
               	src: "KPI.jpg",
               	width: "130%",
               	height: "100%"
               });
				
			   var vlayout = new sap.ui.layout.HorizontalLayout();
			   vlayout.addContent(Image);
			   dialog.addContent(vlayout);
				dialog.open();
 	
 },
 
 onItemClose:function(oEvent){
 				var oItem = oEvent.getSource(),
				oList = oItem.getParent();
 
			oList.removeItem(oItem);
 
			MessageToast.show('Item Closed: ' + oEvent.getSource().getTitle());
 }
	

});