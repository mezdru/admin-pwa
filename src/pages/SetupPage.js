import React from 'react';
import Card from '../components/utils/container/Card';
import { FormattedMessage } from 'react-intl';
import GeneralSettings from '../components/admin/setup/GeneralSettings';
import { withStyles, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorBoundary from '../components/utils/errors/ErrorBoundary';
import OnboardSettings from '../components/admin/setup/OnboardSettings';
import ConnectionSettings from '../components/admin/setup/ConnectionSettings';
const style = theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    padding: 64,
    paddingTop: 64,
    paddingBottom: 0,
    left: 0,
    '& *': {
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    },
    [theme.breakpoints.down('xs')]: {
      padding: 16,
      paddingTop: 64
    }
  },
});

class SetupPage extends React.Component {

  state = {
    activePanel: "Connection"
  }

  handleChangePanel = panel => (event, isExpanded) => {
    this.setState({ activePanel: (isExpanded ? panel : false) });
  };

  render() {
    const { classes } = this.props;
    const { activePanel } = this.state;

    return (
      <Grid container className={classes.root} >
        <Grid item xs={12} >
          <Card style={{background: 'transparent', boxShadow: 'none', padding: 0 }} >

            <ExpansionPanel expanded={activePanel === 'GeneralSettings'} onChange={this.handleChangePanel('GeneralSettings')} >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h2" className={classes.heading}><FormattedMessage id="settings.general.title" /></Typography>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{overflowX: 'auto'}}>
                <ErrorBoundary>
                  <GeneralSettings activePanel={activePanel} handleChangePanel={this.handleChangePanel} />
                </ErrorBoundary>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={activePanel === 'FeaturedFamilies'} onChange={this.handleChangePanel('FeaturedFamilies')} >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h2" className={classes.heading}><FormattedMessage id="settings.onboard.title" /></Typography>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{overflowX: 'auto'}}>
                <OnboardSettings />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={activePanel === 'Connection'} onChange={this.handleChangePanel('Connection')} >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h2" className={classes.heading}><FormattedMessage id="settings.connection.title" /></Typography>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{overflowX: 'auto'}}>
                <ConnectionSettings />
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(SetupPage);