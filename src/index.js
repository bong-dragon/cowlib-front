import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import cowlib from './reducer';

import App from './App';
import Library from './section/Library';
import Main from './section/Main';
import Search from './section/modal/Search';
import Alert from './section/modal/Alert';
import Borrow from './section/modal/Borrow';
import ReturnBook from './section/modal/ReturnBook';

import {Router, Route, browserHistory, IndexRoute} from 'react-router'

let rootElement = document.getElementById('root');
let store = createStore(cowlib);

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Main}/>
                <Route path="search" component={Search}/>
                <Route path="alert" component={Alert}/>
                <Route path="borrow/:callNumberId/:reserverId" component={Borrow}/>
                <Route path="returnBook/:callNumberId/:borrowerId" component={ReturnBook}/>
                <Route path=":ownerId" component={Library}/>
            </Route>
        </Router>
    </Provider>
), rootElement);