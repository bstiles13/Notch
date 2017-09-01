import React from 'react';

import Sidebar from './Sidebar';
import Map from './Map';
import Form from './Form';
import Yelp from './Yelp';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latlng: {
                lat: -0.777259,
                lng: -91.142578,
            },
            newCategory: '',
            newTitle: '',
            newSummary: ''

        };
        this.setTitle = this.setTitle.bind(this);
    }

    componentDidMount() { }

    componentDidUpdate() {
        console.log(this.state);
    }

    setLocation(lat, lng) {
        this.setState({
            latlng: {
                lat: lat,
                lng: lng
            }
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

    render() {
        return (
            <div>
                <Sidebar categories={categories} />
                <div id='main-container'>
                    <div id='map-container'>
                        <Map setLocation={this.setLocation.bind(this)} />
                        <Yelp />
                    </div>
                    <div id='form-container'>
                        <Form categories={categories} latlng={this.state.latlng} setNotch={this.setNotch.bind(this)} setTitle={this.setTitle.bind(this)} />
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