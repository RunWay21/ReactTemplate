import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Item extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        className: PropTypes.string,
        grow: PropTypes.number,
        style: PropTypes.object
    };

    static defaultProps = {
        as: 'div',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, className, grow, style, ...props } = this.props;
        const classes = classNames('flex-item', className);
        const styles = { ...style, flexGrow: grow };
        return <Element className={classes} style={styles} {...props} ></Element>
    }
}

export default class Line extends React.Component {
    static Item = Item;

    static propTypes = {
        className: PropTypes.string,
        column: PropTypes.bool,
        start: PropTypes.bool,
        center: PropTypes.bool,
        end: PropTypes.bool,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, start, center, end, column, ...props } = this.props;
        const classes = classNames(
            'flex-line',
            {
                'is-column': column,
                'line-start': start,
                'line-center': center,
                'line-end': end,
            },
            className);
        return <div className={classes} {...props } ></div >;
    }
}