import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';
import urlHelper from 'root/utils/url';

class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
    }
    goto(path) {
        this.props.history.push({ pathname: path });
    }
    render() {
        return (
            <div className="app-header">
                <Menu  color={'blue'} inverted>
                    <Menu.Item>
                        <strong>VTrack</strong>
                    </Menu.Item>
                    {this.renderMenuItem('Home', '/app')}
                    {this.renderMenuItem('Books', '/app/client/books')}
                    {this.renderMenuItem('Awesome', '/app/awesome')}
                </Menu>
            </div>
        );
    }
    renderMenuItem(name, path) {
        return <Menu.Item name={name} as={Link} to={path} active={this.props.location.pathname == path} />
    }
}

export default withRouter(Header);