import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
// import { CounterButton } from 'components';
// import {bindActionCreators} from 'redux';
import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {load as loadLegislator} from 'redux/modules/legislator';
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

class Dashboard extends Component {
  static propTypes = {
    info: PropTypes.object,
    user: PropTypes.object,
    auth: PropTypes.object,
    router: PropTypes.object
    // pushState: PropTypes.func.isRequired
  }

  componentDidMount() {
    // Reminder to self that you can't mess w/ the router until after the component has mounted
    const loaded = this.props.user.loaded;
    const user = this.props.user.user;
    if (loaded && user.location && user.location.lng === -9999 && user.location.lat === -9999) {
      console.log('should redirect');
      // console.log(this.props.router);
      this.props.router.push('/setLocation');
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
    const styles = require('./Dashboard.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo-placeholder.png');
    return (
      <div>
        <div className={styles.dashboard}>
          <Helmet title="Dashboard"/>
          <div className={styles.masthead}>
            Masthead
          </div>

          <div className="container">
            Body
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
