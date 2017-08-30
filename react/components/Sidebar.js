import React from 'react';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: 'categories'
        };
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu() {
        var categories = this.props.categories;
        return Object.keys(categories).map(function(key) {
            var array = categories[key].map(function(index) {
                return <li><a>{index}</a></li>;
            })
            return <div><p className="menu-label">{key}</p>
            <ul className="menu-list">
                {array}
            </ul><br/></div>;
        });
    }

    render() {
        return (
            <aside className="menu" style={style.barStyle}>
                {this.showMenu()}
            </aside>
        )
    }
}

var style = {
    barStyle: {
        'position': 'fixed',
        'width': '15%',
        'height': '100%',
        'backgroundColor': 'dimgray',
        'overflow': 'scroll'
    }
}

export default Sidebar;