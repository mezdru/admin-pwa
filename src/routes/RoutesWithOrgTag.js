import React from 'react';
import {Switch} from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import {inject, observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import UrlService from '../services/url.service';

class RoutesWithOrgTag extends React.Component {

  state = {
    render: false,
    redirect404: false
  }

  componentDidMount() {
    this.props.orgStore.getOrFetchOrganisation(null, this.props.match.params.orgTag)
    .then((org) => {
      if(org && org.featuredWingsFamily && org.featuredWingsFamily.length > 0 && ! org.featuredWingsFamily[0]._id) {
        this.props.orgStore.fetchOrganisation(org._id)
        .then(() => {
          this.setState({render: true})
        }).catch(e => {
          this.setState({render: true})
        })
      } else {
        this.setState({render: true})
      }
    })
    .catch((e) => {
      this.setState({redirect404: true});
    })
    this.props.commonStore.setUrlParams(this.props.match);
  }
  isAdminInOrg = () => 
  (this.props.userStore.currentUser && 
    (this.props.userStore.currentUser.superadmin || 
      (this.props.userStore.currentOrgAndRecord && this.props.userStore.currentOrgAndRecord.admin)
    )
  );
  
  render() {
    const {routes} = this.props;
    const {locale} = this.props.commonStore;
    const { redirect404, render} = this.state;
    if(!this.props.authStore.isAuth()) return window.location.href = UrlService.getFrontflipUrl('/signin', this.props.match.params.orgTag, this.props.commonStore.locale);
    if(redirect404) return <Redirect to={'/' + locale + '/error/404/organisation'} push/>
    if (!render) return <CircularProgress color="secondary" style={{position: 'fixed', top: '45%', left:0, right:0, margin: 'auto'}} />;

    if(!this.isAdminInOrg()) return window.location.href = UrlService.getFrontflipUrl('', this.props.match.params.orgTag, this.props.commonStore.locale);

    return (
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    )
  }
}

export default (inject('commonStore', 'orgStore', 'authStore', 'userStore')(
  (observer(
    RoutesWithOrgTag
  )))
);