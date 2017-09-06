import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.options = this.options.bind(this);
    }

    options() {
        var categories = this.props.categories;
        return Object.keys(categories).map(function (key) {
            return categories[key].map(function (index) {
                return <option>{key} | {index}</option>;
            })
        });
    }

    render() {
        return (
            <div id='form'>
                <h2>Add a notch</h2>
                <div className="form-group">
                    <label htmlFor="exampleSelect1">Category</label>
                    <select className="form-control" id="exampleSelect1" name="newCategory" onChange={this.props.setNotch}>
                        <option> Choose </option>
                        {this.options()}
                    </select>
                </div>
                <label htmlFor="place">Place</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="place" placeholder="Place" aria-describedby="basic-addon2" name="newPlace" value={this.props.place} onChange={this.props.setNotch} disabled={this.props.existingPlace ? true : null} />
                    <span className="input-group-addon" id="basic-addon2">Lat {this.props.latlng.lat} | Lng {this.props.latlng.lng}</span>
                </div>
                <br />
                <label htmlFor="headline">Headline</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="headline" placeholder="Headline" name="newHeadline" onChange={this.props.setNotch} />
                </div>
                <br />
                <label htmlFor="summary">The experience</label>
                <div className="input-group">
                    <textarea className="form-control" id="summary" rows="3" name="newSummary" onChange={this.props.setNotch}></textarea>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" onClick={this.props.newNotch}>Submit</button>
            </div>
        )
    }
}

export default Form;