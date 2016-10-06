import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
// import { CounterButton } from 'components';
// import {bindActionCreators} from 'redux';
import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {load as loadLegislator} from 'redux/modules/legislator';
import {TweetForm} from 'components';
import {initialize} from 'redux-form';
import {toggleLegislator, sendTweet} from 'redux/modules/tweet';
import ReactDOM from 'react-dom';

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
    initialize: PropTypes.func.isRequired
  }

  componentWillMount() {

  }

  componentDidMount() {
    // Insert a script tag w/ all of the BS necessary to make a twitter widget
    const twitterTimeline = ReactDOM.findDOMNode(this.refs.twitterTimeline);
    const twitterScript = document.createElement('script');
    twitterScript.src = '//platform.twitter.com/widgets.js';
    twitterScript.async = true;
    twitterScript.id = 'twitter-wjs';
    twitterTimeline.parentNode.appendChild(twitterScript);
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
          <a
            ref="twitterTimeline"
            className="twitter-timeline"
            href={"https://twitter.com/hashtag/clickocracy"} data-widget-id={"783900553428422660"}>#clickocracy Tweets
          </a>


          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Dashboard);
