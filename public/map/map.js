
var lat = -33.868820
var lng = 151.209296

var mymap = L.map('mapid').setView([lat, lng], 13);

var host = 'https://maps.omniscale.net/v2/{id}/style.grayscale/{z}/{x}/{y}.png?access_token={accessToken}'
var hostMapBox = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'

L.tileLayer.grayscale(hostMapBox, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGF0YXBvY2FseXBzZSIsImEiOiJjajVvbmp5eDIwMXZ6MzNxbWM1OHkxZDF2In0.pGgODeyy-u8IwlqXUHCYPg'
}).addTo(mymap);

$.getJSON("/map/hospitals.geojson",function(data){
    var iconHos = L.icon({
    iconUrl: '/map/hospital.gif',
    iconSize: [30,30]
  }); 
  L.geoJson(data  ,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: iconHos});
    }
  }  ).addTo(mymap);
});

$.getJSON("/map/waterpoints.geojson",function(data){
    var iconWater = L.icon({
    iconUrl: '/map/water.png',
    iconSize: [30,30]
  }); 
  L.geoJson(data  ,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: iconWater});
    }
  }  ).addTo(mymap);
});

var runIcon = L.icon({
    iconUrl: '/map/run.png',
    iconSize:     [40, 40], // size of the icon
});

L.marker([lat, lon], {icon: greenIcon}).addTo(map);