import React from 'react';
import axios from 'axios';

class Google extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            city: '',
            cityId: null,
            autocomplete: ['South Park, CO, United States'],
            latitude: null,
            latitude: null
        }
        this.setPlace = this.setPlace.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
        this.googleResults = this.googleResults.bind(this);
        this.showResults = this.showResults.bind(this);
        this.showAutocomplete = this.showAutocomplete.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.searchTerm);
        console.log(this.state.city);
        console.log(this.state.cityId);
        console.log(this.state.longitude);
        console.log(this.state.latitude);
    }

    setPlace(event) {
        if (event.key == 'Enter') {
            let searchTerm = event.target.value;
            this.setState({
                searchTerm: searchTerm
            }, this.setCoordinates)
        }
    }

    setCity(event) {
        let value = event.target.value;
        this.setState({
            city: value
        }, () => {
            let city = this.state.city;
            axios.post('/autocomplete', { city: city }).then(data => {
                // console.log(data.data);
                // console.log(data.data[0].place_id);
                let autocomplete = data.data;
                let cityId = data.data[0].place_id;
                this.setState({
                    autocomplete: autocomplete,
                    cityId: cityId
                })
            })
        })
    }

    setCoordinates() {
        let id = this.state.cityId;
        axios.post('/getcoordinates', { id: id }).then(data => {
            let lat = (data.data.lat).toFixed(7);
            let lng = (data.data.lng).toFixed(7);
            console.log(lat + " " + lng);
            this.setState({
                latitude: lat,
                longitude: lng
            }, this.googleResults)
        })
    }

    googleResults() {
        let id = this.state.cityId;
        let state = this.state;
        axios.post('/googleplaces', state).then(data => {
            // console.log(data.data);
            let results = data.data.results;
            // console.log(results);
            this.props.setResults(results);
            this.placeDetails(id, true);
            console.log('success');
        })
    }

    showCity() {
        let city = this.state.city;
        if (city != '') {
            return (
                <li id='city' className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{this.state.city}</h5>
                        <button value={this.state.cityId} className="btn btn-sm" onClick={this.sendToMap.bind(this)}>Select</button>
                    </div>
                    <small>City</small>
                </li>
            )
        }
    }

    showResults() {
        console.log(this.props.googleResults);
        let results = this.props.googleResults;
        return results.map(place => {
            if (place.name) {
                return (
                    <li className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{place.name}</h5>
                            <button value={place.place_id} className="btn btn-sm" onClick={this.sendToMap.bind(this)}>Select</button>
                        </div>
                        <small>{place.vicinity ? place.vicinity : place.types[0].replace("_", " ")}</small>
                    </li>
                )
            } else {
                return (<li className="list-group-item">{place}</li>)
            }
        })
    }


    showAutocomplete() {
        let autocomplete = this.state.autocomplete;
        return autocomplete.map(city => {
            if (city.description) {
                return (
                    <option> {city.description} </option>
                )
            } else {
                return (
                    <option> {city} </option>
                )
            }
        })
    }

    sendToMap(event) {
        console.log(event.target.value);
        let id = event.target.value;
        this.placeDetails(id, false);
    }

    placeDetails(id, city) {
        axios.post('/placedetails', { id: id }).then(data => {
            console.log(data.data.result)
            let location = data.data.result.geometry.location;
            let lat = location.lat;
            let lng = location.lng;
            let place = data.data.result.name;
            console.log(lat);
            console.log(lng);
            this.props.setLocation(lat, lng, city);
            this.props.setPlace(place, true);
        })
    }

    render() {
        return (
            <div>
                <div id='search'>
                    <div className="form-group search-child">
                        <label htmlFor="keyword">Keyword</label>
                        <input type="text" className="form-control" id="keyword" placeholder="Find a place" onKeyPress={this.setPlace} />
                    </div>
                    <div className="form-group search-child">
                        <label htmlFor="autocomplete">City</label>
                        <input className="form-control" id="autocomplete" list="browsers" name="myBrowser" placeholder='South Park, CO, United States' onChange={this.setCity} />
                        <datalist id="browsers">
                            {this.showAutocomplete()}
                        </datalist>
                    </div>
                </div>
                <ul className='list-group' id='results'>
                    {this.showCity()}
                    {this.showResults()}
                </ul>
            </div>
        )
    }
}

export default Google;