import React from "react";
import undefsafe from "undefsafe";
import googleIcon from '../../../resources/images/g.svg';
import linkedinIcon from '../../../resources/images/linkedin.png';
import { Email } from "@material-ui/icons";
import { withStyles } from "@material-ui/core";

const styles = {
  icon: {
    height: 15,
    width: 15,
    marginRight: 4,
    borderRadius: 4,
  }
}

export default React.memo(withStyles(styles)(({ user, classes, ...props }) => (
  <div>
    {user.emailUser && <Email className={classes.icon} />}
    {user.googleUser && <img src={googleIcon} className={classes.icon} />}
    {user.linkedinUser && <img src={linkedinIcon} className={classes.icon}/>}
  </div>
)));
