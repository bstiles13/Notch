import React from 'react';
import logo from './assets/logo.png';

import Login from './Login';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu() {
        var categories = this.props.categories;
        var that = this;
        return Object.keys(categories).map(function (key) {
            var array = categories[key].map(function (index) {
                return <li className="category" onClick={that.props.setFilter} value={key + " | " + index}>{index}</li>;
            })
            return <div><p className="menu-label">{key}</p>
                <ul className="menu-list category">
                    {array}
                </ul></div>;
        });
    }

    render() {
        return (
            <aside id='sidebar' className="menu">
                <img id='logo' src={logo}/>
                <hr />
                <Login id='login' user={this.props.user} setUser={this.props.setUser} />
                <hr />
                <br />
                <h6>Filter by Category</h6>
                <hr />                
                <div id='categories'>
                    {this.showMenu()}
                </div>
            </aside>
        )
    }
}

export default Sidebar;