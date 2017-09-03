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
        // console.log(this.props.googleResults);
        let newLat = this.props.latlng.lat;
        let newLng = this.props.latlng.lng;
        mymap.panTo(new L.LatLng(newLat, newLng));
        // mymap.removeLayer(marker)
        // marker = L.marker([newLat, newLng]).addTo(mymap);
        // if (prevProps.googleResults != this.props.googleResults) {
        //     this.showResults();
        // };
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
        // alert("You clicked the map at " + e.latlng);
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        this.props.setLocation(lat, lng);
        this.setMarker(lat, lng, 'My place!');
        this.props.setPlace('My place!', false)
    }

    setMarker(lat, lng, name) {
        mymap.removeLayer(marker);
        markers = [];
        marker = new L.Marker([lat, lng]);
        marker.bindTooltip(name, 
            {
                permanent: true, 
                direction: 'right',
                className: 'tooltip'
            });

        // mymap.addLayer(marker);
        // layer = L.layerGroup(markers);
        mymap.addLayer(marker);
    }

    // showResults() {
    //     mymap.removeLayer(layer);
    //     markers = [];
    //     let results = this.props.googleResults;
    //     return results.map(place => {
    //         axios.post('/placedetails', {id: place.place_id}).then(data => {
    //             console.log(data.data.result.geometry.location);
    //             let lat = data.data.result.geometry.location.lat;
    //             let lng = data.data.result.geometry.location.lng;
    //             let name = data.data.result.name;
    //             var googleMarker = new L.Marker([lat, lng]);
    //             googleMarker.bindTooltip(name, 
    //             {
    //                 permanent: true, 
    //                 direction: 'right',
    //                 className: 'tooltip'
    //             });
    //             markers.push(googleMarker);                
    //             // mymap.addLayer(marker);
    //             layer = L.layerGroup(markers);
    //             mymap.addLayer(layer);         
    //         })
    //     })
    // }

    render() {
        return (
            <div id='mapid'></div>
        );
    }
}

var mymap;
var marker;
var markers = [];
var layer;
var array;

export default Map;