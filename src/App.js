import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Header from './section/Header';
// import Auth from './util/Auth';

export default class App extends React.Component {
    //
    // constructor() {
    //     super();
    //     this.state = {
    //         loggedIn: Auth.loggedIn()
    //     }
    // }
    //
    // updateAuth(loggedIn) {
    //     this.setState({
    //         loggedIn: !!loggedIn
    //     })
    // }

    // componentWillMount() {
    //     Auth.onChange = this.updateAuth.bind(this);
    // }
    // <Header loggedIn={this.state.loggedIn}/>
    
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
