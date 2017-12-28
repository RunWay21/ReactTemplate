import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Navbar } from 'root/ui';
import urlHelper from 'root/utils/url';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar link className="app-header">
                <Navbar.Brand>
                    {this.renderMenuItem(<strong>VTrack</strong>, '/app')}
                    {this.renderMenuItem('Books', '/app/client/books')}
                    {this.renderMenuItem('Awesome', '/app/awesome')}
                </Navbar.Brand>
            </Navbar>
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