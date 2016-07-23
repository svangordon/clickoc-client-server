import React, { Component, PropTypes } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import { default as FaSpinner } from 'react-icons/lib/fa/spinner.js';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

export default class MapLoader extends Component {
  static propTypes = {
    initLoc: PropTypes.object
  }

  constructor(props) {
    super();
    this.state = {
      loc: props.initLoc
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props');
    this.setState({
      loc: nextProps.loc
    });
  }

  handleMapClick(event) {
    // as I come up to speed on the maps api, i realize that
    // this would all work better if I forewent latLng literals
    // in favor of the built in maps class
    this.setState({
      loc: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    }, () => {
      this._googleMapComponent.panTo(this.state.loc);
    });
  }

  renderGoogleMap() {
    return (
      <GoogleMap
        ref={(map) => {this._googleMapComponent = map; console.log(map);}}
        defaultZoom={15}
        defaultCenter={this.state.loc}
        onClick={this.handleMapClick.bind(this)}
      >
        <Marker
          position={this.state.loc}
        />
      </GoogleMap>
    );
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <ScriptjsLoader
          hostname={'maps.googleapis.com'}
          key={"AIzaSyCpNk8OQ8-7faUnIoKCjYTNcFMLLVJ1zOE"}
          pathname={'/maps/api/js'}
          query={{v: '3.exp', key: "AIzaSyCpNk8OQ8-7faUnIoKCjYTNcFMLLVJ1zOE", libraries: 'places'}}
          loadingElement={<div style={{height: '100%', width: '100%'}}><FaSpinner /></div>}
          containerElement={<div style={{height: '100%', width: '100%'}} />}
          googleMapElement={this.renderGoogleMap()}
        />
      </div>
    );
  }
}
