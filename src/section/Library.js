import React from 'react';
import Clipboard from "react-clipboard.js";
import OwnerBook from './library/OwnerBook'
import GuestBook from './library/GuestBook'
import {getBooks} from '../action';
import 'whatwg-fetch';
import {handleError} from '../support/Ajax'

import {Link} from 'react-router';
import {connect} from 'react-redux';

const LOADING = "LOADING";
const LOADED = "LOADED"

class Library extends React.Component {

    constructor() {
        super();
        this.state = {
            status: LOADING,
            owner: {}
        };
    }

    async getBooks(ownerId) {
        let response = await fetch(`/v1/libraries/${ownerId}`, {
            credentials: 'include',
            method: 'get'
        }).catch(handleError);

        let body = await response.json();
        this.setState({status: LOADED, owner: body.owner});
        this.props.getBooks(body.books);
    }

    handleCopy(e){
        alert("도서관 URL 이 복사되었습니다.");
    }

    componentWillMount() {
        this.getBooks(this.props.params.ownerId);
    }

    componentWillReceiveProps(nextProps) {
        let lastOwnerId = this.props.params.ownerId;
        let recentOwnerId = nextProps.params.ownerId;
        if(lastOwnerId !== recentOwnerId){
            console.log(`${lastOwnerId} -> ${recentOwnerId}`);
            this.getBooks(recentOwnerId);
        }   
    }

    render() {
        if (this.state.status == LOADING) {
            return (<section>
                <div className="titleContainer">
                </div>
                <div className="contentContainer">
                    <p>로딩중 입니다.</p>
                </div>
            </section>);
        }

        let books = this.props.books;
        let books_ui;
        let owner = this.state.owner;
        let userId = this.props.user_id;
        let isOwner = (userId && userId == owner.id) ? true : false;
        let pathname = this.props.location.pathname;


        if (books.length > 0) {
            console.log(books);
            if (isOwner) {
                books_ui = books.map(function (book, i) {
                    let assignBook = Object.assign({}, book);
                    return <OwnerBook pathname={pathname} key={i} book={assignBook}/>
                });
            } else {
                books_ui = books.map(function (book, i) {
                    let assignBook = Object.assign({}, book);
                    return <GuestBook key={i} book={assignBook}/>
                });
            }
        }
        return (
            <section>
                <div className="titleContainer">
                    <img className="profile" src={owner.profile} alt="profile" />
                    <h1 className="libraryName">{owner.name} 도서관</h1>
                    <Clipboard className="clipboard" data-clipboard-text={location.href} onSuccess={this.handleCopy}>URL 복사</Clipboard>
                </div>
                <div className="contentContainer">
                    <div className="searchModalOpenButton">
                        {isOwner && (<Link to={{
                            pathname: '/search',
                       state: { modal: true, returnTo: pathname }
                        }}>추가하기</Link>)}
                    </div>
                    {books.length > 0? (<ul className="books">{books_ui}</ul>): (<p>도서관에 책이 없어요.</p>)}
                </div>
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
        user_id: state.auth.id,
        books: state.shelves.books
    };
};

export default Library = connect(mapStateToProps, mapDispatchToProps)(Library);