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
                </ul><br /></div>;
        });
    }

    render() {
        return (
            <aside className="menu" style={style.barStyle}>
                <h3 id='logo'>Notch</h3>
                <hr />
                <Login id='login'/>
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