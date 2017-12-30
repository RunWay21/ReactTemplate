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
        size: PropTypes.number,
        style: PropTypes.object
    };

    static defaultProps = {
        as: 'div',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, size, style, ...props } = this.props;
        const classes = classNames('loader', className);
        const styles = { width: size + 'em', height: size + 'em', ...style };
        return <Element className={classes} style={styles} {...props}></Element>
    }
}