import React from 'react';

import {connect} from 'react-redux';


class OwnerBook extends React.Component {

    deleteBook(book) {

        console.log(book);
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
                <button className="button" onClick={this.deleteBook.bind(this, book)}>삭제하기</button>
            </div>
        </li>)
    }

}

let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

OwnerBook = connect(mapStateToProps)(OwnerBook);

export default OwnerBook;