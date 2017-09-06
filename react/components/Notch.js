import React from 'react';

class Notch extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
    }

    showResults() {
        console.log('notch results')
        console.log(this.props.notchResults);
        let results = this.props.notchResults;
        return results.map(notch => {
            if (notch.properties == undefined || notch.properties == null) {
                return (<li className="list-group-item">{notch}</li>)                
            } else {
                return (
                    <li className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{notch.properties.place}</h5>
                            <button>Select</button>
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
                <h4>Nearby Notches</h4>
                <span>Filters: [category: {this.props.notchFilter.category} <i onClick={this.props.setFilter} value={"All"} className="fa fa-times" aria-hidden="true"></i>]</span>
                <br /><br />                
                {this.showResults()}
            </div>
        )
    }
}

export default Notch;