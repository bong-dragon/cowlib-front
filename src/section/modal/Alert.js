import React from 'react';
import 'whatwg-fetch';
import SearchBook from '../library/SearchBook'
import {parseJson, handleError} from '../../support/Ajax'
import {addBook} from '../../action';
import {Link} from 'react-router';
import {_} from 'underscore'

import {connect} from 'react-redux';

class Alert extends React.Component {

    sample() {
        return [
            {
                "who": {
                    "id": 123,
                    "name": "이경륜",
                    "profile": "test.png"
                },
                "what": {
                    "callNumber" : {
                        id: 1234
                    },
                    "reservers" : {}
                },
                "when": "2016.12.14"
            }, {
                "who": {
                    "id": 123,
                    "name": "이경륜",
                    "profile": "test.png"
                },
                "what": {
                    "callNumber" : {
                        id: 1234
                    },
                    "reservers" : {}
                },
                "when": "2016.12.14"
            }

        ]
    }


    render() {
        let testData = this.sample();
        let msg_ui = testData.map(function (msg, i) {
            return (<li key={i}>
                <span>책 빌려달래요.</span>
                <Link to="/1#book25">빌려달레요</Link>
                {msg.who.id}
            </li>)

        })

        return (
            <section>
                <div className="alertContainer">
                    <ul>
                       {msg_ui}
                    </ul>
                </div>
            </section>
        )
    }
}


let mapStateToProps = (state) => {
        return {
            user: state.auth
        };
    };

Alert = connect(mapStateToProps, null)(Alert);

export default Alert;