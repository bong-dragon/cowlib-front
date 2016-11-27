import React from 'react';

import {connect} from 'react-redux';
import {handleError} from '../../support/Ajax'
import 'whatwg-fetch';
import {reserveBook} from '../../action';

class GuestBook extends React.Component {

    async reserveBook(book) {
        let callNumberId = book.callNumber.id;

        let response = await fetch(`/v1/callNumbers/${callNumberId}/reserve`, {
            credentials: 'include',
            method: 'post'
        }).catch(handleError);

        let reserveHistory = await response.json();

        if (book.reservers) {
            book.reservers.push(this.props.user_id);
        }else {
            book.reservers = [this.props.user_id];
        }
        console.log(reserveHistory);
        this.props.reserveBook(reserveHistory);
    }

    render() {
        var book = this.props.book;
        var title = book.bookMeta.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var book_img = book.bookMeta.coverUrl ? book.bookMeta.coverUrl : '/img/basic_book.png';

        var reserverCount = book.reservers ? book.reservers.length : 0;
        var borrowMsg = book.borrower ? "누군가 읽고 있어요" : '아무도 안 읽고 있어요';

        return (<li>
            <div className="book_img">
                <img className="book_img" src={book_img} alt={title}/>
            </div>
            <div className="info">
                <p dangerouslySetInnerHTML={{__html: title}} className="book_title"/>
                <p><span>{book.bookMeta.author}</span> | <span>{book.bookMeta.publisher}</span></p>
                <p>{borrowMsg} </p>
                <ul>대기자수 : {reserverCount}</ul>
                <button className="button" onClick={this.reserveBook.bind(this, book)}>예약하기</button>
            </div>
        </li>)
    }

}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};


let mapDispatchToProps = (dispatch) => {
    return {
        reserveBook: (book) => dispatch(reserveBook(book))
    };
};

export default GuestBook = connect(mapStateToProps, mapDispatchToProps)(GuestBook);