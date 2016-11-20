import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import cowlib from './reducer';

import App from './App';
import Library from './section/Library';
import Main from './section/Main';
import Search from './section/Search';

import {Router, Route, browserHistory, IndexRoute} from 'react-router'

let rootElement = document.getElementById('root');
let store = createStore(cowlib);

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Main}/>
                <Route path="search" component={Search}/>
                <Route path=":ownerId" component={Library}/>
            </Route>
        </Router>
    </Provider>
), rootElement);