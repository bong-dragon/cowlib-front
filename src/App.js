import React from 'react';
import 'whatwg-fetch';
import Header from './section/Header';
import { getAuthInfo } from './action';
import { connect } from 'react-redux';
import {Link} from 'react-router';

const Modal = React.createClass({
  styles: {
    position: 'fixed',
    top: '13%',
    right: '3%',
    bottom: '3%',
    left: '3%',
    padding: 20,
    boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
    background: '#fff'
  },

  render() {
    return (
      <div style={this.styles}>
        <p><Link to={this.props.returnTo}>Back</Link></p>
        {this.props.children}
      </div>
    )
  }
})

class App extends React.Component {

    async componentWillMount() {
        let response = await fetch('/auth/', {
            credentials: 'include',
            method: 'get'
        }).catch(function (err) {

            console.log("we got erreo");
            console.log(err);
        })
        let body = await response.json();
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
        let { location } = this.props

        let isModal = (
          location.state &&
          location.state.modal &&
          this.previousChildren
        )

        return (
            <div>
                <Header/>
                {isModal ?
                  this.previousChildren :
                  this.props.children
                }
                {isModal && (
                  <Modal isOpen={true} returnTo={location.state.returnTo}>
                    {this.props.children}
                  </Modal>
                )}
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        syncAuthInfo: (value) => dispatch(getAuthInfo(value))
    };
};

App = connect(null, mapDispatchToProps)(App);

export default App;