import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import MapLoader from '../../components/MapLoader';

export default class SetLocation extends Component {
  static propTypes = {
    router: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      loc: {
        lat: null,
        lng: null
      },
      geolocAvailable: false
    };
  }

  componentWillMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this._setGeoloc.bind(this));
    } else {
      this.setState({
        geolocAvailable: false
      });
    }
  }

  _setGeoloc(position) {
    this.setState({
      loc: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      geolocAvailable: true
    });
  }

  renderMap() {
    if (this.state.geolocAvailable) {
      return (
        <MapLoader
          initLoc={this.state.loc}
        />
      );
    }
    return null;
  }

  render() {
    const styles = require('./SetLocation.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.setLocation}>
        <MapLoader />
        <Helmet title="SetLocation"/>
        <div className={styles.masthead}>
          <div className="container">
            <h1>Do a twitter thing!</h1>
            <h2>The other thing!</h2>
          </div>
        </div>
        <div className="container" style={{height: 500, width: 500}}>
          {this.renderMap()}
        </div>
      </div>
    );
  }
}
