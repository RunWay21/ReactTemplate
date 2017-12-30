import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class PaginationLink extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        current: PropTypes.bool
    };

    static defaultProps = {
        as: 'a',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, current, ...props } = this.props;
        const classes = classNames('pagination-link', { 'is-current': current }, className);
        return <li><Element className={classes} {...props}></Element></li>
    }
}