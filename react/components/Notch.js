import React from 'react';
import axios from 'axios';

class Notch extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
    }

    getLocation(event) {
        console.log(event.target.value);
        let id = event.target.value;
        axios.post('/findone', { id: id }).then(data => {
            console.log(data.data);
            this.props.findOne(data.data);
            this.props.setFocus();
        })
    }

    showFilter() {
        if (this.props.notchFilter.category == 'All') {
            return (<span>Filters: None</span>)
        } else {
            return (
                <span>Filters: [category: {this.props.notchFilter.category} <i onClick={this.props.setFilter} value={"All"} className="fa fa-times" aria-hidden="true"></i>]</span>
            )
        }
    }

    showResults() {
        console.log('notch results')
        console.log(this.props.notchResults);
        let results = this.props.notchResults;
        let i = 0;
        return results.map(notch => {
            if (notch.properties == undefined || notch.properties == null) {
                return (<li className="list-group-item">{notch}</li>)
            } else {
                return (
                    <li className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{notch.properties.place}</h5>
                            <button onClick={this.getLocation.bind(this)} value={notch._id} className="btn btn-sm">Go</button>
                        </div>
                        <small>{notch.properties.headline}</small>
                    </li>
                )
            }
        })
    }

    render() {
        return (
            <div id='notch'>
                <h4>User Notches</h4>
                <span className="description">All Notches (locations) created by users within 100 miles of <img id='person-icon' src='http://www.clker.com/cliparts/3/u/P/P/q/W/walking-icon-hi.png' /></span>
                <hr />
                {this.showFilter()}
                <br /><br />
                {this.showResults()}
            </div>
        )
    }
}

export default Notch;