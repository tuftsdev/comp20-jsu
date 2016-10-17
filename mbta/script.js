
/*
test = new Date();
month = test.getMonth();
month = (month * 1) + 1;
day = test.getDate();
year = test.getFullYear();
document.write(" ",month,"/",day,"/",year," ");
*/






var map;
var my_lat= 0;
var my_long = 0;
//var loc_lat = loc.coords.latitude;
//var loc_long = loc.coords.latitude;
//console.log(myLocation);

var myOptions = {
						zoom: 13, 
						center: {lat: -34.397, lng: 150.644},
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
function initMap() {
        	map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
        	getLocation();
        }

function getLocation(){
	if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(pos) {
			my_lat = pos.coords.latitude;
			my_long = pos.coords.longitude;

		})
		document.write(my_lat,my_long);
	}else{
		console.log("Geolocation not supported on this browser.");
	}
}


