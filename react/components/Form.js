import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.options = this.options.bind(this);
    }

    options() {
        var categories = this.props.categories;
        return Object.keys(categories).map(function(key) {
            return categories[key].map(function(index) {
                return <option>{key} | {index}</option>;
            })
        });
    }

    render() {
        return (
            <div>
                <h2>Add a notch</h2>
                <div className="field">
                <label className="label">Category</label>
                <p className="control">
                    <span className="select">
                    <select>
                        <option>Select dropdown</option>
                        {this.options()}
                    </select>
                    </span>
                </p>
                </div>

                <div className="field">
                <label className="label">Headline</label>
                <p className="control">
                    <input className="input" type="text" placeholder="Text input" />
                </p>
                </div>

                <div className="field">
                <label className="label">The experience</label>
                <p className="control">
                    <textarea className="textarea" placeholder="Textarea"></textarea>
                </p>
                </div>

                <div className="field is-grouped">
                <p className="control">
                    <button className="button is-primary">Submit</button>
                </p>
                <p className="control">
                    <button className="button is-link">Cancel</button>
                </p>
                </div>
            </div>
        )
    }
}

export default Form;