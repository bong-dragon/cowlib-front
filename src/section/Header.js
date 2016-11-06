import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';
import Auth from '../util/Auth';
import {connect} from 'react-redux';


export default class Header extends React.Component {

    render() {
        return (
            <div>
                <div>소도서관</div>
                <Auth></Auth>
            </div>
        )
    }
}