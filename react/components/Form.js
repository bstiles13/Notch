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
                <div id='location'>
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" className="form-control" id="latitude" value={this.props.latlng.lat} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" className="form-control" id="longitude" value={this.props.latlng.lng} disabled />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleSelect1">Category</label>
                    <select className="form-control" id="exampleSelect1" name="newCategory" onChange={this.props.setNotch}>
                        <option> Choose </option>
                        {this.options()}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Headline</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" name="newTitle" onChange={this.props.setNotch} />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">The experience</label>
                    <textarea className="form-control" id="summary" rows="3" name="newSummary" onChange={this.props.setNotch}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        )
    }
}

export default Form;