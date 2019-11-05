import React from 'react';
import { inject, observer } from 'mobx-react';
import KeenDataviz from 'keen-dataviz';
import { observe } from 'mobx';
import { CircularProgress } from '@material-ui/core';

class Graph extends React.Component {

  componentDidMount() {
    observe(this.props.keenStore, 'readClient', (change) => {
      if (change && change.newValue) {
        const chart = new KeenDataviz({
          container: '#' + this.props.graphId, // querySelector
          title: this.props.title,
          type: this.props.type,
          grid: {
            x: {
              show: false
            },
            y: {
              show: false
            }
          },
          zoom: {
            enabled: true
          },
          // axis: {"y":{"label":{"position":"outer-middle"},"height":60},"x":{"label":{"position":"outer-left"},"height":60}},
          point: {"show":2.5},
        });
        this.props.keenStore.readClient
          .query(this.props.keenQuery)
          .then((results) => {
            chart
              .render(results);
          })
          .catch((error) => {
            chart
              .message(error.message);
          });
      }
    });
  }

  render() {
    const { graphId } = this.props;

    return (
      <div id={graphId} style={{ height: '300px' }}>
        <div style={{ position: 'relative', width: '100%', textAlign: 'center', top: '50%', transform: 'translateY(-50%)' }}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    )
  }
}
export default inject('commonStore', 'orgStore', 'authStore', 'recordStore', 'userStore', 'keenStore')(
  observer(
    Graph
  )
);