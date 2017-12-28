import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Column from './Column.jsx';

export default class Columns extends React.Component {
    static Column = Column;

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        as: 'div',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, ...props } = this.props;
        const classes = classNames('columns', className);
        return <Element className={classes} {...props}></Element>
    }
}