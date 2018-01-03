import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class LevelItem extends React.Component {

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
        const classes = classNames('level-item', className);
        return <Element className={classes} {...props}></Element>
    }
}