import React from 'react';

import {connect} from 'react-redux';


class OwnerBook extends React.Component {
    render () {
    	var book = this.props.book;
        var title = book.bookMeta.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var book_img = book.bookMeta.coverUrl? book.bookMeta.coverUrl : '/img/basic_book.png';
        console.log(book);

    	var wait_list = book.waits.map(function (waiter, i) {
            return (<li key={i}>{waiter.waiterId}</li>)
    	})
        var borrow_list = book.borrows.map((borrow, i) => {
            return (<span key={i}>{borrow.borrowerId}</span>)
        })
        return (<li key={book.bookMeta.id}>
                    <div className="book_img">
                        <img className="book_img" src={book_img} alt={title} />
                    </div>
                    <div className="info">
                        <p dangerouslySetInnerHTML={{__html: title}} className="book_title" />
                        <p><span>{book.bookMeta.author}</span> | <span>{book.bookMeta.publisher}</span></p>
                        <p>읽고있어요 : {borrow_list} </p>
                        <ul>읽고싶어요 : {wait_list}</ul>
                    </div>
                </li>)
    }

    //render () {
    //	var book = this.props.book;
    //	var wait_list = book.waits.map(function (waiter, i) {
    //		return (<li key={i}><span>{waiter.name}</span><img className="profile" src={waiter.profile} /></li>)
    //	})
    //    return (<li>
    //                <div className="book_img">
    //                    <img className="book_img" src={book.cover_l_url} alt={book.title} />
    //                </div>
    //                <div className="info">
    //                    <p dangerouslySetInnerHTML={{__html: book.title}} className="book_title" />
    //                    <p><span>{book.author}</span> | <span>{book.publisher}</span></p>
    //                    <p>읽고있어요 : {book.borrow.name? book.borrow.name:no_borrow}</p>
    //                    <ul>읽고싶어요 : {wait_list}</ul>
    //                </div>
    //            </li>)
    //}
}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

OwnerBook = connect(mapStateToProps)(OwnerBook);

export default OwnerBook;
