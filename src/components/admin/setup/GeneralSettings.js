import React from 'react';
import { withStyles, Grid, Typography, TextField, Button, Divider } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PictureField from '../../utils/fields/PictureField';
import { FormattedMessage, injectIntl } from 'react-intl';

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
  },
  pictureTitle: {
    marginBottom: 8,
    textAlign: 'center'
  },
  divider: {
    margin: '16px 8px'
  }
};

class GeneralSettings extends React.Component {

  handleSave = async () => {
    // save name / tag / intro / pictures?
    const { currentOrganisation } = this.props.orgStore;
    await this.props.orgStore.updateOrganisation(currentOrganisation._id, ['intro', 'name', 'tag', 'logo', 'cover'], currentOrganisation);
    this.forceUpdate();
  }

  handleChange = (e, field) => {
    if (field !== 'intro') {
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
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.pictureTitle} >
            <FormattedMessage id="settings.general.logo.title" />
          </Typography>
          <PictureField pictureType="logo" pictureStyle={{ width: 180, height: 180, borderRadius: 180 }} />
        </Grid>
        <Grid item xs={12} >
          <TextField
            className={classes.textField}
            label={this.props.intl.formatMessage({id: 'settings.general.name.label'})}
            className={classes.textField}
            margin="normal"
            value={entities.decode(currentOrganisation.name)}
            onChange={(e) => this.handleChange(e, 'name')}
            helperText={this.props.intl.formatMessage({id: 'settings.general.name.helper'})}
            variant="outlined"
          />
        </Grid>
        {currentUser.superadmin && (
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              label={this.props.intl.formatMessage({id: 'settings.general.tag.label'})}
              className={classes.textField}
              margin="normal"
              value={entities.decode(currentOrganisation.tag)}
              onChange={(e) => this.handleChange(e, 'tag')}
              helperText={this.props.intl.formatMessage({id: 'settings.general.tag.helper'})}
              variant="outlined"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label={this.props.intl.formatMessage({id: 'settings.general.intro.label'})}
            className={classes.textField}
            margin="normal"
            value={entities.decode(currentOrganisation.intro[commonStore.locale])}
            onChange={(e) => this.handleChange(e, 'intro')}
            helperText={this.props.intl.formatMessage({id: 'settings.general.intro.helper'})}
            variant="outlined"
          />
        </Grid>

        {/* LOGO : 120x120 // COVER : 16:9 */}

        <Grid item xs={12}>
          <Typography variant="body1" className={classes.pictureTitle} >
          <FormattedMessage id="settings.general.cover.title" />
          </Typography>
          <PictureField pictureType="cover" pictureStyle={{ width: '100%' }} />
        </Grid>

        <Divider className={classes.divider} />

        <Grid item xs={12}>
          <Button color="secondary" onClick={this.handleSave} fullWidth>
          <FormattedMessage id="settings.general.save" />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default inject('orgStore', 'userStore', 'commonStore')(observer(
  withStyles(style)(injectIntl(GeneralSettings))
))
