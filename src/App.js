import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Header from './section/Header';


export default class App extends React.Component {
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
