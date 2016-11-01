import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Auth from '../util/Auth';
import {login} from '../actions';
import {connect} from 'react-redux';


 class AuthRe extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        var loginButton = <Button type="button" onClick={this.props.handleLogin("value")}>로그인</Button>
        var logoutButton = <Button type="button" onClick={this.handleLogout.bind(this)}>로그아웃</Button>
        var button = this.props.loggedIn? logoutButton: loginButton;
        return (
            <div>
                {button}
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (value) => dispatch(login(value))
    };
};

AuthRe = connect(null, mapDispatchToProps)(AuthRe);

