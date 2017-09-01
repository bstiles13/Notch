import React from 'react';

var mymap;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onMapClick = this.onMapClick.bind(this);
        this.makeMap = this.makeMap.bind(this);
    }

    componentDidMount() {
        this.makeMap()
    }

    componentDidUpdate() {
        let newLat = this.props.latlng.lat;
        let newLng = this.props.latlng.lng;
        mymap.panTo(new L.LatLng(newLat, newLng));
        mymap.removeLayer(marker)
        marker = L.marker([newLat, newLng]).addTo(mymap);        
    }

    onMapClick(e) {
        // alert("You clicked the map at " + e.latlng);
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        this.props.setLocation(lat, lng);
        var popup = L.popup();
        popup
            .setLatLng({lat: lat + 0.01, lng: lng})
            .setContent("You clicked the map at " + e.latlng.toString() + "<br/><button data-lat=" + lat + " data-lng=" + lng + ">Save</button>")
            .openOn(mymap);
    }

    makeMap() {
        console.log('Prop' + this.props.latlng.lat);
        console.log('Prop' + this.props.latlng.lng);
        let lat = this.props.latlng.lat;
        let lng = this.props.latlng.lng;
        mymap = new L.map('mapid').setView([lat, lng], 8);
        mymap.doubleClickZoom.disable(); 
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.emerald',
            accessToken: 'pk.eyJ1IjoiYnN0aWxlczEzIiwiYSI6ImNqNHZ4bnMweDBzN20ycXA4MGJodXltcjIifQ.mA6saUO0Ucgx9aOWYRaxqQ'
        }).addTo(mymap);
        marker = L.marker([-0.777259, -91.142578]).addTo(mymap);
        // var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
        //     denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
        //     aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
        //     golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
        //     var cities = L.layerGroup([littleton, denver, aurora, golden]).addTo(mymap);
        mymap.on('dblclick', this.onMapClick);
    }

    render() {
        return (
            <div id='mapid'></div>
        );
    }
}

var marker

export default Map;