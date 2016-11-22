import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import {logout} from '../action';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class Auth extends React.Component {

    handleLogin() {
        var URL = "/auth/facebook";
        var title = "페이스북";
        var status = "scrollbars=no, status=no;";
        window.open(URL, title, status);
    }

    handleLogout(){
        this.props.handleLogout();
    }
    
    render() {
        var profile = this.props.profile? this.props.profile : "/img/basic_profile.png";
        var myLibrary = "/"+ this.props.user_id;

        var loginButton = <button onClick={this.handleLogin.bind(this)}><img src="/img/facebook.png"></img><span>로그인</span></button>
        var logoutButton = <button onClick={this.handleLogout.bind(this)}><span>로그아웃</span></button>
        var myLibraryButton = <Link to={myLibrary}><img className="profile" src={profile} alt="profile" /><span>내도서관</span></Link>
         
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

