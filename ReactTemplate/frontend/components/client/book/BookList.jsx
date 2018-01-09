import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from 'root/api';
import actions from 'root/actions';
import types from 'root/actions/types';
import { locationToFilter, filterToLocation } from 'root/utils/url';

import './BookList.scss';

import { Title, Level, Table, Control, Input, Label } from 'root/ui';
import FaIcon from '@fortawesome/react-fontawesome';

import { Pagination, RepeatPanel, SortLink, StringFilter } from 'components/shared';


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
        const filter = locationToFilter(props.location, 'author', 'asc');
        props.actions.getBooksAsync(filter);
    }

    render() {
        let filter = locationToFilter(this.props.location, 'author', 'asc');
        return (
            <div className="client_book_list">
                <Title size={4}>Books page</Title>
                <hr />
                {this.renderFilter(filter)}
                <RepeatPanel actionId={types.CLIENT_BOOK_GETBOOKS} action={() => this.getBooks(this.props)}>
                    {this.renderTable(filter)}
                </RepeatPanel>
            </div>
        );
    }

    renderFilter(filter) {
        return (
            <div>
                <Level>
                    <Level.Left>
                        <Level.Item>
                            <Label>Filters:</Label>
                        </Level.Item>
                        <Level.Item>
                            <StringFilter filter={filter} field="author" placeholder="Author filter"></StringFilter>
                        </Level.Item>
                        <Level.Item>
                            <StringFilter filter={filter} field="title" placeholder="Title filter"></StringFilter>
                        </Level.Item>
                    </Level.Left>
                    <Level.Right>
                        <Level.Item>
                            123
                    </Level.Item>
                    </Level.Right>
                </Level>
            </div>
        );
    }
    renderTable(filter) {
        return (
            <Table fullwidth>
                <Table.Head>
                    <Table.Row>
                        <Table.Header className="col-id">Id</Table.Header>
                        <Table.Header className="col-author">
                            <SortLink filter={filter} field="author">Author</SortLink>
                        </Table.Header>
                        <Table.Header className="col-title">
                            <SortLink filter={filter} field="title">Title</SortLink>
                        </Table.Header>
                        <Table.Header className="col-description">
                            <SortLink filter={filter} field="description">Description</SortLink>
                        </Table.Header>
                        <Table.Header className="col-isbn">
                            <SortLink filter={filter} field="isbn">ISBN</SortLink>
                        </Table.Header>
                        <Table.Header className="col-date">Date</Table.Header>
                    </Table.Row>
                </Table.Head>
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
                        <Table.Cell colSpan='6'>
                            <Pagination page={this.props.page} location={this.props.location}></Pagination>
                        </Table.Cell>
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