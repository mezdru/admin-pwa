import React from 'react'
import Header from '../components/header/Header';
import ReactGA from 'react-ga';
console.debug('Loading Layout');

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

class Layout extends React.Component {
  render() {
    return (
      <Header />
    );
  }
}

export default Layout;
