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
            <div>
                <h2>Add a notch</h2>
                <div className="form-group">
                    <label for="latitude">Latitude</label>
                    <input type="text" className="form-control" id="latitude" value={this.props.notch.lat} disabled/>
                </div>
                <div className="form-group">
                    <label for="longitude">Longitude</label>
                    <input type="text" className="form-control" id="longitude" value={this.props.notch.lng} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleSelect1">Category</label>
                    <select className="form-control" id="exampleSelect1">
                        <option> Choose </option>
                        {this.options()}
                    </select>
                </div>
                <div className="form-group">
                    <label for="headline">Headline</label>
                    <input type="text" className="form-control" id="headline" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label for="summary">The experience</label>
                    <textarea className="form-control" id="summary" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        )
    }
}

export default Form;