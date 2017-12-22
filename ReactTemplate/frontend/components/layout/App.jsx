import React from 'react';
import { render } from 'react-dom';

import './layout.scss';

import AppHeader from './AppHeader.jsx';
import AppBody from './AppBody.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className="app-root">
                <AppHeader></AppHeader>
                <AppBody></AppBody>
            </div>
        );
    }
}