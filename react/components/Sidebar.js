import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <aside className="menu" style={style.barStyle}>
                {this.options()}
            </aside>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            category: 'categories'
        };
        this.options = this.options.bind(this);
    }
    options() {
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