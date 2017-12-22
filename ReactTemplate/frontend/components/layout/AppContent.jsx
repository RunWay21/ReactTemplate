import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AwesomeComponent from 'components/awesome/AwesomeComponent.jsx';
import HomePage from 'components/pages/HomePage.jsx';
import BookPage from 'components/client/book/BookPage.jsx';

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${this.props.className} app-content`}>
                <Switch>
                    <Route exact path='/app' component={HomePage} />
                    <Redirect exact from="/" to="/app" />
                    <Route path='/app/client/books' component={BookPage} />
                    <Route path='/app/awesome' component={AwesomeComponent} />
                </Switch>
            </div>
        );
    }
}
