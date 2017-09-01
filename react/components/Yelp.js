import React from 'react';
import axios from 'axios';

class Yelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: ['No results'],
            city: '',
            autocomplete: ['South Park, CO, United States'],
            cityId: null
        }
        this.changePlace = this.changePlace.bind(this);
        this.changeCity = this.changeCity.bind(this);        
        this.googleResults = this.googleResults.bind(this);
        this.showResults = this.showResults.bind(this);        
        this.showAutocomplete = this.showAutocomplete.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.search);
        console.log(this.state.city);
        console.log(this.state.cityId);
    }

    changePlace(event) {
        if (event.key == 'Enter') {
            let search = event.target.value;
            this.setState({
                search: search
            }, this.googleResults)
        }
    }

    changeCity(event) {
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

    googleResults() {
        axios.post('/yelp', this.state).then(data => {
            console.log(data.data);
            let results = data.data.businesses;
            this.setState({
                results: results
            })
            console.log('success');
        })
    }

    showResults() {
        console.log(this.state.results);
        let results = this.state.results;
        return results.map(name => {
            if (name.name) {
                return ( <div> {name.name} </div> )
            } else {
                return ( <div> {name} </div> )
            }
        })
    }


    showAutocomplete() {
        let autocomplete = this.state.autocomplete;
        return autocomplete.map(city => {
            if (city.description) {
                return (
                    <option id={city.place_id}> {city.description} </option>
                )
            } else {
                return (
                    <option> {city} </option>
                )
            }
        })
    }

    getLatLng(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div>
                <div id='search'>
                    <div className="form-group">
                        <label htmlFor="keyword">Keyword</label>
                        <input type="text" className="form-control" id="keyword" placeholder="Find a place" onKeyPress={this.changePlace} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="autocomplete">City</label>
                        <input className="form-control" id="autocomplete" list="browsers" name="myBrowser" placeholder='South Park, CO, United States' onChange={this.changeCity} />
                        <datalist id="browsers">
                            {this.showAutocomplete()}
                        </datalist>
                    </div>
                </div>
                <div id='results'>
                    {this.showResults()}
                </div>
            </div>
        )
    }
}

export default Yelp;