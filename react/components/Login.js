import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            register: false,
            user: null,
            existingUser: {
                username: '',
                password: '',
            },
            newUser: {
                username: '',
                password1: '',
                password2: '',
                zipCode: ''
            },
            invalidUser: false,
            invalidName: false,
            invalidPassword: false,
            invalidText: false,
            warning: {
                invalidUser: 'Username and/or password is incorrect.',
                invalidName: 'Username already exists.',
                invalidPassword: "Passwords do not match.",
                invalidText: "Username and/or password is incomplete"
            }
        };
        this.showLogin = this.showLogin.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.setExistingUser = this.setExistingUser.bind(this);
        this.setNewUser = this.setNewUser.bind(this);
        this.clearWarnings = this.clearWarnings.bind(this);
        this.error = this.error.bind(this);
    }

    componentDidMount() {
        this.checkUser();
    }

    componentDidUpdate() {
        console.log(this.state.existingUser);
        console.log(this.state.newUser);
        console.log(this.state.loggedIn);
    }

    checkUser() {
        var local = localStorage.getItem('notchUser');
        console.log('local user: ' + local);
        if (local != null && local != 'null' && local != undefined) {
            this.setState({ user: local });
            this.setState({ loggedIn: true });
        } else {
            this.setState({ user: null });
            this.setState({ loggedIn: false });
        }
    }

    setRegister() {
        let status = this.state.register;
        if (status) {
            this.setState({ register: false })
        } else {
            this.setState({ register: true })
        }
    }

    setExistingUser(event) {
        let user = this.state.existingUser;
        user[event.target.name] = event.target.value;
        this.setState({
            existingUser: user
        })
    }

    setNewUser(event) {
        console.log('new user');
        let user = this.state.newUser;
        user[event.target.name] = event.target.value;
        this.setState({
            newUser: user
        })
    }

    loginExisting() {
        this.clearWarnings();
        let existingUser = this.state.existingUser;

        if (existingUser.username === '' || existingUser.password === '') {
            this.setState({ invalidText: true })
        } else {
            // Make the HTTP request:
            axios.post('/existinguser', existingUser).then(data => {
                // Read the result field from the JSON response.
                console.log(data.data);
                console.log('existing login response');
                let result = data.data;
                if (result == 'success') {
                    console.log('logging in');
                    this.loggedIn(existingUser.username);
                } else {
                    this.setState({ invalidUser: true })
                }
            });
        }
    }

    loginNew() {
        this.clearWarnings();
        let newUser = this.state.newUser;
        if (newUser.password1 != newUser.password2) {
            this.setState({ invalidPassword: true });
        } else {
            // Make the HTTP request:
            axios.post('/newuser', newUser).then(data => {
                // Read the result field from the JSON response.
                console.log('new login response');
                let result = data.data;
                if (result == 'success') {
                    this.loggedIn(newUser.username);
                } else {
                    { this.setState({ invalidName: true }) }
                }
            });
        };
    }

    loggedIn(user) {
        console.log('received login');
        localStorage.setItem('notchUser', user);
        this.checkUser();

        this.setState({
            existingUser: {
                username: '',
                password: '',
            },
            newUser: {
                username: '',
                password1: '',
                password2: '',
                zipCode: ''
            }
        })
    }

    logout() {
        localStorage.setItem('notchUser', null);
        this.checkUser();
    }

    clearWarnings() {
        this.setState({
            invalidUser: false,
            invalidName: false,
            invalidPassword: false
        });
    }

    error(type) {
        if (this.state[type]) {
            return (<div className='warning'>{this.state.warning[type]}</div>)
        }
    }

    showLogin() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <div>Welcome back <span id="username">{this.state.user}</span>!</div>
                    <br />
                    <button type="button" className="btn btn-primary btn-sm login-button" onClick={this.logout.bind(this)}>Sign Out</button>
                </div>
            )
        } else if (this.state.register) {
            return (
                <div>
                    <div>
                        {this.error('invalidText')}
                        {this.error('invalidName')}
                        <label>New User</label>
                        <div className="form-group">
                            <input type="email" className="form-control form-control-sm login-input" id="new-username" placeholder="Enter username" name='username' onChange={this.setNewUser} />
                        </div>
                        {this.error('invalidPassword')}
                        <div className="form-group">
                            <input type="password" className="form-control form-control-sm login-input" id="new-password1" placeholder="Password" name='password1' onChange={this.setNewUser} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-sm login-input" id="new-password2" placeholder="Re-enter password" name='password2' onChange={this.setNewUser} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-sm login-input" id="new-zipcode" placeholder="Zip code (Optional)" name='zipCode' onChange={this.setNewUser} />
                        </div>
                        <button type="button" className="btn btn-primary btn-sm login-button" onClick={this.loginNew.bind(this)}>Register</button>
                        <button type="button" className="btn btn-secondary btn-sm login-button" onClick={this.setRegister.bind(this)}>Already a user?</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {this.error('invalidText')}
                    {this.error('invalidUser')}
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="email" className="form-control form-control-sm login-input" id="existing-username" placeholder="Enter username" name='username' onChange={this.setExistingUser} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control form-control-sm login-input" id="existing-password" placeholder="Password" name='password' onChange={this.setExistingUser} />
                    </div>
                    <button type="button" className="btn btn-primary btn-sm login-button" onClick={this.loginExisting.bind(this)}>Sign In</button>
                    <button type="button" className="btn btn-secondary btn-sm login-button" onClick={this.setRegister.bind(this)}>New User</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.showLogin()}
            </div>
        )
    }

}

export default Login;