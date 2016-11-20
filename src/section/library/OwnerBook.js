import React from 'react';

import {connect} from 'react-redux';


class OwnerBook extends React.Component {

    render() {
        var book = this.props.book;
        var title = book.bookMeta.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var book_img = book.bookMeta.coverUrl ? book.bookMeta.coverUrl : '/img/basic_book.png';

        var reserver_list = book.reservers ? book.reservers.map(function (reserver, i) {
            return (<li key={i}>{reserver.waiterId}</li>)
        }) : '';
        var borrow = book.borrower ? (<span>{book.borrower.name}</span>) : '';
        
        return (<li>
            <div className="book_img">
                <img className="book_img" src={book_img} alt={title}/>
            </div>
            <div className="info">
                <p dangerouslySetInnerHTML={{__html: title}} className="book_title"/>
                <p><span>{book.bookMeta.author}</span> | <span>{book.bookMeta.publisher}</span></p>
                <p>읽고있어요 : {borrow} </p>
                <ul>읽고싶어요 : {reserver_list}</ul>
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
