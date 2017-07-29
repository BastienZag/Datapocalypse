
var lat = -33.868820
var lng = 151.209296

var mymap = L.map('mapid').setView([lat, lng], 13);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGF0YXBvY2FseXBzZSIsImEiOiJjajVvbmp5eDIwMXZ6MzNxbWM1OHkxZDF2In0.pGgODeyy-u8IwlqXUHCYPg'
}).addTo(mymap);