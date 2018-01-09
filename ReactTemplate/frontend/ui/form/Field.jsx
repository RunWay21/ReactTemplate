import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Field extends React.Component {
    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        addons: PropTypes.bool,
        grouped: PropTypes.bool
    };

    static defaultProps = {
        as: 'div',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, addons, grouped, className, ...props } = this.props;
        const classes = classNames('field', { 'has-addons': addons, 'is-grouped': grouped }, className);
        return <Element className={classes} {...props}></Element>
    }
}