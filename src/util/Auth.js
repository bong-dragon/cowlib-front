import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
// import Auth from '../util/Auth';
import {login, logout} from '../action';
import {connect} from 'react-redux';


class Auth extends React.Component {

    
    constructor() {
        super();
        this.state = {
            id : 0
        }
    }

    handleLogin(){
        this.props.handleLogin(this.state.id);
    }

    handleLogout(){
        this.props.handleLogout();
    }

    increase(){
        this.setState({
            id: ++this.state.id
        });    
    }
    
    render() {
        var loginButton = <Button type="button" onClick={this.handleLogin.bind(this)}>로그인</Button>
        var incButton = <Button type="button" onClick={this.increase.bind(this)}>숫자올리기</Button>
        var logoutButton = <Button type="button" onClick={this.handleLogout.bind(this)}>로그아웃</Button>


        // var logoutButton = <Button type="button" onClick={this.handleLogout.bind(this)}>로그아웃</Button>
        var button = !!this.props.user_id? logoutButton: loginButton;

        return (
            <div>
                {button}
                {incButton}
                <div>{this.state.id}</div>
                <div>{this.props.user_id}</div>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (value) => dispatch(login(value)),
        handleLogout: () => dispatch(logout())
    };
};


let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

export default Auth = connect(mapStateToProps, mapDispatchToProps)(Auth);

