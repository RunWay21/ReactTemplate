import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from 'root/api';
import actions from 'root/actions';
import types from 'root/actions/types';
import urlUtil from 'root/utils/url';

import './BookList.scss';
import { Container, Header, Divider, Table } from 'semantic-ui-react';
import { Pagination, RepeatPanel } from 'components/shared';

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getBooks(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location)
            this.getBooks(nextProps);
    }

    getBooks(props) {
        let url = urlUtil.getUrl(props.location);
        if (!url.query.page) {
            url.query.page = 1;
            props.history.push(urlUtil.getLocation(url));
        } else
            props.actions.getBooksAsync(url.query.page);
    }

    render() {
        return (
            <div className="client_book_list">
                <Container fluid={true}>
                    <Header size='medium'>Books page</Header>
                    <Divider />
                    {this.renderFilter()}
                    <RepeatPanel actionId={types.CLIENT_BOOK_GETBOOKS} action={() => this.getBooks(this.props)}>
                        {this.renderTable()}
                    </RepeatPanel>
                </Container>
            </div>
        );
    }

    renderFilter() {
        return (
            <div className="level">
                <div className="level-left">
                    <div className="level-item">

                    </div>
                </div>
            </div>
        );
    }
    renderTable() {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className="col-id">Id</Table.HeaderCell>
                        <Table.HeaderCell className="col-author">Author</Table.HeaderCell>
                        <Table.HeaderCell className="col-title">Title</Table.HeaderCell>
                        <Table.HeaderCell className="col-description">Description</Table.HeaderCell>
                        <Table.HeaderCell className="col-isbn">ISBN</Table.HeaderCell>
                        <Table.HeaderCell className="col-date">Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.page.items.map(item => (
                        <Table.Row key={item.id}>
                            <Table.Cell className="col-id">{item.id}</Table.Cell>
                            <Table.Cell className="col-author">{item.author}</Table.Cell>
                            <Table.Cell className="col-title">{item.title}</Table.Cell>
                            <Table.Cell className="col-description">{item.description}</Table.Cell>
                            <Table.Cell className="col-isbn">{item.isbn}</Table.Cell>
                            <Table.Cell className="col-date">{item.date}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            <Pagination page={this.props.page} location={this.props.location}></Pagination>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}



function mapStateToProps(state) {
    return {
        page: state.client.book.page
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.client.book, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList);