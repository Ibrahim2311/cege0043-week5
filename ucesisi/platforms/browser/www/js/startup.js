function trackAndCircle() {
	addPointLinePoly()
	getEarthquakes()
	getPort()
};

function startup() {
	document.addEventListener('DOMContentLoaded', function() {
		trackAndCircle();
	}, false);
}