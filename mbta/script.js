
/*
test = new Date();
month = test.getMonth();
month = (month * 1) + 1;
day = test.getDate();
year = test.getFullYear();
document.write(" ",month,"/",day,"/",year," ");
*/






var map;
var my_lat= -999999;
var my_long = -999999;
var infowindow = new google.maps.InfoWindow();

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
	marker = new google.maps.Marker({
		position: myLoc,
		title:"Your location is " + lat + ", " + long
	})
	marker.setMap(map);

	google.maps.event.addListener(marker, "click", function(){
		infowindow.setContent(marker.title);
		infowindow.open(map,marker);
	})
}








