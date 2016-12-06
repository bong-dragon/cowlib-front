import React from 'react';

import 'whatwg-fetch';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {_} from 'underscore'

import {returnBook} from '../../action';
import {parseJson, handleError} from '../../support/Ajax'


class ReturnBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "BEFORE_RETURN"
        };
    }

    returnBook() {
        let callNumberId = this.props.params.callNumberId;
        let borrowerId = this.props.params.borrowerId;

        let url = `/v1/callNumbers/${callNumberId}/borrow?borrowerId=${borrowerId}`;

        fetch(url, {
            credentials: 'include',
            method: 'delete'
        }).then(parseJson)
            .then((borrow) => {
                this.setState({
                    status: "AFTER_RETURN"
                });
                this.props.returnBook(borrow);
            })
            .catch(handleError);
    }

    createActionWrapper(borrower) {
        let returnTo = this.props.returnTo;
        if (this.state.status === "BEFORE_RETURN") {
            return (<div>
                <p className="messageContainer">
                    <img className="profile" src={borrower.profile} alt="profile"/>
                    <span>{borrower.name}</span>
                    <span> 에게 책을 돌려받으셨나요?</span>
                </p>
                <p className="selectContainer">
                    <button className="button button_small"><Link to={returnTo}>아니요</Link></button>
                    <button className="button button_small" onClick={this.returnBook.bind(this)}>네</button>
                </p>
            </div>);
        } else {
            return (<div>
                <p className="messageContainer">
                    <span>반납함 상태로 바뀌었습니다.</span>
                </p>
                <p className="selectContainer">
                    <button className="button button_small">반납함 취소</button>
                    <button className="button button_small"><Link to={returnTo}>돌아가기</Link></button>
                </p>
            </div>);
        }
    }

    render() {
        let callNumberId = this.props.params.callNumberId;
        let borrowerId = this.props.params.borrowerId;
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
        let borrower = book.borrower;
        let title = bookMeta.title.replace(/&lt;/g, "").replace(/&gt;/g, "");
        let bookImage = bookMeta.coverUrl ? bookMeta.coverUrl : '/img/basic_book.png';

        let actionWrapper = this.createActionWrapper(borrower);

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
}

let mapDispatchToProps = (dispatch) => {
    return {
        returnBook: (borrow) => dispatch(returnBook(borrow))
    };
};


let mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        books: state.shelves.books
    };
};

ReturnBook = connect(mapStateToProps, mapDispatchToProps)(ReturnBook);

export default ReturnBook;

