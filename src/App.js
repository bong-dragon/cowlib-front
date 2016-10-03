import React from 'react';
import {Thumbnail, Button, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap';


export default class App extends React.Component {

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
        var newbook= books.map(function (book, i) {
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
            <Grid>
                <Row>
                    {newbook}
                </Row>
            </Grid>
        )
    }
}
