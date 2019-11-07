import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

const style = {
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: 'grey',
  },
};

class GeneralSetup extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Typography>
        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
        maximus est, id dignissim quam.
      </Typography>
    );
  }
}

export default withStyles(style)(GeneralSetup);