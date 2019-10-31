import React from 'react';
import { inject, observer } from 'mobx-react';
import KeenDataviz from 'keen-dataviz';
import { observe } from 'mobx';
import { CircularProgress, withWidth } from '@material-ui/core';
import { injectIntl } from 'react-intl';

class Funnel extends React.Component {

  componentDidMount() {
    observe(this.props.keenStore, 'readClient', (change) => {
      if (change && change.newValue) {
        const chart = new KeenDataviz({
          container: '#funnel-container', // querySelector
          type: this.props.width === 'xs' ? 'funnel' : 'horizontal-funnel',
          title: null,
          labelMapping: {
            userAttached: this.props.intl.formatMessage({id: 'dashboard.funnel.userAttached'}),
            profileCreated: this.props.intl.formatMessage({id: 'dashboard.funnel.profileCreated'}),
            profileCompleted: this.props.intl.formatMessage({id: 'dashboard.funnel.profileCompleted'})
          },
          funnel: {
            percents: {
              show: true,
            },
          },
        });
        this.props.keenStore.readClient
          .query({
            analysisType: 'funnel',
            steps: [
              {
                actorProperty: 'item.userEmitter',
                eventCollection: 'userAttached',
                timeframe: "this_7_days",
                timezone: 'UTC'
              },
              {
                actorProperty: 'item.userEmitter',
                eventCollection: 'profileCreated',
                timeframe: "this_7_days",
                timezone: 'UTC'
              },
              {
                actorProperty: 'item.userEmitter',
                eventCollection: 'profileCompleted',
                timeframe: "this_7_days",
                timezone: 'UTC'
              }
            ]
          })
          .then(function (results) {
            chart
              .render(results);
          })
          .catch(function (error) {
            chart
              .message(error.message);
          });
      }
    });
  }

  render() {
    return (
      <div id="funnel-container" style={{ height: '300px' }}>
        <div style={{ position: 'relative', width: '100%', textAlign: 'center', top: '50%', transform: 'translateY(-50%)' }}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    )
  }
}
export default inject('commonStore', 'orgStore', 'authStore', 'recordStore', 'userStore', 'keenStore')(
  observer(
    withWidth()(injectIntl(Funnel))
  )
);