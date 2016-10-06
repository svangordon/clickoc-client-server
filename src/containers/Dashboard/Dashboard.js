import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
// import {bindActionCreators} from 'redux';
// import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {load as loadLegislator} from 'redux/modules/legislator';
import {TweetForm} from 'components';
import {initialize} from 'redux-form';
import {toggleLegislator, sendTweet} from 'redux/modules/tweet';
// import ReactDOM from 'react-dom';
import {TwitterTimeline} from 'components';

@connect(
    state => ({
      user: state.user,
      legislator: state.legislator,
      tweet: state.tweet
    }),
    {loadLegislator, initialize, toggleLegislator, sendTweet}
  )

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    legislator: PropTypes.object,
    router: PropTypes.object,
    loadLegislator: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    toggleLegislator: PropTypes.func,
    tweet: PropTypes.object,
    sendTweet: PropTypes.func
  }

  componentWillMount() {

  }

  componentDidMount() {
    if (this.props.user.loaded && this.props.user.user.location.lat <= 0) {
      console.log('should redirect');
      this.props.router.push('/setLocation');
    } else {
      console.log(this.props.user.loaded, this.props.user.user.location.lat === -9999);
      this.props.loadLegislator();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.tweet.initialized && nextProps.legislator.loaded) {
      nextProps.legislator.legislator.forEach(legislator => {
        this.props.toggleLegislator(legislator);
      });
    }
  }

  _renderLegs() {
    const styles = require('./Dashboard.scss');
    if (this.props.legislator.loaded && this.props.legislator.legislator) {
      return (
        this.props.legislator.legislator.map((legislator, index) => {
          // const party = legislator.poliInfo.party === "D" ? 'democrat' : legislator.poliInfo === "R" ? 'republican' : 'independent';
          let party;
          if (legislator.poliInfo.party === "D") {
            party = styles.democrat;
          } else if (legislator.poliInfo.party === "R") {
            party = styles.republican;
          } else {
            party = styles.independent;
          }
          console.log('looking for ', legislator.twitterId, this.props.tweet.activeLegislators, this.props.tweet.activeLegislators.includes(legislator));
          const active = this.props.tweet.activeLegislators.some(activeLeg => {
            return activeLeg.twitterId === legislator.twitterId;
          }) ? styles.active : "";
          const classes = `${party} ${active} ${styles.legislator}`;
          return (
            <div className={classes} onClick={this.props.toggleLegislator.bind(this, legislator)} key={index}>{legislator.bioInfo.title + " " + legislator.bioInfo.firstName + " " + legislator.bioInfo.lastName}</div>
          );
        })
      );
    }
    return null;
  }

  // handleSubmit = (data) => {
  //   window.alert('Data submitted! ' + JSON.stringify(data));
  //   this.props.initialize('survey', {});
  // }

  _handleSubmit(formData) {
    const data = {
      tweetContent: formData.tweetContent,
      legislators: this.props.tweet.activeLegislators
    };
    console.log('submit fired', data);
    this.props.sendTweet(data);
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
          <div className="container">
            <TweetForm onSubmit={this._handleSubmit.bind(this)} legislators={this.props.legislator.legislator} />
          </div>
          <div>

          <TwitterTimeline
            widgetId={"783900553428422660"}
            link={"https://twitter.com/hashtag/clickocracy"}
            title={"#clickocracy Tweets"}
          />

          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Dashboard);
