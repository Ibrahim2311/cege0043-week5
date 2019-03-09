function addPointLinePoly() {
	L.marker([51.5, -0.09]).addTo(mymap).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
    // add a circle
    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");
    // add a polygon with 3 end points (i.e. a triangle)
    var myPolygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ],
        {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }
        ).addTo(mymap).bindPopup("I am a polygon.");
};

var client;
var earthquakes;
function getEarthquakes() {
    client = new XMLHttpRequest();
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
    client.open('GET',url);
    client.onreadystatechange = dataResponse;
    client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function dataResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
    // once the data is ready, process the data
    var geoJSONData = client.responseText;
    loadLayer(geoJSONData);
    }
}
// convert the received data - which is text - to JSON format and add it to the map
function loadLayer(geoJSONData) {
// which layer did we actually load?
    // convert the text to JSON
    earthquakes = JSON.parse(geoJSONData);
    earthquakelayer = L.geoJson(earthquakes).addTo(mymap);
    mymap.fitBounds(earthquakelayer.getBounds());
}