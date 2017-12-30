import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class PaginationEllipsis extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        as: 'span',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, ...props } = this.props;
        const classes = classNames('pagination-ellipsis', className);
        return <li><Element className={classes} {...props}>&hellip;</Element></li>
    }
}