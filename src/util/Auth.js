import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import {login, logout} from '../action';
import {connect} from 'react-redux';


class Auth extends React.Component {

    handleLogin(){
        this.props.handleLogin();
    }

    handleLogout(){
        this.props.handleLogout();
    }
    
    render() {
        var loginButton = <Button type="button" onClick={this.handleLogin.bind(this)}>로그인</Button>
        var logoutButton = <Button type="button" onClick={this.handleLogout.bind(this)}>로그아웃</Button>
        var myLibrary = "/"+ this.props.user_id;
        var myLibraryButton = <a href={myLibrary}>내도서관<img className="profile" src={this.props.profile} alt="profile" /></a>
        var button = !!this.props.user_id? myLibraryButton: loginButton;

        return (
            <div className="auth">
                {button}
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: () => dispatch(login()),
        handleLogout: () => dispatch(logout())
    };
};


let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id,
        facebook_id: state.auth.facebook_id,
        profile: state.auth.profile,
        name: state.auth.name
    };
};

export default Auth = connect(mapStateToProps, mapDispatchToProps)(Auth);

