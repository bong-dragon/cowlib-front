import React from 'react';
import 'whatwg-fetch';


export default class Search extends React.Component {

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
        this.state.search_list.forEach(function (book) {
            if (book.isbn == isbn) {
                let ownerId = "1242";
                fetch(`/v1/libs/${ownerId}/callNumber`, {
                    credentials: 'include',
                    method: 'post'
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let q = this.state.q;
        console.log(q);


        let response = await fetch(`/v1/books/search/?q=${q}`, {
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
            return (<li key={book.isbn}>
                <div className="book_img book_img_samll">
                    <img className="book_img book_img_samll" src={book.coverUrl} alt={title}/>
                </div>
                <div className="info">
                    <p dangerouslySetInnerHTML={{__html: title}}/>
                    <p><span>{book.author}</span> | <span>{book.publisher}</span></p>
                    <button className="button" onClick={this.handleAddCallNumber.bind(this, book.isbn)}>추가 하기</button>
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
