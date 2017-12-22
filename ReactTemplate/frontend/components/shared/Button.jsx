import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.action} className="button">{this.props.text}</button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    action: PropTypes.func.isRequired
};

export default Button;