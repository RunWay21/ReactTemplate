import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AppContent from './AppContent.jsx';
import AppSidebar from './AppSidebar.jsx';

export default class AppBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-body columns">
                <AppSidebar className="column"></AppSidebar>
                <AppContent className="column"></AppContent>
            </div>
        );
    }
}
