import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { MapLoader } from 'components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setLocation} from 'redux/modules/user';

@connect(
    () => ({}),
    {setLocation}
  )

export default class SetLocation extends Component {
  static propTypes = {
    router: PropTypes.func,
    setLocation: PropTypes.func
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

  _renderMap() {
    if (this.state.geolocAvailable) {
      return (
        <MapLoader
          initLoc={this.state.loc}
        />
      );
    }
    return null;
  }

  _submitLocation() {
    console.log(this.props);
    this.props.setLocation(this.state.loc);
  }

  _renderLocationConfirmation() {
    return (
      <div>
        <p>Please select a location close-ish to where you're registered to vote</p>
        <button onClick={this._submitLocation.bind(this)}>Submit</button>
      </div>
    );
  }

  render() {
    const styles = require('./SetLocation.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.setLocation}>
        <Helmet title="SetLocation"/>
        <div className={styles.masthead}>
          <div className="container">
            <h1>Do a twitter thing!</h1>
            <h2>The other thing!</h2>
          </div>
        </div>
        { this._renderLocationConfirmation() }
        <div className="container" style={{height: 500, width: 500}}>
          {this._renderMap()}
        </div>
      </div>
    );
  }
}
