function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);        
    }
}

var userMarker
function showPosition(position) {
    if (userMarker){
        mymap.removeLayer(userMarker);
        }
    userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>You were here</b>");
    // mymap.flyTo([position.coords.latitude, position.coords.longitude], 18)
    getDistanceFromMultiplePoints(position)
}



function getDistance() {
	// getDistanceFromPoint is the function called once the distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}

function getDistanceFromPoint(position) {
    // find the coordinates of a point using this website:
    // these are the coordinates for Warren Street
    var lat = 51.524616;
    var lng = -0.13818;
    // return the distance in kilometers
    var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
    if (distance <= 1) {
    	alert("you are within 1 Km from UCL main campus");
    }
    // else {
    // 	alert("you are not within 100 meters from UCL main campus");
    // }
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
    // where radius of the earth is 3956 miles
    if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
    if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
    return dist;
}


function getDistanceFromMultiplePoints(position) {
	var minDistance = Number.MAX_SAFE_INTEGER;
	var closestQuake = "";
	for(var i = 0; i < earthquakes.features.length; i++) {
		var obj = earthquakes.features[i];
		var distance = calculateDistance(position.coords.latitude, position.coords.longitude,
			                             obj.geometry.coordinates[0], obj.geometry.coordinates[1],
			                             'K');
		if (distance < minDistance) {
			minDistance = distance;
			closestQuake = obj.properties.place;
		}
	}
	alert("Earthquake: " + closestQuake + " is distance " + minDistance + "away");
}
