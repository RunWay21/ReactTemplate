import React from 'react';
import { Switch, Route } from 'react-router-dom'

import BookList from './BookList.jsx';

export default class BookPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path='/app/client/books' component={BookList} />
            </Switch>
        );
    }
}
