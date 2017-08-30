import React from 'react';

var mymap;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        map: null
    };
    this.onMapClick = this.onMapClick.bind(this);
    }

    componentDidMount() {
        mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYnN0aWxlczEzIiwiYSI6ImNqNHZ4bnMweDBzN20ycXA4MGJodXltcjIifQ.mA6saUO0Ucgx9aOWYRaxqQ'
        }).addTo(mymap);
        var marker = L.marker([51.5, -0.09]).addTo(mymap);
        mymap.on('dblclick', this.onMapClick);
    }
    onMapClick(e) {
        // alert("You clicked the map at " + e.latlng);
        var popup = L.popup();
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString() + "<br/><button data-lat=" + lat + " data-lng=" + lng + ">Save</button>")
        .openOn(mymap);
    }

    render() {
        return (
        <div id='mapid'></div>
        );
    }
}

export default Map;