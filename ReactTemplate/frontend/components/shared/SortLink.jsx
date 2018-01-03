import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import FaIcon from '@fortawesome/react-fontawesome';

import { filterToLocation } from 'root/utils/url';

class SortLink extends React.Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        field: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        let sortIcon = null;
        let location;
        if (this.props.filter.orderBy === this.props.field) {
            const isAsc = this.props.filter.sortBy !== 'desc';
            const sortIconClass = isAsc ? 'sort-amount-down' : 'sort-amount-up';
            sortIcon = <span>&nbsp;<FaIcon icon={sortIconClass}></FaIcon></span>;
            location = filterToLocation(this.props.location.pathname, { ...this.props.filter, sortBy: isAsc ? 'desc' : 'asc' });
        }
        else
            location = filterToLocation(this.props.location.pathname, { ...this.props.filter, orderBy: this.props.field, sortBy: 'asc' });
        return (
            <Link to={location}>
                {this.props.children}{sortIcon}
            </Link>
        );
    }
}

export default withRouter(SortLink);