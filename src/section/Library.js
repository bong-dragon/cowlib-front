import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import OwnerBook from './library/OwnerBook'
import GuestBook from './library/GuestBook'
import 'whatwg-fetch';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Library extends React.Component {

    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    async componentWillMount() {
        let ownerId = this.props.params.ownerId;
        let response = await fetch(`/v1/books?ownerId=${ownerId}`, {
            credentials: 'include',
            method: 'get'
        }).catch(function (err) {
            console.log(`get error, ${err}`);
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

        var books_ui = "도서관에 책이 없어요. 책을 추가해 주세요";

        if(books.length > 0) {
            console.log(books);
            console.log(this.props.user_id);

            if(this.props.user_id) {
                books_ui = books.map(function (book, i) {
                    return <OwnerBook key={i} book={book}/>
                });
            } else {
                books_ui = books.map(function (book, i) {
                    return <GuestBook key={i} book={book}/>
                });
            }
        }

        return (
            <section>
                <div className="">
                    <Link to={{
                        pathname: '/search',
                       state: { modal: true, returnTo: this.props.location.pathname }
                    }}>추가하기</Link>
                </div>
                <ul className="books">
                    {books_ui}
                </ul>
            </section>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

export default Library = connect(mapStateToProps)(Library);
