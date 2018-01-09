import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Input extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };
    
    constructor(props) {
        super(props);
    }

    render() {
        const { className, ...props } = this.props;
        const classes = classNames('input', className);
        return <input type="text" className={classes} {...props}></input>
    }
}