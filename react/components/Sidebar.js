import React from 'react';

import Login from './Login';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu() {
        var categories = this.props.categories;
        return Object.keys(categories).map(function (key) {
            var array = categories[key].map(function (index) {
                return <li><a href='#'>{index}</a></li>;
            })
            return <div><p className="menu-label">{key}</p>
                <ul className="menu-list category">
                    {array}
                </ul></div>;
        });
    }

    render() {
        return (
            <aside id='sidebar-container' className="menu">
                <h3 id='logo'>Notch</h3>
                <hr />
                <Login id='login' user={this.props.user} setUser={this.props.setUser}/>
                <hr />
                <h5>Find Notches</h5>
                <div id='categories'>
                    {this.showMenu()}
                </div>
            </aside>
        )
    }
}

export default Sidebar;