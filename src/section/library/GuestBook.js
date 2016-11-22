import React from 'react';

import {connect} from 'react-redux';


class GuestBook extends React.Component {

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
            </div>
        </li>)
    }

}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

GuestBook = connect(mapStateToProps)(GuestBook);

export default GuestBook;
