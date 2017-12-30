import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'root/actions';

import { Loader, Columns, Title, Button } from 'root/ui';

class RepeatPanel extends React.Component {

    static propTypes = {
        actionId: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
    };

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
                <Columns centered>
                    <Columns.Column narrow>
                        <Loader size={3} style={{ margin: '0 auto' }}></Loader>
                        <Title size={4} style={{ marginTop: '0.3em' }}>Loading...</Title>
                    </Columns.Column>
                </Columns>
            );
        }
        if (this.isError()) {
            return (
                <Columns centered>
                    <Columns.Column narrow className="has-text-centered">
                        <Title size={4}>Could not load data from the server.</Title>
                        <Title sub size={4}>Press repeat button to reload data.</Title>
                        <Button onClick={this.repeatAction}>Repeat</Button>
                    </Columns.Column>
                </Columns>
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
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