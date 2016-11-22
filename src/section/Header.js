import React from 'react';
import 'whatwg-fetch';
import Auth from '../util/Auth';
import {Link} from 'react-router';


export default class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="title"><Link to="/">
                    <img src="/img/logo_small.png" alt="cowlib"/>
                    <span>소도서관</span>
                </Link></div>
                <Auth></Auth>
            </header>
        )
    }
}