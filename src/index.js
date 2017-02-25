import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Timetable from './Timetable';
import Bookings from './Bookings';
import Header from './Header';
import Facilities from './Facility';
import Rooms from './Rooms';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isSignedIn: true
    };
  }
  
  componentDidMount() {
    
    ((d, s, id, cb) => {
      
      //Insert Google login script
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/client:platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
      
    })(document, 'script', 'google-login', () => {
      
      //Load the auth2 module
      window.gapi.load('auth2', () => {
        
        //Init it if not already
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init({
            client_id: '495799513982-tpkrc290lcs3c02s1e1d0s8vdosp9n38.apps.googleusercontent.com',
            hosted_domain: 'tcd.ie',
            scope: 'profile'
          });
        }
        
        if(!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          window.gapi.signin2.render('signIn', {
            'onsuccess': this.onSignIn,
            'onfailure': (e) => {console.log(e)}
          });
        }
        
        window.gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn) => {
          this.setState({
            isSignedIn: signedIn
          });
        });
      });
    });
  }
    
  onSignIn(googleUser) {

  }

  render() {
    return (
      <div>
      <Header isSignedIn={this.state.isSignedIn}/>
      {this.props.children}
      </div>
    );
  }
}

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Facilities}/>
      <Route path='bookings' component={Bookings}/>
      <Route path=':facility/:time' component={Rooms}/>
      <Route path=':facility' component={Timetable}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
