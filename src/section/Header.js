import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Auth from '../util/Auth';
import {connect} from 'react-redux';


class Header extends React.Component {
    
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        // var loginButton = <Button type="button" onClick={this.handleLogin.bind(this)}>로그인</Button>
        // var logoutButton = <Button type="button" onClick={this.handleLogout.bind(this)}>로그아웃</Button>
        // var button = this.props.loggedIn? logoutButton: loginButton;
        // {loginButton}
        return (
            <div>
                <Auth></Auth>
            </div>
        )
    }
    //
    // handleLogin() {
    //     Auth.login();
    // }
    //
    // handleLogout() {
    //     Auth.logout();
    // }
}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

Header = connect(mapStateToProps)(Header);

export default Header;
