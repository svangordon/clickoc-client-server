import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton } from 'components';
// import {bindActionCreators} from 'redux';
// import config from '../../config';
import Helmet from 'react-helmet';
// import {connect} from 'react-redux';
// import {load as loadUser} from 'redux/modules/user';
// import {test} from 'redux/modules/apiTest';
// import {push} from 'react-router-redux';
// import { isLoaded as isAuthLoaded } from 'redux/modules/auth';

export default class SetLocation extends Component {
  static propTypes = {
    router: PropTypes.func
  }
  // componentWillMount() {
  // }

  render() {
    const styles = require('./SetLocation.scss');
    // require the logo image both from client and server
    console.log('outer classname ==', styles.setLocation);
    return (
      <div className={styles.setLocation}>
        <Helmet title="SetLocation"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img/>
              </p>
            </div>
            <h1>Do a twitter thing!</h1>
            <h2>The other thing!</h2>
          </div>
        </div>

        <div className="container">
        </div>
      </div>
    );
  }
}
