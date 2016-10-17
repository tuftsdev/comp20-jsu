
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
//var loc_lat = loc.coords.latitude;
//var loc_long = loc.coords.latitude;
//console.log(myLocation);

var myOptions = {
						zoom: 13, 
						center: {lat: -34.397, lng: 150.644},
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
function initMap() {
        	//map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
        	getLocation();
        }

function getLocation(){
	
	console.log("Hit me 1");
	if(navigator.geolocation){
			console.log("Navigator is compatible with this browser");
			navigator.geolocation.getCurrentPosition(function(pos) {
			console.log("Hit me 2");
			my_lat = pos.coords.latitude;
			my_long = pos.coords.longitude;

		})
			console.log("hit me 3");
	}else{
		console.log("Geolocation not supported on this browser.");
	}
	
}







