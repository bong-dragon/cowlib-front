import React from 'react';
import 'whatwg-fetch';
import SearchBook from './library/SearchBook'
import {parseJson, handleError} from '../support/Ajax'
import {addBook} from '../action';

import {connect} from 'react-redux';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            q: '',
            searchList: []
        };
    }

    handleChange(e) {
        this.setState({q: e.target.value});
    }

    handleAddCallNumber(id) {
        let searchList = this.state.searchList;

        searchList.forEach(function (bookMeta) {
            if (bookMeta.id == id) {
                console.log(`bookMeta: ${bookMeta.id}, bookId:${id}`);
                let ownerId = this.props.userId;
                let bookMetaId = bookMeta.id;
                let url = `/v1/callNumbers?ownerId=${ownerId}&bookMetaId=${bookMetaId}`;

                fetch(url, {
                    credentials: 'include',
                    method: 'post'
                }).then(parseJson)
                    .then((callNumber) => {
                        bookMeta.isInserted = true;
                        this.setState({
                            searchList: searchList
                        });
                        this.props.addBook({
                            bookMeta: bookMeta,
                            callNumber: callNumber
                        });
                    })
                    .catch(handleError);
            }
        }.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        let q = this.state.q;
        console.log(q);

        let response = await fetch(`/v1/bookMetas/search/?q=${q}`, {
            credentials: 'include',
            method: 'get'
        }).catch(handleError);

        let searchList = await response.json();

        console.log(searchList);
        this.setState({searchList: searchList});
    }

    render() {
        var searchList = !!this.state.searchList.length ? this.state.searchList.map(function (book, i) {
            return <SearchBook key={i} book={book} onClick={this.handleAddCallNumber.bind(this, book.id)}/>
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
                    {searchList}
                </ul>
            </section>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addBook: (book) => dispatch(addBook(book))
    };
};

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    };
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;