import React from 'react';
import { withStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const style = {
  root: {
    position: 'relative',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: 'grey',
  },
  textField: {
    width: '100%',
    // maxWidth: 300
  }
};

class GeneralSetup extends React.Component {

  handleSave = async () => {
    // save name / tag / intro / pictures?
    const { currentOrganisation } = this.props.orgStore;
    await this.props.orgStore.updateOrganisation(currentOrganisation._id, ['intro', 'name', 'tag', 'logo', 'cover'], currentOrganisation);
    this.forceUpdate();
  }

  handleChange = (e, field) => {
    if(field !== 'intro') {
      this.props.orgStore.currentOrganisation[field] = e.target.value;
    } else {
      this.props.orgStore.currentOrganisation.intro = this.props.orgStore.currentOrganisation.intro || {};
      this.props.orgStore.currentOrganisation.intro[this.props.commonStore.locale] = e.target.value;
    }
    this.forceUpdate(); // why component do not update auto like Login fields ?
  }

  render() {
    const { classes, commonStore } = this.props;
    const { currentOrganisation } = this.props.orgStore;
    const { currentUser } = this.props.userStore;
    return (
      <Grid container item xs={12} md={6} spacing={16} direction="column" className={classes.root} justify="flex-start" >
        <Grid item xs={12} >
          <TextField
            className={classes.textField}
            label={"Organisation name"}
            className={classes.textField}
            margin="normal"
            value={entities.decode(currentOrganisation.name)}
            onChange={(e) => this.handleChange(e, 'name')}
            helperText={"The name of your organisation"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            disabled={!currentUser.superadmin}
            label={"Organisation tag"}
            className={classes.textField}
            margin="normal"
            value={entities.decode(currentOrganisation.tag)}
            onChange={(e) => this.handleChange(e, 'tag')}
            helperText={"The tag of your organisation, which is used in URL. The tag is unique."}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label={"Organisation introduction"}
            className={classes.textField}
            margin="normal"
            value={entities.decode(currentOrganisation.intro[commonStore.locale])}
            onChange={(e) => this.handleChange(e, 'intro')}
            helperText={"The introduction of your organisation, which will be used as search placeholder."}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" onClick={this.handleSave} fullWidth>
            Save changes
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default inject('orgStore', 'userStore', 'commonStore')(observer(
  withStyles(style)(GeneralSetup)
))
