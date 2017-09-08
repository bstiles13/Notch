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
            return <div><p className="menu-label">{that.showIcon(key)}{key}</p>
                <ul className="menu-list category">
                    {array}
                </ul></div>;
        });
    }

    showIcon(category) {
        switch (category) {
            case "Outdoors":
                return (<img className='marker-icon' src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png' />);
                break;
            case "Sports":
                return (<img className='marker-icon' src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png' />);
                break;
            case "Shows":
                return (<img className='marker-icon' src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png' />);
                break;
            case "Art":
                return (<img className='marker-icon' src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png' />);
                break;
            case "Animals":
                return (<img className='marker-icon' src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png' />);
                break;
            case "Lifestyle":
                return (<img className='marker-icon' src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png' />);
                break;
        }
    }

    render() {
        return (
            <aside id='sidebar' className="menu">
                <img id='logo' src={logo} />
                <hr />
                <Login id='login' user={this.props.user} setUser={this.props.setUser} />
                <hr />
                <a href="#exampleModal" data-toggle="modal" data-target="#exampleModal">
                    How It Works
                </a>
                <br />
                <hr />
                <h6>Filter by Category</h6>
                <br />
                <div id='categories'>
                    {this.showMenu()}
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Creating a Notch</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                COMING SOON
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        )
    }
}

export default Sidebar;