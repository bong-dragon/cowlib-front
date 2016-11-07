import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';


export default class Main extends React.Component {

    render() {
        return (
            <section>
                <img className="guide" src="/img/guide.png" alt="가이드페이지"/>
            </section>
        )
    }
}
