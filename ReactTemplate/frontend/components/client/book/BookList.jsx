import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from 'root/api';
import actions from 'root/actions';
import types from 'root/actions/types';

import './BookList.scss';

import RepeatPanel from 'components/shared/RepeatPanel.jsx';
import Pagination from 'components/shared/Pagination.jsx';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.getBooks = this.getBooks.bind(this);
        console.log(this);
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        this.props.actions.getBooksAsync(1);
    }

    render() {
        return (
            <div className="client_book_list section">
                <p className="title">Books page</p>
                <hr />
                <RepeatPanel actionId={types.CLIENT_BOOK_GETBOOKS} action={this.getBooks}>
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
                    <Pagination page={this.props.page} location={this.props.location}></Pagination>
                </RepeatPanel>
            </div>
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