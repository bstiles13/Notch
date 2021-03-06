import React from 'react';
import axios from 'axios';

var mymap;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.onMapClick = this.onMapClick.bind(this);
        this.initiateMap = this.initiateMap.bind(this);
        this.setMarker = this.setMarker.bind(this);
    }

    componentDidMount() {
        this.initiateMap();
        this.showNotches();
    }

    componentDidUpdate(prevProps) {
        let newLat = this.props.latlng.lat;
        let newLng = this.props.latlng.lng;
        mymap.panTo(new L.LatLng(newLat, newLng));
        this.setMarker(newLat, newLng)
        this.showNotches();
        if (prevProps.oneNotch != this.props.oneNotch) {
            this.setView();
        }
    }

    initiateMap() {
        let lat = this.props.latlng.lat;
        let lng = this.props.latlng.lng;
        mymap = new L.map('mapid').setView([lat, lng], 9);
        mymap.doubleClickZoom.disable();
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.emerald',
            accessToken: 'pk.eyJ1IjoiYnN0aWxlczEzIiwiYSI6ImNqNHZ4bnMweDBzN20ycXA4MGJodXltcjIifQ.mA6saUO0Ucgx9aOWYRaxqQ'
        }).addTo(mymap);
        marker = L.marker([lat, lng]).addTo(mymap);
        var popup = L.popup()
            .setLatLng([lat, lng])
            .setContent("Double click to move your <br/><img id='person-icon' src='http://www.clker.com/cliparts/3/u/P/P/q/W/walking-icon-hi.png' /> and share an experience!")
            .openOn(mymap);
        mymap.on('dblclick', this.onMapClick);
    }

    onMapClick(e) {
        var lat = (e.latlng.lat).toFixed(7);
        var lng = (e.latlng.lng).toFixed(7);
        this.props.setLocation(lat, lng, false);
        this.setMarker(lat, lng);
        this.props.setPlace('My place', false)
    }

    setMarker(lat, lng) {
        mymap.removeLayer(marker);
        let icon = new L.Icon({
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        if (this.props.latlng.city) {
            icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
            marker = new L.marker([lat, lng], { icon: icon });
        } else {
            icon.options.iconUrl = 'http://www.clker.com/cliparts/3/u/P/P/q/W/walking-icon-hi.png';     
            marker = new L.marker([lat, lng], { icon: icon });
                marker.bindTooltip(this.props.place,
                    {
                        permanent: true,
                        direction: 'bottom',
                    })
        }
        mymap.addLayer(marker);
        mymap.setView([lat, lng]);        
    }

    showNotches() {
        if (notches != '' && notches != undefined && notches != null) {
            mymap.removeLayer(notches);
        }
        let notchResults = this.props.notchResults;
        let markers = [];
        if (notchResults[0].geometry == undefined) {
            console.log('no notch results');
            return;
        } else {
            for (var i = 0; i < notchResults.length; i++) {
                let coordinates = [notchResults[i].geometry.coordinates[1], notchResults[i].geometry.coordinates[0]];
                let icon = new L.Icon({
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [20, 20]
                });
                switch (notchResults[i].properties.category_parent) {
                    case "Outdoors":
                        icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
                        break;
                    case "Sports":
                        icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
                        break;
                    case "Shows":
                        icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
                        break;
                    case "Art":
                        icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png';
                        break;
                    case "Animals":
                        icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png';
                        break;
                    case "Lifestyle":
                        icon.options.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png';
                        break;
                }
                let marker = L.marker(coordinates, {icon: icon})
                .bindPopup('<h4>' + notchResults[i].properties.place + '</h4><span class="signature"><span>by ' + notchResults[i].properties.user + '</span><span>' + notchResults[i].properties.created.substring(0, 10) + '</span></span><hr/><b>' + notchResults[i].properties.headline + '</b><br/><p>' + notchResults[i].properties.summary + '</p>')
                .bindTooltip(notchResults[i].properties.place, 
                {
                    className: 'tooltip',
                    permanent: true, 
                    direction: 'right',
                });
                markers.push(marker);
            }
            notches = L.layerGroup(markers);
            mymap.addLayer(notches);
        }
    }

    setView() {
        let notch = this.props.oneNotch;
        let lat = this.props.oneNotch.geometry.coordinates[1];
        let lng = this.props.oneNotch.geometry.coordinates[0];
        let content = this.props.oneNotch.properties.place;
        mymap.setView([lat, lng], 12);
        var popup = L.popup()
            .setLatLng([lat + 0.01, lng])
            .setContent(content)
            .openOn(mymap);
        document.getElementById('mapid').scrollIntoView(true);
    }

    render() {
        return (
            <div id='map'>
                <div id='mapid'></div>
            </div>
        );
    }
}

var mymap;
var marker;
var layer;
var array;
var notches;

export default Map;