import React from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends React.Component {

    static propTypes = {
        as: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ])
    };

    static defaultProps = {
        as: 'thead',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { as: Element, ...props } = this.props;
        return <Element {...props}></Element>
    }
}