import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Form from './components/Form';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div id='main-container'>
                    <div id='map-container'>
                        <Map />
                    </div>
                    <div id='form-container'>
                        <Form />
                        <h1>{this.state.message} world!</h1>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {message: 'Hello'};
    }
    componentDidMount() {
        this.setState({message: 'Bye'});
    }

}


ReactDOM.render(
  <Hello />,
  document.getElementById('app')
);