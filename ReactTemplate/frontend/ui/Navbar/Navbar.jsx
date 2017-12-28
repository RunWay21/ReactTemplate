import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavbarBrand from './NavbarBrand.jsx';
import NavbarBurger from './NavbarBurger.jsx';
import NavbarEnd from './NavbarEnd.jsx';
import NavbarItem from './NavbarItem.jsx';
import NavbarMenu from './NavbarMenu.jsx';
import NavbarStart from './NavbarStart.jsx';

export default class Navbar extends React.Component {
    static Brand = NavbarBrand;
    static Burger = NavbarBurger;
    static End = NavbarEnd;
    static Item = NavbarItem;
    static Menu = NavbarMenu;
    static Start = NavbarStart;

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        link: PropTypes.bool
    };

    static defaultProps = {
        as: 'div',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, link, ...props } = this.props;
        const classes = classNames('navbar', { 'is-link': link }, className);
        return <Element className={classes} {...props}></Element>
    }
}