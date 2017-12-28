import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class NavbarBurger extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        as: 'button',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, ...props } = this.props;
        const classes = classNames('button', 'navbar-burger', className);
        return (
            <Element className={classes} {...props}>
                <span></span>
                <span></span>
                <span></span>
            </Element>
        );
    }
}