import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'root/actions'
import { Header, Dimmer, Loader, Grid, Button } from 'semantic-ui-react';
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
                <Loader active inline='centered'>Loading...</Loader>
            );
        }
        if (this.isError()) {
            return (
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h3'>
                            Could not load data from the server.
                            <Header.Subheader>Press repeat button to reload data.</Header.Subheader>
                        </Header>
                        <Button onClick={this.repeatAction}>Repeat</Button>
                    </Grid.Column>
                </Grid>
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