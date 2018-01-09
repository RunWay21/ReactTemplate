import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Label extends React.Component {
    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        as: 'label',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, ...props } = this.props;
        const classes = classNames('label', className);
        return <Element className={classes} {...props}></Element>
    }
}