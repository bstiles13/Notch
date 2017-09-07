import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: null,
            userNotches: []
        }
    }

    componentDidMount() {
        this.checkUser();
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    checkUser() {
        var local = localStorage.getItem('notchUser');
        if (local != null && local != 'null' && local != undefined) {
            this.setState({ loggedIn: true, user: local }, this.getNotches);
        } else {
            this.setState({ loggedIn: false, user: null });
        }
    }

    getNotches() {
        // return (<div>Test</div>)
        if (this.state.loggedIn) {
            axios.post('/usernotches', { user: this.state.user }).then(data => {
                console.log('User has notches');
                console.log(data.data);
                let notches = data.data;
                this.setState({ userNotches: notches });
            })
        }
    }

    showNotches() {
        let notches = this.state.userNotches;
        console.log(notches);
        if (notches.length === 0) {
            return (<li>No notches</li>)
        } else {
            return notches.map(notch => {
                return (
                    <li className="list-group-item justify-content-between">
                        {notch.properties.place}
                    <span className="badge badge-default badge-pill">Delete</span>
                    </li>
                )
            })
        }
    }

    render() {
        return (
            <div id='profile'>
                <h3>{this.state.user}'s Profile</h3>
                <hr />
                <h5>Manage Notches:</h5>
                <ul className="list-group">
                    {this.showNotches()}
                </ul>
                <br />
                <br />
                <Link to='/'><button type="button" className="btn btn-danger">Back</button></Link>
            </div>
        )
    }

}

export default Profile;