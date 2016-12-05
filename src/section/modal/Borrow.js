import React from 'react';

import 'whatwg-fetch';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {_} from 'underscore'

import {parseJson, handleError} from '../../support/Ajax'
import {borrowBook} from '../../action';


class Borrow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "BEFORE_BORROW"
        };
    }

    borrowBook() {
        let callNumberId = this.props.params.callNumberId;
        let borrowerId = this.props.params.reserverId;

        let url = `/v1/callNumbers/${callNumberId}/borrow?borrowerId=${borrowerId}`;

        fetch(url, {
            credentials: 'include',
            method: 'post'
        }).then(parseJson)
            .then((borrow) => {
                this.setState({
                    status: "AFTER_BORROW"
                });

                this.props.borrowBook(borrow);
            })
            .catch(handleError);
    }

    returnBook() {
        let callNumberId = this.props.params.callNumberId;
        let borrowerId = this.props.params.reserverId;
        console.log("빌려줌 취소")
    }

    render() {
        let callNumberId = this.props.params.callNumberId;
        let reserverId = this.props.params.reserverId;
        let books = this.props.books;

        if (books.length == 0) {
            if (this.props.userId) {
                let pathname = "/" + this.props.userId;
                // 나중에 로딩중 표시 하고, 서버 갔다오면 좋을듯!
                return (<section>
                    <p>잘못된 경로로 접근하셨습니다</p>
                    <Link to={pathname}>내 도서관으로</Link></section>);
            } else {
                return (<section>
                    <p>잘못된 경로로 접근하셨습니다</p>
                    <Link to="/">홈으로</Link></section>);
            }
        }

        let book = _.find(books, function (book) {
            return book.callNumber && book.callNumber.id == callNumberId
        });
        let bookMeta = book.bookMeta;
        let title = bookMeta.title.replace(/&lt;/g, "").replace(/&gt;/g, "");
        let bookImage = bookMeta.coverUrl ? bookMeta.coverUrl : '/img/basic_book.png';

        let actionWrapper = this.createActionWrapper(book, reserverId);

        return (<section className="borrowContainer">
            <div className="bookContainer">
                <div className="book_img book_img_samll">
                    <img className="book_img book_img_samll" src={bookImage} alt={bookMeta.coverUrl}/>
                </div>
                <div className="info">
                    <p dangerouslySetInnerHTML={{__html: title}}/>
                    <p><span>{bookMeta.author}</span> | <span>{bookMeta.publisher}</span></p>
                </div>
            </div>
            {actionWrapper}
        </section>);
    }

    createActionWrapper(book, reserverId) {
        if (this.state.status === "BEFORE_BORROW") {
            let reserver = _.find(book.reservers, function (reserver) {
                return reserver.id && reserver.id == reserverId
            });
            return (<div>
                <p className="messageContainer">
                    <img className="profile" src={reserver.profile} alt="profile"/>
                    <span>{reserver.name}</span>
                    <span> 에게 빌려주실 건가요?</span>
                </p>
                <p className="selectContainer">
                    <button className="button button_small">아니요</button>
                    <button className="button button_small" onClick={this.borrowBook.bind(this)}>네</button>
                </p>
            </div>);
        } else {
            let myLibrary = "/" + this.props.userId;
            return (<div>
                <p className="messageContainer">
                    <span>빌려줌 상태로 바뀌었습니다.</span>
                </p>
                <p className="selectContainer">
                    <button className="button button_small" onClick={this.returnBook.bind(this)}>빌려줌 취소</button>
                    <button className="button button_small"><Link to={myLibrary}>내도서관</Link></button>
                </p>
            </div>)
        }
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        borrowBook: (borrow) => dispatch(borrowBook(borrow))
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

