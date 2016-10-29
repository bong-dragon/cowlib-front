import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Library from './section/Library';
import Main from './section/Main';

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

let rootElement = document.getElementById('root');

ReactDOM.render((
    <Router history = {browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Main} />
            <Route path="hello" component={Library}/>
        </Route>
    </Router>
), rootElement);