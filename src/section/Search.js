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
       

        var search_list = !!this.state.search_list.length?this.state.search_list.map(function (book, i) {
            var title = book.title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            return (<li dangerouslySetInnerHTML={{__html: title}}></li>)
        }): (<li>검색 결과가 없습니다.</li>);

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
            	<ul>
                    {search_list}
            	</ul>
            </section>
        )
    }
}
