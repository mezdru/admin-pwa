import React from 'react';
import { withStyles } from '@material-ui/core';

const style = theme => ({
  root: {
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 32px)',
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    overflowY: 'auto',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    padding: 32,
    margin: 16,
    position: 'relative',
    // margin: 8,
    [theme.breakpoints.down('xs')]: {
      padding: 16
    }
  }
});

class Card extends React.Component {

  render() {
    return (
      <div className={this.props.classes.root} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(style)(Card);