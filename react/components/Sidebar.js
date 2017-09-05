import React from 'react';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.showLogin = this.showLogin.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    showLogin() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <div>Welcome back!</div>
                    <button type="button" className="btn btn-primary btn-sm">Sign In</button>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control form-control-sm login-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control form-control-sm login-input" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="button" className="btn btn-primary btn-sm">Sign In</button>
                </div>
            )
        }
    }

    showMenu() {
        var categories = this.props.categories;
        return Object.keys(categories).map(function (key) {
            var array = categories[key].map(function (index) {
                return <li><a>{index}</a></li>;
            })
            return <div><p className="menu-label">{key}</p>
                <ul className="menu-list">
                    {array}
                </ul><br /></div>;
        });
    }

    render() {
        return (
            <aside className="menu" style={style.barStyle}>
                <h3 id='logo'>Notch</h3>
                <hr />
                <div id='login'>
                    {this.showLogin()}
                </div>
                <hr />
                <h5>Find Notches</h5>
                <div id='categories'>
                    {this.showMenu()}
                </div>
            </aside>
        )
    }
}

var style = {
    barStyle: {
        'position': 'fixed',
        'width': '15%',
        'height': '100%',
        'paddingLeft': '10px',
        'paddingRight': '30px',
        'backgroundColor': 'gainsboro',
        'overflow': 'scroll'
    }
}

export default Sidebar;