import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class NavbarItem extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        active: PropTypes.bool
    };

    static defaultProps = {
        as: 'a',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, active, ...props } = this.props;
        const classes = classNames('navbar-item', { 'is-active': active }, className);
        return <Element className={classes} {...props}></Element>
    }
}