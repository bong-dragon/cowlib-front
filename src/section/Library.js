import React from 'react';
import OwnerBook from './library/OwnerBook'
import GuestBook from './library/GuestBook'
import {getBooks} from '../action';
import 'whatwg-fetch';
import {handleError} from '../support/Ajax'

import {Link} from 'react-router';
import {connect} from 'react-redux';



class Library extends React.Component {

    constructor() {
        super();
    }

    async componentWillMount() {
        let ownerId = this.props.params.ownerId;
        let response = await fetch(`/v1/books?ownerId=${ownerId}`, {
            credentials: 'include',
            method: 'get'
        }).catch(handleError);

        let body = await response.json();
        this.props.getBooks(body);
    }

    render() {
        let books = this.props.books;
        let books_ui = "도서관에 책이 없어요. 책을 추가해 주세요";
        let ownerId = this.props.params.ownerId;
        let userId = this.props.user_id;
        let isOwner = (userId && ownerId == userId) ? true : false;

        if (books.length > 0) {
            console.log(books);
            if (isOwner) {
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
                    {isOwner && (<Link to={{
                        pathname: '/search',
                       state: { modal: true, returnTo: this.props.location.pathname }
                    }}>추가하기</Link>)}
                </div>
                <ul className="books">
                    {books_ui}
                </ul>
            </section>
        )
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getBooks: (books) => dispatch(getBooks(books))
    };
};

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id,
        books: state.shelves.books
    };
};

export default Library = connect(mapStateToProps, mapDispatchToProps)(Library);