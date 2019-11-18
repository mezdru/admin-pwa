import React from 'react';
import { inject, observer } from 'mobx-react';
import KeenDataviz from 'keen-dataviz';
import { observe } from 'mobx';
import { CircularProgress } from '@material-ui/core';

class Graph extends React.Component {

  getYValues = (initialValues) => {
    let initValues = initialValues.map(elt => elt.value);

    let values = [0];
    let max = Math.max(...initValues);
    values.push(Math.round(max * 0.25));
    values.push(Math.round(max * 0.50));
    values.push(Math.round(max));
    return values;
  }

  // @todo remake this aweful method
  loadDataviz = () => {
    this.props.keenStore.readClient
      .query(this.props.keenQuery)
      .then((results) => {
        if(!this.props.dupQueryWith) {
          const chart = new KeenDataviz({
            container: '#' + this.props.graphId, // querySelector
            title: this.props.title,
            type: this.props.type,
            grid: { x: { show: false }, y: { show: false } },
            axis: {
              y: {
                tick: {
                  values: this.getYValues(results.result)
                }
              }
            },
            zoom: {
              enabled: true
            },
            point: { "show": 2.5 },
          });

          chart.render(results);
        } else {
          this.props.keenStore.readClient
          .query(this.props.dupQueryWith)
          .then((results2) => {
            results.result = this.mixResults(results.result, results2.result);
            const chart = new KeenDataviz({
              container: '#' + this.props.graphId, // querySelector
              title: this.props.title,
              type: this.props.type,
              grid: { x: { show: false }, y: { show: false } },
              axis: {
                y: {
                  tick: {
                    values: this.getYValues(results.result)
                  }
                }
              },
              zoom: {
                enabled: true
              },
              point: { "show": 2.5 },
            });
  
            chart.render(results);
          });
        }
      })
      .catch((error) => {
        // chart
        //   .message(error.message);
      });
  }

  mixResults = (arrayA, arrayB) => {
    arrayA.forEach((arrayAElt, index) => {
      arrayAElt.value = arrayAElt.value + arrayB[index].value;
    });
    return arrayA;
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