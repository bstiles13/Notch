import React from 'react';

class Form extends React.Component {
    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Name</label>
                    <p className="control">
                        <input className="input" type="text" placeholder="Text input" />
                    </p>
                    </div>

                    <div className="field">
                    <label className="label">Subject</label>
                    <p className="control">
                        <span className="select">
                        <select>
                            <option>Select dropdown</option>
                            <option>With options</option>
                        </select>
                        </span>
                    </p>
                    </div>

                    <div className="field">
                    <label className="label">Message</label>
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