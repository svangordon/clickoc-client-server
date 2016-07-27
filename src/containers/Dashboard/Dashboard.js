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
      user: state.user,
      legislator: state.legislator
    }),
    {loadLegislator}
  )

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    legislator: PropTypes.object,
    router: PropTypes.object,
    loadLegislator: PropTypes.func.isRequired
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props.user.user.location);
    if (this.props.user.loaded && this.props.user.user.location.lat <= 0) {
      console.log('should redirect');
      this.props.router.push('/setLocation');
    } else {
      console.log(this.props.user.loaded, this.props.user.user.location.lat === -9999);
      this.props.loadLegislator();
    }
  }

  _renderLegs() {
    if (this.props.legislator.loaded && this.props.legislator.legislator) {
      return (
        this.props.legislator.legislator.map((cur, index) => {
          return (
            <div key={index}>{cur.twitterId}</div>
          );
        })
      );
    }
    return null;
  }

  render() {
    const styles = require('./Dashboard.scss');
    // require the logo image both from client and server
    return (
      <div>
        <div className={styles.dashboard}>
          <Helmet title="Dashboard"/>
          <div className={styles.masthead}>
            Masthead
          </div>

          <div className="container">
            Your federal legislators are:
            {
              this._renderLegs()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
