import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Button extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        primary: PropTypes.bool,
        link: PropTypes.bool,
        info: PropTypes.bool,
        success: PropTypes.bool,
        warning: PropTypes.bool,
        danger: PropTypes.bool,
        small: PropTypes.bool,
        medium: PropTypes.bool,
        large: PropTypes.bool,
        outlined: PropTypes.bool,
        inverted: PropTypes.bool,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        as: 'button',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {
            as: Element, className,
            primary, link, info, success, warning, danger,
            small, medium, large,
            outlined,
            inverted,
            loading,
            ...props
         } = this.props;
        const classes = classNames('button', {
            'is-primary': primary,
            'is-link': link,
            'is-info': info,
            'is-success': success,
            'is-warning': warning,
            'is-danger': danger,
            'is-small': small,
            'is-medium': medium,
            'is-large': large,
            'is-outlined': outlined,
            'is-inverted': inverted,
            'is-loading': loading
        }, className);
        return <Element className={classes} {...props}></Element>
    }
}