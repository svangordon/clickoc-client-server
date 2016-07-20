import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton } from 'components';
import {bindActionCreators} from 'redux';
import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {test} from 'redux/modules/apiTest';
// import { isLoaded as isAuthLoaded } from 'redux/modules/auth';


@connect(
    state => ({
      info: state.info.data,
      auth: state.auth
    }),
    dispatch => bindActionCreators({test}, dispatch))

export default class Home extends Component {
  static propTypes = {
    info: PropTypes.object,
    auth: PropTypes.object,
    test: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.test();
    // if ('geolocation' in navigator) {
    //   console.log('geoloc available');
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log('coords ==', position.coords);
    //   });
    // } else {
    //   console.log('geoloc not available');
    // }
  }

  renderLogin() {
    if (this.props.auth.loaded) {
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
