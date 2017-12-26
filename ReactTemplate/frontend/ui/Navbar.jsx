import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Line from './Line.jsx';

import './navbar.scss';

class Item extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        active: PropTypes.bool,
        brand: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, brand, active, ...props } = this.props;
        const classes = classNames('navbar-item', {
            'brand': brand,
            'is-active': active
        }, className);
        return <Line.Item className={classes} {...props} ></Line.Item>
    }
}

export default class Navbar extends React.Component {
    static Item = Item;
    static propTypes = {
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, ...props } = this.props;
        const classes = classNames('navbar', className);
        return <Line className={classes} {...props}></Line>
    }
}