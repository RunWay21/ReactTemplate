import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import urlUtil from 'root/utils/url';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    GetLinks() {
        let items = [];
        let url = urlUtil.getUrl(this.props.location);
        for (let i = 1; i <= this.props.page.totalPages; i++) {
            url.query.page = i;
            let newLocation = urlUtil.getLocation(url);
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