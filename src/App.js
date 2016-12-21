import React from 'react';
import 'whatwg-fetch';
import Header from './section/Header';
import {getAuthInfo} from './action';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { browserHistory } from 'react-router'

const Modal = React.createClass({
    styles: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: 20,
        paddingTop: '13%',
        background: 'rgba(0, 0, 0, 0.5)'
    },
    contentStyles: {
        width: '100%',
        height: '100%',
        padding: 20,
        overflow: 'auto',
        background: '#fff'
    },
    goBack(e) {
        e.stopPropagation();
        browserHistory.goBack();
        console.log(this.props);
        console.log(e);
    },
    stopPropagation(e){
        e.stopPropagation();
    },
    render() {
        return (
                <div className="modalContainer" style={this.styles} onClick={this.goBack}>
                    <div style={this.contentStyles} onClick={this.stopPropagation}>
                        <p className="backButton"><Link to={this.props.returnTo}>Back</Link></p>
                        {React.cloneElement(this.props.children, {...this.props})}
                    </div>
                </div>
        )
    }
});

class App extends React.Component {

    async componentWillMount() {
        let response = await fetch('/auth/', {
            credentials: 'include',
            method: 'get'
        }).catch(err => {
            console.log(err);
        });

        let body = await response.json();
        console.log(`hello ${body.name}`);
        this.props.syncAuthInfo(body);
    }

    componentWillReceiveProps(nextProps) {
        // if we changed routes...
        if ((
                nextProps.location.key !== this.props.location.key &&
                nextProps.location.state &&
                nextProps.location.state.modal
            )) {
            // save the old children (just like animation)
            this.previousChildren = this.props.children
        }
    }

    render() {
        let {location} = this.props;

        let isModal = (
            location.state &&
            location.state.modal &&
            this.previousChildren
        );

        return (<div>
                <Header/>
                {isModal ? this.previousChildren : this.props.children}
                {isModal && (
                    <Modal isOpen={true} returnTo={location.state.returnTo}>
                        {this.props.children}
                    </Modal>
                )}
            </div>)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        syncAuthInfo: (value) => dispatch(getAuthInfo(value))
    };
};

App = connect(null, mapDispatchToProps)(App);

export default App;