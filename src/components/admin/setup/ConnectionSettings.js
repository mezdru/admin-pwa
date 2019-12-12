import React from 'react';
import { withStyles, Grid, Typography, Stepper, Step, StepLabel, Button, FormControlLabel, Switch, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import Ambassadors from '../Ambassadors';

const style = theme => ({
  root: {
    position: 'relative',
    left: 0,
    right: 0,
    margin: 'auto',
    width: '100%'
  },
  cta: {
    textAlign: 'center',
  }
});

class ConnectionSettings extends React.Component {

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container item xs={12} spacing={16} direction="column" className={classes.root} justify="flex-start" >
        <Grid item xs={12}>
          <Ambassadors />
        </Grid>
      </Grid>
    );
  }
}

export default inject('orgStore', 'commonStore')(observer(
  withStyles(style)(injectIntl(ConnectionSettings))
))
