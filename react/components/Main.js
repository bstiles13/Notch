import React from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import Map from './Map';
import Form from './Form';
import Notch from './Notch';
import Google from './Google';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            latlng: {
                lat: -0.777259,
                lng: -91.142578,
                city: false
            },
            newCategory: '',
            newPlace: 'Test',
            newHeadline: '',
            newSummary: '',
            existingPlace: false,
            googleResults: ['No results'],
            notchResults: ['No results']
        };
        this.setUser = this.setUser.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setResults = this.setResults.bind(this);
        this.newNotch = this.newNotch.bind(this);
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

    setUser(user) {
        this.setState({
            user: user
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

    newNotch() {
        let notch = {
            user: this.state.user,
            lat: this.state.latlng.lat,
            lng: this.state.latlng.lng,
            category: this.state.newCategory,
            place: this.state.newPlace,
            headline: this.state.newHeadline,
            summary: this.state.newSummary
        }
        if (notch.user == null) {
            return;
        } else if (notch.category != '' && notch.place != '' && notch.headline != '' && notch.summary != '') {
            axios.post('/newnotch', notch).then(data => {
                console.log(data.data);
            })
        } else {
            console.log('error');
        }
    }

    render() {
        return (
            <div>
                <div id='main-container'>
                    <Sidebar
                        categories={categories}
                        user={this.state.user}
                        setUser={this.setUser}
                    />
                    <div id='content'>
                        <div id='content-top'>
                            <Map
                                setLocation={this.setLocation}
                                setPlace={this.setPlace}
                                latlng={this.state.latlng}
                                place={this.state.newPlace}
                                googleResults={this.state.googleResults}
                                setResults={this.setResults}
                            />
                            <Form
                                categories={categories}
                                latlng={this.state.latlng}
                                place={this.state.newPlace}
                                existingPlace={this.state.existingPlace}
                                setNotch={this.setNotch.bind(this)}
                                setTitle={this.setTitle.bind(this)}
                                newNotch={this.newNotch}
                            />
                        </div>
                        <div id="content-bottom">
                            <Notch
                                notchResults={this.state.notchResults}
                            />
                            <Google
                                setLocation={this.setLocation}
                                setPlace={this.setPlace}
                                googleResults={this.state.googleResults}
                                setResults={this.setResults}
                            />
                        </div>
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