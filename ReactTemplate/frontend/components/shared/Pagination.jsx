import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import queryString from 'query-string';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    GetLinks() {
        var items = [];
        var query = queryString.parse(this.props.location.search, { arrayFormat: 'bracket' });
        for (var i = 1; i <= this.props.page.totalPages; i++) {
            query.page = i;
            var newLocation = {
                pathname: this.props.location.pathname,
                search: queryString.stringify(query, { arrayFormat: 'bracket' })
            };
            items.push(
                <li key={i}>
                    <NavLink className="pagination-link"
                        to={newLocation}
                        isActive={(match, location) => newLocation.pathname == location.pathname && newLocation.search == location.search}
                        activeClassName="is-current">{i}</NavLink>
                </li>
            );
        }
        return items;
    }

    render() {
        return (
            <nav className="pagination">
                <ul className="pagination-list">
                    {this.GetLinks()}
                </ul >
            </nav >
        );
    }
}

Pagination.propTypes = {
    page: PropTypes.object.isRequired
};

export default Pagination;