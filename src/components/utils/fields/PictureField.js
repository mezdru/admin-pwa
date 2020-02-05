import React, { Suspense } from 'react'
import { withStyles, CircularProgress } from '@material-ui/core';
import { inject, observer } from "mobx-react";
import { injectIntl } from 'react-intl';
import ProfileService from '../../../services/profile.service';
import defaultPicture from '../../../resources/images/placeholder_person.png';
import defaultCover from '../../../resources/images/fly_away.jpg';
import './uploadcare_customize.css';
import undefsafe from 'undefsafe';

const Uploader = React.lazy(() => import('../uploadcare/Uploader'));

const styles = theme => ({
  pictureContainer: {
    position: 'relative',
    // margin: '0px 16px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')] : {
      margin: 8,
    },
  },
  picture: {
    position: 'relative',
    borderRadius: '4px',
    width: '100%',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    // width:180,
    // height:180,
    [theme.breakpoints.down('xs')] : {
      width: 180,
      height: 180,
    },
    // border: '8px solid white',
    background: 'white',
    zIndex: 2,
  },
});

class PictureField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pictureUrl: null,
    };
  }

  componentDidMount() {
    this._ismounted = true;
  }

  handleChange = (file) => {
    if(!this._ismounted) return;
    if(!file) {
      if(this.props.pictureType === 'logo') {
        this.props.orgStore.currentOrganisation.logo.url = null;
      } else if (this.props.pictureType === 'cover') {
        this.props.orgStore.currentOrganisation.cover.url = null;
      }
      this.setState({pictureUrl: null, loading: false});
    } else {
      this.setState({loading: true});
    }
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleUploadComplete = (file) => {
    if(!this._ismounted) return;
    if(this.props.pictureType === 'logo') {
      this.props.orgStore.currentOrganisation.logo.url = file.cdnUrl;
    } else if (this.props.pictureType === 'cover') {
      this.props.orgStore.currentOrganisation.cover.url = file.cdnUrl;
    }
    this.setState({pictureUrl: file.cdnUrl, loading: false});
  }

  handleResetPicture = (e) => {
    this.forceUpdate();
  }

  render() {
    const {pictureUrl, loading} = this.state;
    const {classes, pictureType, pictureStyle} = this.props;
    const {currentOrganisation} = this.props.orgStore;

    return (
      <div>

          <div className={classes.pictureContainer} style={this.props.style} >
            { (loading && !pictureUrl) && (
              <CircularProgress color='secondary' size={300} />
            )}
            {(!loading || pictureUrl) && (
              <img src={pictureUrl || (pictureType === 'logo' ? defaultPicture : defaultCover) } alt="" className={classes.picture} style={pictureStyle} />
            )}
          </div>

          <Suspense fallback={<CircularProgress color='secondary' />}>
            <Uploader
              style={{maxWidth: '100%'}}
              id='file'
              name='file'
              data-tabs='file camera url'
              data-crop={pictureType === 'logo' ? "180x180 upscale" : "1280x720 upscale"}
              // data-image-shrink="1280x1280"
              onChange={this.handleChange}
              value={pictureUrl ||  (pictureType === 'logo' ? undefsafe(currentOrganisation, 'logo.url') : undefsafe(currentOrganisation, 'cover.url'))}
              onUploadComplete={this.handleUploadComplete} 
              data-images-only />
          </Suspense>

      </div>
    );
  }
}

export default inject('commonStore', 'orgStore')(
  observer(
    injectIntl(withStyles(styles)(PictureField))
  )
);
