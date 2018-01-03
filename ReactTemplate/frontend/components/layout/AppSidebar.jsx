import React from 'react';
import { NavItem } from 'components/shared';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${this.props.className} app-sidebar is-narrow`}>
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <NavItem to='/app' exact>Home</NavItem>
                    <NavItem to='/app/client/books' exact>Books</NavItem>
                    <NavItem to='/app/awesome' exact>Awesome</NavItem>
                </ul>
            </div>
        );
    }
}
