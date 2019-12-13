import React from 'react';
import { withStyles, Grid} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

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
          Work in progress...
        </Grid>
      </Grid>
    );
  }
}

export default inject('orgStore', 'commonStore')(observer(
  withStyles(style)(injectIntl(ConnectionSettings))
))
