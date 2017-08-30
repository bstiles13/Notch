import React from 'react';

import Sidebar from './Sidebar';
import Map from './Map';
import Form from './Form';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notch: {
                lat: -0.777259,
                lng: -91.142578
            }
        };
    }

    componentDidMount() {}

    componentDidUpdate() {
        console.log(this.state.notch);
    }

    createNotch(lat, lng) {
        this.setState({
            notch: {
                lat: lat,
                lng: lng
            }
        })
    }

    render() {
        return (
            <div>
                <Sidebar categories={categories} />
                <div id='main-container'>
                    <div id='map-container'>
                        <Map createNotch={this.createNotch.bind(this)}/>
                    </div>
                    <div id='form-container'>
                        <Form categories={categories} notch={this.state.notch}/>
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