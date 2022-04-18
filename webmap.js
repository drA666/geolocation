function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var coords = JSON.parse(httpGet("http://"+location.host+"/api/coords"));

// Import the leaflet package
var L = require('leaflet');
var M = require('moment');


// Creates a leaflet map binded to an html <div> with id "map"
// setView will set the initial map view to the location at coordinates
// 13 represents the initial zoom level with higher values being more zoomed in
var map = L.map('map').setView(coords.Length==0?[50.4489008,30.4547883]:[coords[0].latitude, coords[0].longitude], 20);

// Adds the basemap tiles to your web map
// Additional providers are available at: https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 21
}).addTo(map);


coords.forEach(
	coord =>
		L.circleMarker([coord.latitude, coord.longitude])
			.addTo(map)
			.bindPopup('' + M(coord.timestamp).format("YYYY.MM.DD HH:mm:ss") + '<br> device ' + coord.devid)
			.openPopup()
		)// Adds a popup marker to the webmap for GGL address

