import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <nav className="panel" style={style.barStyle}>
                <p className="panel-heading">
                    Categories
                </p>
                <a className="panel-block">
                    <span className="panel-icon">
                    <i className="fa fa-book"></i>
                    </span>
                    Outdoors
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                    <i className="fa fa-book"></i>
                    </span>
                    Sports
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                    <i className="fa fa-book"></i>
                    </span>
                    Shows
                </a>
            </nav>
        )
    }
}

var style = {
    barStyle: {
        'position': 'fixed',
        'width': '15%',
        'height': '100%',
        'backgroundColor': 'dimgray'
    }
}

export default Sidebar;