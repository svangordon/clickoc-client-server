import React, { Component, PropTypes } from 'react';
import { GoogleMap } from 'react-google-maps';
import { default as FaSpinner } from 'react-icons/lib/fa/spinner.js';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

export default class MapLoader extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  constructor() {
    super();
  }

  render() {
    if (typeof this.props.lat !== 'number' || typeof this.props.lng !== 'number') {
      return null;
    }
    console.log('lat lng ==', this.props.lat, this.props.lng);
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <ScriptjsLoader
          hostname={'maps.googleapis.com'}
          key={"AIzaSyCpNk8OQ8-7faUnIoKCjYTNcFMLLVJ1zOE"}
          pathname={'/maps/api/js'}
          query={{v: '3.exp', key: "AIzaSyCpNk8OQ8-7faUnIoKCjYTNcFMLLVJ1zOE", libraries: 'places'}}
          loadingElement={<div style={{height: '100%', width: '100%'}}><FaSpinner /></div>}
          containerElement={<div style={{height: '100%', width: '100%'}} />}
          googleMapElement={
            <GoogleMap ref={(map) => console.log(map)} defaultZoom={12} defaultCenter={{lat: this.props.lat, lng: this.props.lng}} />
          }
        />
      </div>
    );
  }
}
