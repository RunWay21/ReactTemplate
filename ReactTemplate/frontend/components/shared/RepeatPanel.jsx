import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import types from 'root/actions/types';
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

    repeatAction() {
        this.props.action();
    }

    render() {
        const item = this.props.loader.find(x => x.id === this.props.actionId);
        if (item && item.state === types.COMMON_LOADER_WAIT) {
            return (
                <Columns centered>
                    <Columns.Column narrow>
                        <Loader size={3} style={{ margin: '0 auto' }}></Loader>
                        <Title size={4} style={{ marginTop: '0.3em' }}>Loading...</Title>
                    </Columns.Column>
                </Columns>
            );
        }
        if (item && item.state === types.COMMON_LOADER_ERROR) {
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
        loader: state.common.loader
    };
}

export default connect(
    mapStateToProps
)(RepeatPanel);