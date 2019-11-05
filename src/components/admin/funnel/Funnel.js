import React from 'react';
import { inject, observer } from 'mobx-react';
import KeenDataviz from 'keen-dataviz';
import { observe } from 'mobx';
import { CircularProgress, withWidth } from '@material-ui/core';
import { injectIntl } from 'react-intl';

class Funnel extends React.Component {

  loadDataviz = () => {
    const chart = new KeenDataviz({
      container: '#funnel-container', // querySelector
      type: this.props.width === 'xs' ? 'funnel' : 'horizontal-funnel',
      title: null,
      labelMapping: {
        userAttached: this.props.intl.formatMessage({ id: 'dashboard.funnel.userAttached' }),
        profileCreated: this.props.intl.formatMessage({ id: 'dashboard.funnel.profileCreated' }),
        profileCompleted: this.props.intl.formatMessage({ id: 'dashboard.funnel.profileCompleted' })
      },
      funnel: {
        percents: {
          show: true,
        },
      },
    });
    this.props.keenStore.readClient
      .query(this.props.keenQuery)
      .then(function (results) {
        chart
          .render(results);
      })
      .catch(function (error) {
        chart
          .message(error.message);
      });
  }

  componentDidMount() {
    if(this.props.keenStore.readClient) this.loadDataviz();
    
    observe(this.props.keenStore, 'readClient', (change) => {
      if (change && change.newValue) {
        this.loadDataviz();
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