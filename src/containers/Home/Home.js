import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
// import { CounterButton } from 'components';
// import {bindActionCreators} from 'redux';
import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Grid, Row, Column, observeGrid} from 'react-cellblock';
import {TwitterTimeline} from 'components';

@connect(
    state => ({
      // info: state.info.data,
      auth: state.auth,
      user: state.user
    }),
    // dispatch => bindActionCreators({test}, dispatch),
    // {pushState: push}
  )

class Home extends Component {
  static propTypes = {
    // info: PropTypes.object,
    user: PropTypes.object,
    auth: PropTypes.object,
    router: PropTypes.object
    // pushState: PropTypes.func.isRequired
  }

  componentDidMount() {
    // Reminder to self that you can't mess w/ the router until after the component has mounted
    if (this.props.user.loaded) {
      console.log('should redirect');
      // console.log(this.props.router);
      this.props.router.push('/dashboard');
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
      <div>
        <div className={styles.home}>
          <Helmet title="Home"/>
          <div className={styles.masthead}>
            <div className="container">
              <div className={styles.logo}>
                <p>
                  <img src={logoImage}/>
                </p>
              </div>

            </div>
          </div>
          <Grid>
            <Row>
              <Column width="1/2">
                <h1>Login with Twitter!</h1>
                {this.renderLogin()}
                <h2>{config.app.description}</h2>
              </Column>
              <Column width="1/2">
                <TwitterTimeline
                  widgetId={"783900553428422660"}
                  link={"https://twitter.com/hashtag/clickocracy"}
                  title={"#clickocracy Tweets"}
                />
              </Column>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
