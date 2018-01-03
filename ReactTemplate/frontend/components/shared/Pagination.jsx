import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Pagination as PaginationUi } from 'root/ui'

import { locationToUrl, urlToLocation } from 'root/utils/url';

export default class Pagination extends React.Component {
    static propTypes = {
        page: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    GetLinks() {
        let items = [];
        let url = locationToUrl(this.props.location);
        const page = url.query.page;
        for (let i = 1; i <= this.props.page.totalPages; i++) {
            url.query.page = i;
            let newLocation = urlToLocation(url);
            items.push(
                <PaginationUi.Link key={i} as={Link} to={newLocation} current={i == page}>{i.toString()}</PaginationUi.Link>
            );
        }
        return items;
    }

    render() {
        return (
            <div>
                <PaginationUi>
                    <PaginationUi.List>
                        {this.GetLinks()}
                    </PaginationUi.List>
                </PaginationUi>
            </div>
        );
    }
}