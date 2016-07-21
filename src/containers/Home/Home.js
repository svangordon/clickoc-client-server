import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton } from 'components';
// import {bindActionCreators} from 'redux';
import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
// import {load as loadUser} from 'redux/modules/user';
// import {test} from 'redux/modules/apiTest';
// import {push} from 'react-router-redux';
// import { isLoaded as isAuthLoaded } from 'redux/modules/auth';


@connect(
    state => ({
      info: state.info.data,
      auth: state.auth,
      user: state.user
    }),
    // dispatch => bindActionCreators({test}, dispatch),
    // {pushState: push}
  )

export default class Home extends Component {
  static propTypes = {
    info: PropTypes.object,
    user: PropTypes.object,
    auth: PropTypes.object,
    // test: PropTypes.func.isRequired,
    // pushState: PropTypes.func.isRequired
  }

  componentWillMount() {
    const loaded = this.props.user.loaded;
    const user = this.props.user.user;
    if (loaded && user.location && user.location.lon === -9999 && user.location.lat === -9999) {
      // this.props.pushState('/setLocation');
      console.log('should redirect');
    }
  }

  renderLogin() {
    if (this.props.user.loaded) {
      return null;
    }
    return (
      <a href={'http://localhost:5000/auth/twitter'}>Login w/ Twitter</a>
    );
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo-placeholder.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>Do a twitter thing!</h1>
            {this.renderLogin()}
            <h2>{config.app.description}</h2>
          </div>
        </div>

        <div className="container">
        </div>
      </div>
    );
  }
}
