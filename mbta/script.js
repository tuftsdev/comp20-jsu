


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
var data;
var request;
var stationMarkers = {};
var arrivals = {
	"South Station":[],
	"Andrew":[],
	"Porter Square":[],
	"Harvard Square":[],
	"JFK/UMass":[],
	"Savin Hill":[],
	"Park Street":[],
	"Broadway":[],
	"North Quincy":[],
	"Shawmut":[],
	"Davis":[],
	"Alewife":[],
	"Kendall/MIT":[],
	"Charles/MGH":[],
	"Downtown Crossing":[],
	"Quincy Center":[],
	"Quincy Adams":[],
	"Ashmont":[],
	"Wollaston":[],
	"Fields Corner":[],
	"Central Square":[],
	"Braintree":[]
};



var myOptions = {
						zoom: 14, 
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
		alert("Geolocation not supported on this browser.");
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
	setSelfWindow();
	for(var station in station_info){
		stationMarkers[station] = new google.maps.Marker({
			position:station_info[station],
			content:"Something went wrong... please click on the marker again",
			icon:"station_red.png"
		});
		stationMarkers[station].setMap(map);
		getJSON();
		setInfoWindows(station,stationMarkers[station]);
	}
}

function setSelfWindow(){
	closestStation();
	var content = "<p>Closest station: " + shortest_station + "<br /> " + shortest_dist + " mi</p>";
	selfMarker = new google.maps.Marker({
		position: myLoc,
		title:"Your location",
		content:content
	});
	selfMarker.setMap(map);
	google.maps.event.addListener(selfMarker, "click", function(){
		infowindow.close();
		infowindow.setContent(selfMarker.content);
		infowindow.open(map,selfMarker);
	});
}

function closestStation(){
	R = 6371; //km
	shortest_dist = 9999999999999;
	shortest_station = "";
	for(var station in station_info){
		var station_lat = station_info[station].lat(station);
		var station_long = station_info[station].lng(station);
		var lat_diff = (my_lat - station_lat).toRad();
		var long_diff = (my_long - station_long).toRad();
		var a = Math.sin(lat_diff/2) * Math.sin(lat_diff/2) + 
					Math.cos(my_lat.toRad()) * Math.cos(station_lat.toRad()) *
					Math.sin(long_diff/2) * Math.sin(long_diff/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		if (d < shortest_dist){
			shortest_dist = d;
			shortest_station = station;
		}
	}
}
Number.prototype.toRad = function(){
	return this * Math.PI / 180
}

function setInfoWindows(stationName,marker){
	google.maps.event.addListener(marker, "click", function(){
		if(marker.content == "Something went wrong... please click on the marker again"){
			getJSON();
		}
		infowindow.close();
		infowindow.setContent(marker.content);
		infowindow.open(map,marker);
	});
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

	var myLatLng = new google.maps.LatLng(my_lat,my_long);
	var selfPath = new google.maps.Polyline({
		path:[myLatLng,station_info[shortest_station]],
		strokeColor:'cyan',
		strokeOpacity:0.5,
		strokeWeight:4
	});
	path1.setMap(map);
	path2.setMap(map);
	path3.setMap(map);
	selfPath.setMap(map);
}

function getJSON(){
	request = new XMLHttpRequest();
	request.open("get","https://radiant-savannah-75116.herokuapp.com/redline.json",true);
	request.onreadystatechange = function(){
		if(request.readyState==4 && request.status==200){
			data = request.responseText;
			data = JSON.parse(data);
			console.log(data);
			var station_schedule = data["TripList"]["Trips"];
			for(var i  = 0; i < station_schedule.length;i++){
				var predictions = station_schedule[i]["Predictions"];
				for(var j = 0; j < predictions.length;j++){
					var name = predictions[j]["Stop"];
					var time = predictions[j]["Seconds"]%60;
					if(time>0){
						arrivals[name].push({"time":time,"Destination":station_schedule[i]["Destination"]});
					}
				}
			}

			for(var station in station_info){
				arrivals[station].sort(function(a,b){
				return a["time"]-b["time"]}
				); //SORTING FUNCTION - function taken from http://www.w3schools.com/jsref/jsref_sort.asp
				var marker = stationMarkers[station];
				var content = "<p> Estimated arrival time and Destination<br />";
				for (var i = 0; i < arrivals[station].length;i++){
					content += arrivals[station][i]["time"] + " minutes - "
					 + arrivals[station][i]["Destination"] +"<br />"
				}
				content += "</p>"
				marker.content = content;
			}
			console.log(arrivals);
		}
	}
	while(request.send()){}
}








