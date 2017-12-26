import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Navbar, Line } from 'root/ui';
import urlHelper from 'root/utils/url';

class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    render() {
        return (
            <div className="app-header">
                <Navbar>
                    <Navbar.Item brand as={Link} to={'/app'} active={this.props.location.pathname == '/app'}>
                        VTrack
                    </Navbar.Item>
                    {this.renderMenuItem('Books', '/app/client/books')}
                    {this.renderMenuItem('Awesome', '/app/awesome')}
                </Navbar>
            </div>
        );
    }
    renderMenuItem(name, path) {
        return (
            <Navbar.Item as={Link} to={path} active={this.props.location.pathname == path}>
                {name}
            </Navbar.Item>
        );
    }
}

export default withRouter(Header);