import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './components/Sidebar';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <Sidebar />
                <h1>{this.state.message} world!</h1>
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