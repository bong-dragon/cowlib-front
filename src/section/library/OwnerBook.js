import React from 'react';

import {handleError} from '../../support/Ajax'
import {connect} from 'react-redux';
import 'whatwg-fetch';
import {deleteCallNumber} from '../../action';

class OwnerBook extends React.Component {

    async deleteCallNumber(book) {
        let callNumberId = book.callNumber.id;

        let response = await fetch(`/v1/callNumbers?id=${callNumberId}`, {
            credentials: 'include',
            method: 'delete'
        }).catch(handleError);

        let body = await response.json();
        this.props.deleteCallNumber(body);
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
        var reserver_list = book.reservers ? book.reservers.map(function (reserver, i) {
            return (<button onClick={handleReserver} key={i}>{reserver.waiterId}</button>)
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
                <button className="button" onClick={this.deleteCallNumber.bind(this, book)}>삭제하기</button>
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
        deleteCallNumber: (callNumber) => dispatch(deleteCallNumber(callNumber))
    };
};

export default OwnerBook = connect(mapStateToProps, mapDispatchToProps)(OwnerBook);
