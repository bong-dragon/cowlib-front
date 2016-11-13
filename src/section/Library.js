import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import OwnerBook from './library/OwnerBook'
import 'whatwg-fetch';
import {Link} from 'react-router';

var booksSample = [{
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test1.jpeg",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "",
            name: "이경륜"
        }
    ]

}, {
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test2.jpeg",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "/img/basic_profile.png",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "/img/basic_profile.png",
            name: "이경륜"
        }
    ]

}, {
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test3.jpeg",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "/img/basic_profile.png",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "/img/basic_profile.png",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "/img/basic_profile.png",
            name: "이경륜"
        }
    ]

}, {
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test2.jpeg",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "",
            name: "이경륜"
        }
    ]

}, {
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test6.png",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "",
            name: "이경륜"
        }
    ]

}, {
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test5.png",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "",
            name: "이경륜"
        }
    ]

}, {
    id: 123123,
    title: "콩고",
    link: "http://book.daum.net/detail/book.do?bookid=BOK0001631788811",
    cover_l_url: "/img/test4.png",
    author: "이경륜",
    publisher: "jb출판",
    borrow: {
        id: 1234,
        profile: "",
        name: "이경륜"
    },
    wait_list: [
        {
            id: 1234,
            profile: "",
            name: "이경륜"
        }, {
            id: 1234,
            profile: "",
            name: "이경륜"
        }
    ]

}];
export default class Library extends React.Component {

    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    async componentDidMount() {

        let response = await fetch('/books', {
            method: 'get'
        }).catch(function (err) {
            // Error :
        });

        let body = await response.json();
        this.setState({
            books: body
        });

    }

    renderWaitList(wait_list) {
        return "list"
    }

    render() {
        var books = this.state.books;
        var no_borrow = "없음";
        var no_waitlist = "없음";

        var newbook = booksSample.map(function (book, i) {
            return <OwnerBook book={book}/>
        });
        return (
            <section>
                <div className="">
                    <Link to={{
                        pathname: '/search',
                       state: { modal: true, returnTo: this.props.location.pathname }
                    }}>추가하기</Link>
                </div>
                <ul className="books">
                    {newbook}
                </ul>
            </section>
        )
    }


}
