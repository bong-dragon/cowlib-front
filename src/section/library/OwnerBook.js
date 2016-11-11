import React from 'react';

export default class OwnerBook extends React.Component {
    render () {
    	var book = this.props.book;
    	var wait_list = book.wait_list.map(function (waiter, i) {
    		return (<p><span>{waiter.name}</span><img className="profile" src={waiter.profile} /></p>)
    	})
        return (<li>
                    <img className="book_img" src={book.cover_l_url} alt={book.title}/>
                    <div className="info">
                        <p>제목 : {book.title}</p>
                        <p>빌려간사람 : {book.borrow.name? book.borrow.name:no_borrow}</p>
                        <p>대기자 : {wait_list}</p>
                    </div>
                </li>)
    }
}