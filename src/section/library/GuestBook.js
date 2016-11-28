import React from 'react';

import {connect} from 'react-redux';
import {handleError} from '../../support/Ajax'
import 'whatwg-fetch';
import {reserveBook, cancelBook} from '../../action';
import {_} from 'underscore';

class GuestBook extends React.Component {

    async reserveBook(book) {
        let callNumberId = book.callNumber.id;

        let response = await fetch(`/v1/callNumbers/${callNumberId}/reserve`, {
            credentials: 'include',
            method: 'post'
        }).catch(handleError);

        let reserveHistory = await response.json();
        this.props.reserveBook(reserveHistory, this.props.user);
    }

    async cancelBook(book) {
        let callNumberId = book.callNumber.id;

        let response = await fetch(`/v1/callNumbers/${callNumberId}/reserve`, {
            credentials: 'include',
            method: 'delete'
        }).catch(handleError);

        let reserveHistory = await response.json();
        this.props.cancelBook(reserveHistory, this.props.user);
    }

    render() {
        console.log("render guest")
        var book = this.props.book;
        var title = book.bookMeta.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var book_img = book.bookMeta.coverUrl ? book.bookMeta.coverUrl : '/img/basic_book.png';

        var reserverCount = book.reservers ? book.reservers.length : 0;
        var borrowMsg = book.borrower ? "누군가 읽고 있어요" : '아무도 안 읽고 있어요';

        var isReserved = _.find(book.reservers, (reserver) => {
            return reserver.id === this.props.user_id;
        });
        let buttonForReserve = (<button className="button" onClick={this.reserveBook.bind(this, book)}>예약하기</button>)
        let buttonForCancel = (<button className="button" onClick={this.cancelBook.bind(this, book)}>취소하기</button>)
        let button = isReserved? buttonForCancel: buttonForReserve;

        console.log(book);
        console.log(isReserved? "i'm": "not");
        return (<li>
            <div className="book_img">
                <img className="book_img" src={book_img} alt={title}/>
            </div>
            <div className="info">
                <p dangerouslySetInnerHTML={{__html: title}} className="book_title"/>
                <p><span>{book.bookMeta.author}</span> | <span>{book.bookMeta.publisher}</span></p>
                <p>{borrowMsg} </p>
                <ul>대기자수 : {reserverCount}</ul>
                {button}
            </div>
        </li>)
    }

}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.id,
        user: state.auth
    };
};


let mapDispatchToProps = (dispatch) => {
    return {
        reserveBook: (book, user) => dispatch(reserveBook(book, user)),
        cancelBook: (book, user) => dispatch(cancelBook(book, user))
    };
};

export default GuestBook = connect(mapStateToProps, mapDispatchToProps)(GuestBook);