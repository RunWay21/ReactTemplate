import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-header navbar is-link">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to='/app'>Home</Link>
                        <Link className="navbar-item" to='/app/client/books'>Books</Link>
                        <Link className="navbar-item" to='/app/awesome'>Awesome</Link>
                    </div>
                </div>
            </div>
        );
    }
}
