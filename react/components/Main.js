import React from 'react';

import Sidebar from './Sidebar';
import Map from './Map';
import Form from './Form';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {message: 'Hello'};
    }
    
    componentDidMount() {
        this.setState({message: 'Bye'});
    }

    render() {
        return (
            <div>
                <Sidebar categories={categories} />
                <div id='main-container'>
                    <div id='map-container'>
                        <Map />
                    </div>
                    <div id='form-container'>
                        <Form categories={categories} />
                        <h1>{this.state.message} world!</h1>
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