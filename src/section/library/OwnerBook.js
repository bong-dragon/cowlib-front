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

    handleBorrower(book){
        console.log("반납 처리 하시겠습니까?");
        console.log(book);
    }

    handleReserver(book){
        console.log("빌려주실 건가요?");
        console.log(book);
    }

    render() {
        var book = this.props.book;
        var title = book.bookMeta.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var book_img = book.bookMeta.coverUrl ? book.bookMeta.coverUrl : '/img/basic_book.png';

        var handleReserver = this.handleReserver.bind(this, book);
        var pathname = this.props.pathname;

        var reserver_list = book.reservers ? book.reservers.map( (reserver, i) => {
            return (<Link key={i} to={{
                    pathname: '/search',
                    state: { modal: true, returnTo: pathname}
                }}><img src={reserver.profile} /><span>{reserver.name}</span></Link>)
        }) : '';
        var borrow = book.borrower ? (<button onClick={this.handleBorrower.bind(this, book)}>{book.borrower.name}</button>) : '';
        
        return (<li>
            <div className="book_img">
                <img className="book_img" src={book_img} alt={title}/>
            </div>
            <div className="info">
                <p dangerouslySetInnerHTML={{__html: title}} className="book_title"/>
                <p><span>{book.bookMeta.author}</span> | <span>{book.bookMeta.publisher}</span></p>
                <p>읽고있어요 : {borrow} </p>
                <p>읽고싶어요 : {reserver_list}</p>
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
