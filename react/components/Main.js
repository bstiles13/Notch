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
                // lat: -0.777259,
                // lng: -91.142578,
                lat: 39.7392,
                lng: -104.9903,
                city: false
            },
            newCategory: '',
            newPlace: 'Give me a name!',
            newHeadline: '',
            newSummary: '',
            existingPlace: false,
            notchFilter: {
                category: 'All'
            },
            googleResults: ['No results'],
            notchResults: ['No results']
        };
        this.setUser = this.setUser.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setResults = this.setResults.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.getNotches = this.getNotches.bind(this);
    }

    componentDidMount() {
        this.getNotches();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    setLocation(lat, lng, city) {
        this.setState({
            latlng: {
                lat: lat,
                lng: lng,
                city: city
            }
        }, this.getNotches)
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

    setFilter(event) {
        this.setState({
            notchFilter: {
                category: event.target.getAttribute('value')
            }
        }, this.getNotches)
    }


    getNotches() {
        console.log('notch request received');
        let scope = {
            lat: this.state.latlng.lat,
            lng: this.state.latlng.lng,
            category: this.state.notchFilter.category
        }
        axios.post('/getnotches', scope).then(data => {
            console.log('got notches');
            console.log(data.data);
            if (data.data == '' || data.data == []) {
                console.log('notches out of range');
                this.setState({
                    notchResults: ['No results']
                })
            } else {
                this.setState({
                    notchResults: data.data
                })
            }
        })
    }

    render() {
        return (
            <div>
                <div id='main-container'>
                    <Sidebar
                        categories={categories}
                        user={this.state.user}
                        setUser={this.setUser}
                        setFilter={this.setFilter}
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
                                notchResults={this.state.notchResults}
                            />
                            <Form
                                categories={categories}
                                user={this.state.user}
                                latlng={this.state.latlng}
                                category={this.state.newCategory}
                                place={this.state.newPlace}
                                headline={this.state.newHeadline}
                                summary={this.state.newSummary}
                                existingPlace={this.state.existingPlace}
                                setNotch={this.setNotch.bind(this)}
                                setTitle={this.setTitle.bind(this)}
                                getNotches={this.getNotches}
                            />
                        </div>
                        <div id="content-bottom">
                            <Notch
                                notchFilter={this.state.notchFilter}
                                notchResults={this.state.notchResults}
                                setFilter={this.setFilter}
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
    Animals: ['Zoo', 'Aquarium', 'Nature Watching', 'Other'],
    Lifestyle: ['Health', 'Yoga', 'Cosmetic', 'Spa', 'Other']
}