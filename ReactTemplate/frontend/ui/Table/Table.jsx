import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import TableFooter from './TableFooter.jsx';
import TableRow from './TableRow.jsx';
import TableHeader from './TableHeader.jsx';
import TableCell from './TableCell.jsx';

export default class Table extends React.Component {
    static Head = TableHead;
    static Body = TableBody;
    static Footer = TableFooter;
    static Row = TableRow;
    static Header = TableHeader;
    static Cell = TableCell;

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        as: 'table',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, ...props } = this.props;
        const classes = classNames('table', className);
        return <Element className={classes} {...props}></Element>
    }
}