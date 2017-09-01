import React from 'react';
import axios from 'axios';

class Yelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: ['No results'],
            place: '',
            autocomplete: ['Test']
        }
        this.showResults = this.showResults.bind(this);
        this.search = this.search.bind(this);
        this.askGoogle = this.askGoogle.bind(this);
        this.changePlace = this.changePlace.bind(this);
        this.autocomplete = this.autocomplete.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.search);
        console.log(this.state.place);
    }

    showResults() {
        console.log(this.state.results);
        let results = this.state.results;
        return results.map(name => {
            if (name.name) {
                return (
                    <div> {name.name} </div>
                )
            } else {
                return (
                    <div> {name} </div>
                )
            }
        })
    }

    search(event) {
        if (event.key == 'Enter') {
            let search = event.target.value;
            this.setState({
                search: search
            }, this.askGoogle)
        }
    }

    askGoogle() {
        axios.post('/yelp', this.state).then(data => {
            console.log(data.data);
            let results = data.data.businesses;
            this.setState({
                results: results
            })
            console.log('success');
        })
    }

    changePlace(event) {
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

    autocomplete() {
        let autocomplete = this.state.autocomplete;
        return autocomplete.map(place => {
            if (place.description) {
                return (
                    <option> {place.description} </option>
                )
            } else {
                return (
                    <option> {place} </option>
                )
            }
        })
    }

    render() {
        return (
            <div>
                <input className="form-control form-control-lg" type="text" placeholder="Find a place" onKeyPress={this.search} />
                <div id='results'>
                    {this.showResults()}
                </div>
                <label>Choose a browser from this list:
                <input list="browsers" name="myBrowser" onChange={this.changePlace} /></label>
                <datalist id="browsers">
                    <option value="Chrome" />
                    <option value="Firefox" />
                    <option value="Internet Explorer" />
                    <option value="Opera" />
                    <option value="Safari" />
                    <option value="Microsoft Edge" />
                    {this.autocomplete()}
                </datalist>
            </div>
        )
    }
}

export default Yelp;