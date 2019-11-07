import React from 'react';
import Card from '../components/utils/container/Card';
import { FormattedMessage } from 'react-intl';
import GeneralSetup from '../components/admin/setup/GeneralSetup';
import { withStyles, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = {
  root: {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    padding: 64,
    paddingTop: 64,
    left: 0,
    '& *': {
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
};

class SetupPage extends React.Component {

  state = {
    activePanel: "GeneralSettings"
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
          <Card style={{ overflowX: 'auto', background: 'transparent', boxShadow: 'none', padding: 0 }} >
            {/* <Typography variant="h1" style={{ fontSize: '1.6rem', fontWeight: 500 }}>
              <FormattedMessage id="menu.drawer.admin.administration" />
            </Typography> */}

            <ExpansionPanel expanded={activePanel === 'GeneralSettings'} onChange={this.handleChangePanel('GeneralSettings')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h2" className={classes.heading}>General settings</Typography>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <GeneralSetup activePanel={activePanel} handleChangePanel={this.handleChangePanel} />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={activePanel === 'FeaturedFamilies'} onChange={this.handleChangePanel('FeaturedFamilies')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h2" className={classes.heading}>Onboard settings</Typography>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                Wings
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(SetupPage);