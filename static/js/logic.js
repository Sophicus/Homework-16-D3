function createMap(earthquakes) {

    //Tile layer
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
        });

    //baseMaps object for lightmap layer
    var baseMaps = {
        "Light Map":lightmap
    };

    //overlayMaps object
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    //map object options
    var map = L.map("map-id", {
        center:[40.73, -74.0059],
        zoom: 12,
        layers: [lightmap, earthquakes]
    });

    //layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
    
}

function createMarkers(response) {

    //Pull "features" property off of response.data
    var features = response.features;

    //marker array
    var featureMarkers = [];

    //loop through marker array
    for (var index = 0; index < features.length; index++) {
        var quake = features[index];

        //marker and popup for each quake
        var quakeMarker = L.marker([quake.geometry.coordinates[0], quake.geometry.coordinates[1]])
            .bindPopup("<h3>" + quake.properties.place + "<h3><h3>Magnitude: " + quake.properties.mag + "<h3>");
        
        //add marker to featureMarkers array
        featureMarkers.push(quakeMarker);

    //layer group from quake markers; pass createMap function
    createMap(L.layerGroup(featureMarkers));
    }
}

//API call
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);