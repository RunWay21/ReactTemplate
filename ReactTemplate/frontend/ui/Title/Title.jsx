import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Title extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        size: PropTypes.number,
        sub: PropTypes.bool
    };

    static defaultProps = {
        size: 3
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { size, sub, className, ...props } = this.props;
        const valid = size < 1 || size > 6;
        const sizeClass = valid ? 'is-3' : 'is-' + size;
        const Tag = valid ? 'h3' : 'h' + size;
        const classes = classNames({
            'title': !sub,
            'subtitle': sub,
        }, sizeClass, className);
        return <Tag className={classes} {...props}></Tag>
    }
}