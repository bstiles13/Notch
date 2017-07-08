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

var categories = {
    Outdoors: ['Hiking', 'Surfing', 'Boating', 'Skiing', 'Other'],
    Sports: ['Recreational', 'Professional', 'Other'],
    Shows: ['Broadway', 'Comedy', 'Other'],
    Art: ['Museum', 'Gala', 'Other'],
    Animals: ['Zoo', 'Aquarium', 'Nature Watching', 'Other']
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