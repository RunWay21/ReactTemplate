import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Column extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        narrow: PropTypes.bool
    };

    static defaultProps = {
        as: 'div',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, narrow, ...props } = this.props;
        const classes = classNames('column', { 'is-narrow': narrow }, className);
        return <Element className={classes} {...props}></Element>
    }
}