import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Router, Route, browserHistory } from 'react-router'

let rootElement = document.getElementById('root');

const Message = React.createClass({
    render() {
        return <h3>example</h3>
    }
});

ReactDOM.render((
    <Router history = {browserHistory}>
        <Route path="/" component={App}>
            <Route path="user" component={Message}/>
        </Route>
    </Router>
), rootElement);