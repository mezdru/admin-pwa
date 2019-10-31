import React from 'react';
import { inject, observer } from 'mobx-react';
import { observe } from 'mobx';
import FunnelGraph from 'funnel-graph-js';
import { withStyles } from '@material-ui/core';
import { queries } from '../../configs/keenQuery.config';

const style = {
  root: {
    height: '100%',
    width: '100%',
    '& .label__value': {
      color: 'blue !important'
    }
  }
}

class Funnel extends React.Component {

  componentDidMount() {
    const { theme } = this.props;

    observe(this.props.keenStore, 'readClient', (change) => {
      if (change && change.newValue) {
        this.props.keenStore.readClient
          .query(queries.funnel)
          .then(function (results) {
            var graph = new FunnelGraph({
              container: '#funnel-container',
              gradientDirection: 'horizontal',
              displayPercent: true,
              data: { values: [1200, 567, 140], labels: ['user', 'profile', 'profile completed'], colors: ['#000000', '#2b2d3c', '#e4e5ec', '#e4e5ec', '#FFFFFF'] },
              // data: {values: results.result, labels: ['user', 'profile', 'profile completed'], colors: ['orange', 'orange', 'green','red', 'red']},
              direction: 'horizontal'
            });
            graph.draw();
          });
      }
    });
  }

  render() {
    const { classes, theme } = this.props;
    return <div id="funnel-container" className={classes.root} ></div>;
  }
}
export default inject('commonStore', 'orgStore', 'authStore', 'recordStore', 'userStore', 'keenStore')(
  observer(
    withStyles(style, { withTheme: true })(Funnel)
  )
);