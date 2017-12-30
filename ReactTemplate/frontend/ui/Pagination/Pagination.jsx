import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PaginationList from './PaginationList.jsx';
import PaginationLink from './PaginationLink.jsx';
import PaginationEllipsis from './PaginationEllipsis.jsx';

export default class Pagination extends React.Component {
    static List = PaginationList;
    static Link = PaginationLink;
    static Ellipsis = PaginationEllipsis;

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        as: 'nav',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, ...props } = this.props;
        const classes = classNames('pagination', className);
        return <Element className={classes} role="navigation" aria-label="pagination" {...props}></Element>
    }
}