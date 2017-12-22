import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from 'root/api';
import actions from 'root/actions';
import types from 'root/actions/types';
import urlUtil from 'root/utils/url';

import './BookList.scss';

import { Button, Pagination, RepeatPanel } from 'components/shared';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.getBooks = this.getBooks.bind(this);
    }

    componentWillMount() {
        this.getBooks();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location)
            this.getBooks();
    }

    getBooks() {
        let url = urlUtil.getUrl(this.props.location);
        if (!url.query.page) {
            url.query.page = 1;
            this.props.history.push(urlUtil.getLocation(url));
        } else
            this.props.actions.getBooksAsync(url.query.page);
    }

    render() {
        return (
            <div className="client_book_list section">
                <p className="title">Books page</p>
                <hr />
                {this.renderFilter()}
                <RepeatPanel actionId={types.CLIENT_BOOK_GETBOOKS} action={this.getBooks}>
                    {this.renderTable()}
                    <Pagination page={this.props.page} location={this.props.location}></Pagination>
                </RepeatPanel>
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
            <table>
                <thead>
                    <tr>
                        <th className="col-id">Id</th>
                        <th className="col-author">Author</th>
                        <th className="col-title">Title</th>
                        <th className="col-description">Description</th>
                        <th className="col-isbn">ISBN</th>
                        <th className="col-date">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.page.items.map(item => (
                        <tr key={item.id}>
                            <td className="col-id">{item.id}</td>
                            <td className="col-author">{item.author}</td>
                            <td className="col-title">{item.title}</td>
                            <td className="col-description">{item.description}</td>
                            <td className="col-isbn">{item.isbn}</td>
                            <td className="col-date">{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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