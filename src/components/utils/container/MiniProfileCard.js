import React from 'react';
import { withStyles } from '@material-ui/core';
import UrlService from '../../../services/url.service';
import { inject, observer } from 'mobx-react';
import defaultPicture from '../../../resources/images/placeholder_person.png';

const style = {
  root: {
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
    padding: 8,
    margin: 8,
    position: 'relative',
    height: 48,
    width: 200,
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'
    }
  },
  picture: {
    width: 32,
    height: 32,
    borderRadius: 32,
    position: 'absolute',
  },
  name: {
    float: 'right',
    marginLeft: 40,
    width: 'calc(100% - 40px)'
  }
}

class Card extends React.Component {

  formatName(name) {
    if (!name) return null;
    let out = name.substring(0, 35);
    if (name.length > 35) out += ' ...';
    return out;
  }

  render() {
    const { pictureUrl, name, classes, recordTag } = this.props;

    if (!pictureUrl && !name && !recordTag) {
      return (
        <div className={classes.root} style={{backgroundColor: 'rgb(248,248,248)', boxShadow: 'none'}}>
          
        </div>
      )
    }

    return (
      <a href={UrlService.getFrontflipUrl('/' + recordTag, this.props.orgStore.currentOrganisation.tag, this.props.commonStore.locale)} >
        <div className={classes.root} >
          <img src={pictureUrl || defaultPicture} alt="Profile picture" className={classes.picture} />
          <div className={classes.name} >{this.formatName(name)}</div>
        </div>
      </a>
    );
  }
}
export default inject('commonStore', 'orgStore')(
  observer(
    withStyles(style)((Card))
  )
);