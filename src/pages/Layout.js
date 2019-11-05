import React from 'react'
import Header from '../components/header/Header';
import ReactGA from 'react-ga';
import { withStyles } from '@material-ui/core';
import BannerResizable from '../components/utils/banner/BannerResizable';
console.debug('Loading Layout');

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

const style = {
  blackFilter: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.50
    ,
    overflow: 'hidden',
  },
}

class Layout extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <>
        <Header />
        <BannerResizable
          type={'organisation'}
          initialHeight={100}
          style={{ position: 'fixed' }}
        />
        <div className={classes.blackFilter} ></div>
      </>
    );
  }
}

export default withStyles(style)(Layout);
