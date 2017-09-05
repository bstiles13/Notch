import React from 'react';
import axios from 'axios';

var mymap;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onMapClick = this.onMapClick.bind(this);
        this.initiateMap = this.initiateMap.bind(this);
        this.setMarker = this.setMarker.bind(this);
    }

    componentDidMount() {
        this.initiateMap()
    }

    componentDidUpdate(prevProps) {
        console.log('prev props: ', prevProps);
        let newLat = this.props.latlng.lat;
        let newLng = this.props.latlng.lng;
        mymap.panTo(new L.LatLng(newLat, newLng));
        this.setMarker(newLat, newLng)
    }

    initiateMap() {
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
        marker = L.marker([lat, lng]).addTo(mymap);
        mymap.on('dblclick', this.onMapClick);
    }

    onMapClick(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        this.props.setLocation(lat, lng);
        this.setMarker(lat, lng);
        this.props.setPlace('My place', false)
    }

    setMarker(lat, lng) {
        mymap.removeLayer(marker);
        // let icon = L.icon({
        //     iconUrl: 'https://image.flaticon.com/icons/svg/66/66455.svg',
        //     iconSize: [25, 85], // size of the icon
        // })
        marker = new L.Marker([lat, lng]);        
        if (this.props.latlng.city) {
            let icon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });
              marker = new L.marker([lat, lng], {icon: icon});
        } else {
            marker.bindTooltip(this.props.place,
                {
                    permanent: true,
                    direction: 'right',
                })
        }
        mymap.addLayer(marker);
    }

    render() {
        return (
            <div id='mapid'></div>
        );
    }
}

var mymap;
var marker;
var layer;
var array;

export default Map;