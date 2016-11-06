import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Header from './section/Header';
import { isLogined } from './action';
import { connect } from 'react-redux';

class App extends React.Component {

    constructor() {

        super();
        this.state = {}
    }

    //
    // updateAuth(loggedIn) {
    //     this.setState({
    //         loggedIn: !!loggedIn
    //     })
    // }

    async componentWillMount() {
        let response = await fetch('/auth/', {
            credentials: 'include',
            method: 'get'
        }).catch(function (err) {

            console.log("we got erreo");
            console.log(err);
        })
        let body = await response.json();
        this.props.getAuthInfo(body);
    }

    render() {
        return (
            <div>
                <div>123123</div>
                <Header/>

                <div className="detail">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getAuthInfo: (value) => dispatch(isLogined(value))
    };
};
App = connect(null, mapDispatchToProps)(App);

export default App;