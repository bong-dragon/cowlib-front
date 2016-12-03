import React from 'react';

import {connect} from 'react-redux';


export default class SearchBook extends React.Component {

    render() {
        let book = this.props.book;
        let title = book.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        let book_img = book.coverUrl ? book.coverUrl : '/img/basic_book.png';
        let button = book.isInserted ? <span>이미 추가되었습니다</span> :
            <button className="button" onClick={this.props.onClick}>추가 하기</button>;


        return (<li className="bookContainer" key={book.isbn}>
            <div className="book_img book_img_samll">
                <img className="book_img book_img_samll" src={book_img} alt={book.coverUrl}/>
            </div>
            <div className="info">
                <p dangerouslySetInnerHTML={{__html: title}}/>
                <p><span>{book.author}</span> | <span>{book.publisher}</span></p>
                {button}
            </div>
        </li>)
    }

}


