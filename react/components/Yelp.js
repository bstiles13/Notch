import React from 'react';
import axios from 'axios';

class Yelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: ['No results'],
            place: '',
            autocomplete: ['South Park, CO, United States']
        }
        this.changePlace = this.changePlace.bind(this);
        this.changeCity = this.changeCity.bind(this);        
        this.googleResults = this.googleResults.bind(this);
        this.showResults = this.showResults.bind(this);        
        this.showAutocomplete = this.showAutocomplete.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.search);
        console.log(this.state.place);
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
        let place = event.target.value;
        this.setState({
            place: place
        }, () => {
            let place = this.state.place;
            axios.post('/autocomplete', { place: place }).then(data => {
                console.log(data.data);
                let autocomplete = data.data;
                this.setState({
                    autocomplete: autocomplete
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
        return autocomplete.map(place => {
            if (place.description) {
                return (
                    <option id={place.place_id}> {place.description} </option>
                )
            } else {
                return (
                    <option> {place} </option>
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