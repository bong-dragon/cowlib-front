import React from 'react';

import {handleError} from '../../support/Ajax'
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {deleteBook} from '../../action';
import {Link} from 'react-router';

class OwnerBook extends React.Component {

    async deleteBook(book) {
        let callNumberId = book.callNumber.id;

        let response = await fetch(`/v1/callNumbers?id=${callNumberId}`, {
            credentials: 'include',
            method: 'delete'
        }).catch(handleError);

        let callNumber = await response.json();
        this.props.deleteBook(callNumber);
    }

    render() {
        let returnTo = this.props.pathname;
        let book = this.props.book;
        let title = book.bookMeta.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        let bookImage = book.bookMeta.coverUrl ? book.bookMeta.coverUrl : '/img/basic_book.png';

        let reservers = book.reservers ? book.reservers.map((reserver, i) => {
            let callNumberId = book.callNumber.id;
            let reserverId = reserver.id;
            return (<Link key={i} to={{
                pathname: `/borrow/${callNumberId}/${reserverId}`,
                state: {modal: true, returnTo: returnTo}
            }}><img className="profile" src={reserver.profile}/><span className="userName">{reserver.name}</span></Link>)
        }) : '';

        let hasBorrower = book.borrower && (!book.borrower.status || book.borrower.status == "OWNER_BORROW_BOOK") ? true : false;
        let borrower = hasBorrower ? (() => {
            let callNumberId = book.callNumber.id;
            let borrowerId = book.borrower.id;
            return (<Link to={{
                pathname: `/returnBook/${callNumberId}/${borrowerId}`,
                state: {modal: true, returnTo: returnTo}
            }}><img className="profile" src={book.borrower.profile}/><div className="userName">{book.borrower.name}</div></Link>)
        })() : '';

        return (<li className="bookContainer">
            <div className="book_img">
                <img className="book_img" src={bookImage} alt={title}/>
            </div>
            <div className="info">
                <p dangerouslySetInnerHTML={{__html: title}} className="book_title"/>
                <p><span>{book.bookMeta.author}</span> | <span>{book.bookMeta.publisher}</span></p>
                <p>읽고있어요 : {borrower} </p>
                <p>읽고싶어요 : {reservers}</p>
                <button className="button" onClick={this.deleteBook.bind(this, book)}>삭제하기</button>
            </div>
        </li>)
    }

}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.id
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        deleteBook: (callNumber) => dispatch(deleteBook(callNumber))
    };
};

export default OwnerBook = connect(mapStateToProps, mapDispatchToProps)(OwnerBook);
