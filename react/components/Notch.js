import React from 'react';

class Notch extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
    }

    showResults() {
        console.log(this.props.notchResults);
        let results = this.props.notchResults;
        return results.map(place => {
            if (place.name) {
                return (
                    <li className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{place.name}</h5>
                            <button>Select</button>
                        </div>
                        <small>Placeholder</small>
                    </li>
                )
            } else {
                return (<li className="list-group-item">{place}</li>)
            }
        })
    }

    render() {
        return (
            <div id='notch'>
                <h4>Nearby Notches</h4>
                {this.showResults()}
            </div>
        )
    }
}

export default Notch;