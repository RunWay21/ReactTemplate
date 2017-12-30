import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Columns } from 'root/ui';

import AppContent from './AppContent.jsx';
import AppSidebar from './AppSidebar.jsx';

export default class AppBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Columns className="app-body">
                {/* <Columns.Column as={AppSidebar} /> */}
                <Columns.Column as={AppContent} />
            </Columns>
        );
    }
}
