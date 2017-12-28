import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from 'root/api';
import actions from 'root/actions';
import types from 'root/actions/types';
import urlUtil from 'root/utils/url';

import './BookList.scss';

import { Title } from 'root/ui';

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
                <Title>Books page</Title>
                <hr />
                {this.renderFilter()}
                <RepeatPanel actionId={types.CLIENT_BOOK_GETBOOKS} action={() => this.getBooks(this.props)}>
                    {this.renderTable()}
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
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan='6'>

                        </th>
                    </tr>
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
                <tfoot>
                    <tr>
                        <td colSpan='6'>
                            <Pagination page={this.props.page} location={this.props.location}></Pagination>
                        </td>
                    </tr>
                </tfoot>
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