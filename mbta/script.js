


var map;
var my_lat= -999999;
var my_long = -999999;
var infowindow = new google.maps.InfoWindow();
var station_info = {
	"South Station":new google.maps.LatLng(42.352271,-71.05524200000001),
	"Andrew":new google.maps.LatLng(42.330154,-71.057655),
	"Porter Square":new google.maps.LatLng(42.3884,-71.11914899999999),
	"Harvard Square":new google.maps.LatLng(42.373362,-71.118956),
	"JFK/UMass":new google.maps.LatLng(42.320685,-71.052391),
	"Savin Hill":new google.maps.LatLng(42.31129,-71.053331),
	"Park Street":new google.maps.LatLng(42.35639457,-71.0624242),
	"Broadway":new google.maps.LatLng(42.342622,-71.056967),
	"North Quincy":new google.maps.LatLng(42.275275,-71.029583),
	"Shawmut":new google.maps.LatLng(42.29312583,-71.06573796000001),
	"Davis":new google.maps.LatLng(42.39674,-71.121815),
	"Alewife":new google.maps.LatLng(42.395428,-71.142483),
	"Kendall/MIT":new google.maps.LatLng(42.36249079,-71.08617653),
	"Charles/MGH":new google.maps.LatLng(42.361166,-71.070628),
	"Downtown Crossing":new google.maps.LatLng(42.355518,-71.060225),
	"Quincy Center":new google.maps.LatLng(42.251809,-71.005409),
	"Quincy Adams":new google.maps.LatLng(42.233391,-71.007153),
	"Ashmont":new google.maps.LatLng(42.284652,-71.06448899999999),
	"Wollaston":new google.maps.LatLng(42.2665139,-71.0203369),
	"Fields Corner":new google.maps.LatLng(42.300093,-71.061667),
	"Central Square":new google.maps.LatLng(42.365486,-71.103802),
	"Braintree":new google.maps.LatLng(42.2078543,-71.0011385)
}

var Alewife_path = [
station_info["Alewife"],
station_info["Davis"],
station_info["Porter Square"],
station_info["Harvard Square"],
station_info["Central Square"],
station_info["Kendall/MIT"],
station_info["Charles/MGH"],
station_info["Park Street"],
station_info["Downtown Crossing"],
station_info["South Station"],
station_info["Broadway"],
station_info["Andrew"],
station_info["JFK/UMass"]
];

var Ashmont_path = [
station_info["JFK/UMass"],
station_info["Savin Hill"],
station_info["Fields Corner"],
station_info["Shawmut"],
station_info["Ashmont"]
];
var Braintree_path = [
station_info["JFK/UMass"],
station_info["North Quincy"],
station_info["Wollaston"],
station_info["Quincy Center"],
station_info["Quincy Adams"],
station_info["Braintree"]
];

var stationMarkers = {};


var myOptions = {
						zoom: 13, 
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
function initMap() {
        	getLocation();
        }

function getLocation(){
	if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(pos) {
			my_lat = pos.coords.latitude;
			my_long = pos.coords.longitude;
			renderMap(my_lat,my_long);
		})
	}else{
		console.log("Geolocation not supported on this browser.");
	}
}

function renderMap(lat,long){
	myLoc = new google.maps.LatLng(lat,long);
	myOptions["center"] = myLoc;
	map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
	map.panTo(myLoc);
	setMarkers();
	setLines();
	
}

function setMarkers(){
	selfMarker = new google.maps.Marker({
		position: myLoc,
		title:"Your location is " + my_lat + ", " + my_long,
	})
	selfMarker.setMap(map);

	google.maps.event.addListener(selfMarker, "click", function(){
		infowindow.setContent(selfMarker.title);
		infowindow.open(map,selfMarker);
	})
	for(var station in station_info){
		stationMarkers[station] = new google.maps.Marker({
			position:station_info[station],
			title:station,
			icon:"station_red.png"
		});
		stationMarkers[station].setMap(map);
		setInfoWindows(station);
	}
}

function setInfoWindows(stationName){
	var station_window = new google.maps.InfoWindow();
	google.maps.event.addListener(stationMarkers[stationName], "click", function(){
		station_window.setContent(stationMarkers[stationName].title);
		station_window.open(map,stationMarkers[stationName]);
		})
}

function setLines(){
	
	var path1 = new google.maps.Polyline({
		path:Alewife_path,
		strokeColor:'red',
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	var path2 = new google.maps.Polyline({
		path:Ashmont_path,
		strokeColor:'red',
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	var path3 = new google.maps.Polyline({
		path:Braintree_path,
		strokeColor:'red',
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	path1.setMap(map);
	path2.setMap(map);
	path3.setMap(map);
}








