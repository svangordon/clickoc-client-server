import React, {Component} from 'react';
import Helmet from 'react-helmet';
// import { MiniInfoBar } from 'components';

export default class About extends Component {

  state = {
    showKitten: false
  }

  render() {
    // require the logo image both from client and server
    return (
      <div>
        <Helmet title="Location"/>
          <div className="container">
            <h1>WHERE U AT</h1>
          </div>

      </div>
    );
  }
}
