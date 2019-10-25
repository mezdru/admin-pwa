import React from 'react';
import { inject, observer } from 'mobx-react';
import KeenDataviz from 'keen-dataviz';
import KeenAnalysis from 'keen-analysis';
import { observe } from 'mobx';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.props.commonStore.setUrlParams(this.props.match);
  }

  initChart = () => {

  }

  componentDidMount() {

    observe(this.props.keenStore, 'readClient', (change) => {
      if (change && change.newValue) {
        const chart = new KeenDataviz({
          container: '#demo_container', // querySelector
          title: 'Search evolution'
        });

        this.props.keenStore.readClient
          .query({
            analysisType: 'sum',
            eventCollection: 'search',
            targetProperty: 'item.results',
            timeframe: "this_14_days",
            interval: 'daily'
          })
          .then(function (results) {
            console.log(results);
            chart
              .render(results);
          })
          .catch(function (error) {
            console.log(error);
            chart
              .message(error.message);
          });
      }
    });
  }

  render() {
    return (
      <div id="demo_container" style={{ minHeight: 300 }} ></div>
    )
  }

}
export default inject('commonStore', 'orgStore', 'authStore', 'recordStore', 'userStore', 'keenStore')(
  observer(
    DashboardPage
  )
);