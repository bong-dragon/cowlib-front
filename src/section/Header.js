import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Auth from '../util/Auth';
import {connect} from 'react-redux';


export default class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="title"><a href="/">소도서관</a></div>
                <Auth></Auth>
            </header>
        )
    }
}