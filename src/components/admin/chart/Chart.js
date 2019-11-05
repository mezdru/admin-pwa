import React from 'react';
import { inject, observer } from 'mobx-react';
import KeenDataviz from 'keen-dataviz';
import { observe } from 'mobx';
import { CircularProgress } from '@material-ui/core';

class Graph extends React.Component {

  loadDataviz = () => {
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
      point: { "show": 2.5 },
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

  componentDidMount() {
    if (this.props.keenStore.readClient) this.loadDataviz();

    observe(this.props.keenStore, 'readClient', (change) => {
      if (change && change.newValue) {
        this.loadDataviz();
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