import React from 'react';

import Sidebar from './Sidebar';
import Map from './Map';
import Form from './Form';
import Google from './Google';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latlng: {
                lat: -0.777259,
                lng: -91.142578,
                city: false
            },
            newCategory: '',
            newPlace: 'Test',
            existingPlace: false,
            newHeadline: '',
            newSummary: '',
            googleResults: ['No results']
        };
        this.setTitle = this.setTitle.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setResults = this.setResults.bind(this);
    }

    componentDidMount() { }

    componentDidUpdate() {
        console.log(this.state);
    }

    setLocation(lat, lng, city) {
        console.log('setting location');
        this.setState({
            latlng: {
                lat: lat,
                lng: lng,
                city: city
            }
        })
    }

    setPlace(place, status) {
        this.setState({
            newPlace: place,
            existingPlace: status
        })
    }

    setNotch(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setTitle(event) {
        this.setState({
            newTitle: event.target.value
        })
    }

    setResults(results) {
        this.setState({
            googleResults: results
        })
    }

    render() {
        return (
            <div>
                <Sidebar
                    categories={categories}
                />
                <div id='main-container'>
                    <div id='map-container'>
                        <Map
                            setLocation={this.setLocation}
                            setPlace={this.setPlace}
                            latlng={this.state.latlng}
                            place={this.state.newPlace}
                            googleResults={this.state.googleResults}
                            setResults={this.setResults}
                        />
                        <Google
                            setLocation={this.setLocation}
                            setPlace={this.setPlace}
                            googleResults={this.state.googleResults}
                            setResults={this.setResults}
                        />
                    </div>
                    <div id='form-container'>
                        <Form
                            categories={categories}
                            latlng={this.state.latlng}
                            place={this.state.newPlace}
                            existingPlace={this.state.existingPlace}
                            setNotch={this.setNotch.bind(this)}
                            setTitle={this.setTitle.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;

var categories = {
    Outdoors: ['Hiking', 'Surfing', 'Boating', 'Skiing', 'Other'],
    Sports: ['Recreational', 'Professional', 'Other'],
    Shows: ['Broadway', 'Comedy', 'Other'],
    Art: ['Museum', 'Gala', 'Other'],
    Animals: ['Zoo', 'Aquarium', 'Nature Watching', 'Other']
}