import React from 'react';
import 'whatwg-fetch';


export default class Search extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {value: ''};
	}

	handleChange(e) {
		this.setState({value: event.target.value});
	} 

	handleSubmit(e) {
		e.preventDefault();
		let response = await fetch('/auth/', {
		    credentials: 'include',
		    method: 'get'
		}).catch(function (err) {

		    console.log("we got erreo");
		    console.log(err);
		})
		let body = await response.json();
		console.log(body);
	}

    render() {
        return (
            <section>
            	<div className="searchContainer">
            		<form onSubmit={this.handleSubmit}>
            		<input 
            			type="text" 
            			placeholder="검색" 
            			value={this.state.value} 
            			onChange={this.handleChange.bind(this)}
            		/>
            		<button></button>
            		</form>
            	</div>
            	<ul>
            		<li>새책!!!</li>
            		<li>새책!!!</li>
            		<li>새책!!!</li>
            		<li>새책!!!</li>
            		<li>새책!!!</li>
            		<li>새책!!!</li>
            	</ul>
            </section>
        )
    }
}
