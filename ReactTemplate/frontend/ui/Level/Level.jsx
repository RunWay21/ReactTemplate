import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LevelLeft from './LevelLeft.jsx';
import LevelItem from './LevelItem.jsx';
import LevelRight from './LevelRight.jsx';

export default class Level extends React.Component {
    static Left = LevelLeft;
    static Right = LevelRight;
    static Item = LevelItem;

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
        const classes = classNames('level', className);
        return <Element className={classes} {...props}></Element>
    }
}