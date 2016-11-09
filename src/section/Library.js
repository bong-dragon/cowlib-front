import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';
import 'whatwg-fetch';


export default class Library extends React.Component {

    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    async componentDidMount() {

        let response = await fetch('/books', {
            method: 'get'
        }).catch(function (err) {
            // Error :
        });

        let body = await response.json();
        this.setState({
            books: body
        });

    }

    render() {
        var books = this.state.books;
        var newbook = books.map(function (book, i) {
            return (
                <Col xs={6} md={4}>
                    <Thumbnail src={book.cover_url} alt="242x200">
                        <h3>Thumbnail label</h3>
                        <p>Description</p>
                        <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                        </p>
                    </Thumbnail>
                </Col>
            )

        });
        return (
            <section>
                <div className="">
                    <a href="#">추가하기</a>
                </div>
                <div>
                     {newbook}
                </div>
            </section>
        )
    }
    
    
}
