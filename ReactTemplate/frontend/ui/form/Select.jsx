import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Select extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, ...props } = this.props;
        const classes = classNames('select', className);
        return (
            <div className={classes}>
                <select  {...props}>
                    {this.props.children}
                </select>
            </div>
        );
    }
}