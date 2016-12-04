import React from 'react';
import 'whatwg-fetch';
import SearchBook from '../library/SearchBook'
import {Link} from 'react-router';
import {parseJson, handleError} from '../../support/Ajax'
import {_} from 'underscore'

import {connect} from 'react-redux';

class Borrow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let callNumberId  = this.props.params.callNumberId;
        let reserverId = this.props.params.reserverId;
        let books = this.props.books;

        if (books.length == 0) {
            if (this.props.userId) {
                let pathname = "/"+this.props.userId;
                // 나중에 로딩중 표시 하고, 서버 갔다오면 좋을듯!
                return (<section>
                        <p>잘못된 경로로 접근하셨습니다</p>
                        <Link to={pathname}>내 도서관으로</Link></section>);
            }else {
                return (<section>
                        <p>잘못된 경로로 접근하셨습니다</p>
                        <Link to="/">홈으로</Link></section>);
            }
        }

        let book = _.find(books, function (one) {
                    return one.callNumber && one.callNumber.id == callNumberId
                });
        let bookMeta = book.bookMeta;
        let title = bookMeta.title.replace(/&lt;/g, "").replace(/&gt;/g, "");
        let book_img = bookMeta.coverUrl ? bookMeta.coverUrl : '/img/basic_book.png';

        let reserver = _.find(book.reservers, function (one) {
            return one.id && one.id == reserverId
        })

        return (<section className="borrowContainer">
                    <div className="bookContainer">
                        <div className="book_img book_img_samll">
                            <img className="book_img book_img_samll" src={book_img} alt={bookMeta.coverUrl}/>
                        </div>
                        <div className="info">
                            <p dangerouslySetInnerHTML={{__html: title}}/>
                            <p><span>{bookMeta.author}</span> | <span>{bookMeta.publisher}</span></p>
                        </div>
                    </div>
                    <p className="messageContainer">
                        <img className="profile" src={reserver.profile} alt="profile"/>
                        <span>{reserver.name}</span>
                        <span> 에게 빌려주실 건가요?</span>
                    </p>
                    <p className="selectContainer">
                        <button className="button button_small">네</button>
                        <button className="button button_small">아니요</button>
                    </p>
                </section>);
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    };
};

let mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        books: state.shelves.books
    };
};

Borrow = connect(mapStateToProps, mapDispatchToProps)(Borrow);

export default Borrow;

