import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import {default as FaSpinner} from "react-icons/lib/fa/spinner";
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
        lon: null
      }
    };
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
        <MapLoader
          lat={-25.363882}
          lng={131.044922}
        />
        <div className="container">
        </div>
      </div>
    );
  }
}
