import React from 'react';
import 'whatwg-fetch';
import Header from './section/Header';
import { getAuthInfo } from './action';
import { connect } from 'react-redux';

class App extends React.Component {

    async componentWillMount() {
        let response = await fetch('/auth/', {
            credentials: 'include',
            method: 'get'
        }).catch(function (err) {

            console.log("we got erreo");
            console.log(err);
        })
        let body = await response.json();
        this.props.syncAuthInfo(body);
    }

    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        syncAuthInfo: (value) => dispatch(getAuthInfo(value))
    };
};

App = connect(null, mapDispatchToProps)(App);

export default App;