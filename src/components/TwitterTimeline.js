import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class TwitterTimeline extends Component {

  static propTypes = {
    widgetId: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string
  }

  componentDidMount() {
    // Insert a script tag w/ all of the BS necessary to make a twitter widget
    const twitterTimeline = ReactDOM.findDOMNode(this.refs.twitterTimeline);
    const twitterScript = document.createElement('script');
    twitterScript.src = '//platform.twitter.com/widgets.js';
    twitterScript.async = true;
    twitterScript.id = 'twitter-wjs';
    twitterTimeline.parentNode.appendChild(twitterScript);
  }

  render() {
    return (
      <a
        ref="twitterTimeline"
        className="twitter-timeline"
        href={this.props.link}
        data-widget-id={this.props.widgetId}
      >
        {this.props.title}
      </a>
    );
  }
}
