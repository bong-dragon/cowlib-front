import React from 'react';

export default class OwnerBook extends React.Component {
    render () {
    	var book = this.props.book;
    	var wait_list = book.wait_list.map(function (waiter, i) {
    		return (<li><span>{waiter.name}</span><img className="profile" src={waiter.profile} /></li>)
    	})
        return (<li>
                    <div className="book_img">
                        <img className="book_img" src={book.cover_l_url} alt={book.title} />                    
                    </div>
                    <div className="info">
                        <p>제목 : {book.title}</p>
                        <p>빌려간사람 : {book.borrow.name? book.borrow.name:no_borrow}</p>
                        <ul>대기자 : {wait_list}</ul>
                    </div>
                </li>)
    }
}