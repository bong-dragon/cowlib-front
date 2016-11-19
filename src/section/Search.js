import React from 'react';
import 'whatwg-fetch';

import {connect} from 'react-redux';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            q: '',
            search_list: []
        };
    }

    handleChange(e) {
        this.setState({q: e.target.value});
    }

    handleAddCallNumber(isbn) {
        let search_list = this.state.search_list;
        search_list.forEach(function (book) {
            if (book.isbn == isbn) {
                let ownerId = this.props.user_id;
                let bookMetaId = book.id;
                let url = `/v1/libs/${ownerId}/callNumber?bookMetaId=${bookMetaId}`;
                fetch(url, {
                    credentials: 'include',
                    method: 'post'
                }).then((response) => response.json())
                    .then((responseJson) => {
                        book.isInserted = true;
                        this.setState({
                            search_list: search_list
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        let q = this.state.q;
        console.log(q);
        this.props.profile

        let response = await fetch(`/v1/bookMetas/search/?q=${q}`, {
            credentials: 'include',
            method: 'get'
        }).catch(function (err) {
            console.log("we got erreo");
            console.log(err);
        })
        let body = await response.json();
        console.log(body);
        this.setState({search_list: body});
    }

    render() {
        var search_list = !!this.state.search_list.length ? this.state.search_list.map(function (book, i) {
            var title = book.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            var book_img = book.coverUrl? book.coverUrl : '/img/basic_book.png';
            var button = book.isInserted ? <span>이미 추가되었습니다</span> : <button className="button" onClick={this.handleAddCallNumber.bind(this, book.isbn)}>추가 하기</button>;
            return (<li key={book.isbn}>
                <div className="book_img book_img_samll">
                    <img className="book_img book_img_samll" src={book_img} alt={book.coverUrl}/>
                </div>
                <div className="info">
                    <p dangerouslySetInnerHTML={{__html: title}}/>
                    <p><span>{book.author}</span> | <span>{book.publisher}</span></p>
                    {button}
                </div>
            </li>)
        }.bind(this)) : (<li>검색 결과가 없습니다.</li>);

        return (
            <section>
                <div className="searchContainer">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            placeholder="검색"
                            value={this.state.q}
                            onChange={this.handleChange.bind(this)}
                        />
                        <button></button>
                    </form>
                </div>
                <ul className="searchResults books">
                    {search_list}
                </ul>
            </section>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        user_id: state.auth.user_id
    };
};

Search = connect(mapStateToProps)(Search);

export default Search;