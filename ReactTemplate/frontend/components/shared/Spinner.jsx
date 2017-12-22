import React from 'react';
import PropTypes from 'prop-types';

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.spinnerStyle = {
            ...this.props.style,
            width: this.props.size + 'em',
            height: this.props.size + 'em'
        }
    }
    render() {
        return (
            <div className="loader" style={this.spinnerStyle}></div>
        );
    }
}

Spinner.defaultProps = {
    size: 1
};

Spinner.propTypes = {
    size: PropTypes.number
};

export default Spinner;