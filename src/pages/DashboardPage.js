import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import Funnel from '../components/admin/funnel/Funnel';
import Card from '../components/utils/container/Card';
import Graph from '../components/admin/graph/Graph';
import { queries } from '../components/configs/keenQuery.config.js';
import BannerResizable from '../components/utils/banner/BannerResizable';
import '../components/configs/keenOverride.css';
import { injectIntl } from 'react-intl';

const style = {
  root: {
    width: 'calc(100vw - 19px)',
    minHeight: '100vh',
    position: 'relative',
    padding: 64,
    paddingTop: 64,
    // paddingLeft: 32,
    left: 0,
    '& *': {
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  funnel: {
    // width: '100%',
    // height: 400,
    // margin: 8
  },
  block: {
  },
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



class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      graphes: []
    };
    this.props.commonStore.setUrlParams(this.props.match);
  }

  componentDidMount() {
    this.setState({graphes: [
      { title: this.props.intl.formatMessage({id: 'dashboard.chart.userActive.title'}), graphId: 'user-active', query: queries.userActiveInOrg, type: 'area-spline' },
      { title: this.props.intl.formatMessage({id: 'dashboard.chart.search.title'}), graphId: 'search', query: queries.searchInOrg, type: 'area-spline' },
      { title: this.props.intl.formatMessage({id: 'dashboard.chart.contact.title'}), graphId: 'contact', query: queries.contactInOrg, type: 'area-spline' },
      { title: this.props.intl.formatMessage({id: 'dashboard.chart.contactByType.title'}), graphId: 'contact-type', query: queries.contactByType, type: 'donut' }
    ]});
  }

  render() {
    const { classes } = this.props
    const {graphes} = this.state;

    return (
      <>
        <BannerResizable
          type={'organisation'}
          initialHeight={100}
          style={{ position: 'fixed' }}
        />
        <div className={classes.blackFilter} ></div>

        <Grid container className={classes.root} >
          <Grid item xs={12} className={classes.funnel} >
            <Card>
              <Funnel keenQuery={queries.funnel}/>
            </Card>
          </Grid>
          {graphes.map(graphe =>
            <Grid item xs={12} md={6} lg={4} className={classes.block} >
              <Card>
                <Graph title={graphe.title} keenQuery={graphe.query} graphId={graphe.graphId} type={graphe.type} />
              </Card>
            </Grid>
          )}
        </Grid>
      </>
    )
  }

}
export default inject('commonStore', 'orgStore', 'authStore', 'recordStore', 'userStore', 'keenStore')(
  observer(
    withStyles(style)( injectIntl(DashboardPage))
  )
);