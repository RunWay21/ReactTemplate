import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'root/actions'
import Spinner from './Spinner.jsx';
import Button from './Button.jsx';

class RepeatPanel extends React.Component {
    constructor(props) {
        super(props);
        this.repeatAction = this.repeatAction.bind(this);
    }

    isWait() {
        return this.props.wait.some(x => x === this.props.actionId);
    }

    isError() {
        return this.props.error.some(x => x === this.props.actionId);
    }

    repeatAction() {
        this.props.action();
    }

    render() {
        if (this.isWait()) {
            return (
                <div className="columns is-centered">
                    <div className="column is-narrow has-text-centered">
                        <div className="title">Loading...</div>
                        <Spinner style={{ margin: '0 auto' }} size={3}></Spinner>
                    </div>
                </div>
            );
        }
        if (this.isError()) {
            return (
                <div className="columns is-centered">
                    <div className="column is-narrow has-text-centered">
                        <div className="title is-4">Could not load data from the server.</div>
                        <div className="subtitle">Press repeat button to reload data.</div>
                        <div>
                            <Button action={this.repeatAction} text={'Repeat'}></Button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>{this.props.children}</div>
        );
    }
}



function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        error: state.common.loader.error,
        wait: state.common.loader.wait
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.common.loader, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepeatPanel);