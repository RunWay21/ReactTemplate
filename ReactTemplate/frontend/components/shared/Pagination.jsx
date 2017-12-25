import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import urlUtil from 'root/utils/url';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    GetLinks() {
        let items = [];
        let url = urlUtil.getUrl(this.props.location);
        const page = url.query.page;
        for (let i = 1; i <= this.props.page.totalPages; i++) {
            url.query.page = i;
            let newLocation = urlUtil.getLocation(url);
            items.push(
                <Menu.Item key={i} name={i.toString()} as={Link} to={newLocation}
                    active={i == page}></Menu.Item>
            );
        }
        return items;
    }

    render() {
        return (
            <div>
                <Menu pagination>
                    {this.GetLinks()}
                </Menu>
            </div>
        );
    }
}

Pagination.propTypes = {
    page: PropTypes.object.isRequired
};

export default Pagination;