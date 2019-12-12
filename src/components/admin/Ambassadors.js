import React from "react";
import Store from "../../stores/store.js";
import { inject, observer } from "mobx-react";
import undefsafe from "undefsafe";
import MiniProfileCard from "../utils/container/MiniProfileCard";
import { withStyles, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const StoreInstance = new Store("Invitation");

const styles = {
  root: {
    padding: 0,
    width: 280,
    margin: "auto",
    marginTop: 16
  },
  ambassadorContainer: {
    padding: 8,
    height: 80,
    borderBottom: "1px solid grey"
  },
  ambassadorCount: {
    float: "right",
    margin: 8,
    color: "grey",
    fontWeight: 800
  }
};

class Ambassadors extends React.Component {
  state = {
    ambassadors: []
  };

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    let res = await StoreInstance.customRequest(
      "getAmbassadors",
      this.props.orgStore.currentOrganisation._id
    );
    console.log(res);
    this.setState({ ambassadors: res });
  };

  render() {
    const { ambassadors } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Typography variant="h4" style={{textAlign: 'center'}}>
          <FormattedMessage id="settings.connection.ambassadors.title" />
        </Typography>
        <ol className={classes.root}>
          {ambassadors.map((ambassador, index) => {
            if (index >= 10) return null;
            let user = ambassador.ambassador;
            return (
              <li className={classes.ambassadorContainer}>
                <div style={{ position: "absolute" }}>
                  <MiniProfileCard
                    pictureUrl={undefsafe(
                      user.orgsAndRecords[0],
                      "record.picture.url"
                    )}
                    name={undefsafe(user.orgsAndRecords[0], "record.name")}
                    recordTag={undefsafe(user.orgsAndRecords[0], "record.tag")}
                    completedAt={undefsafe(
                      user.orgsAndRecords[0],
                      "record.completedAt"
                    )}
                  />
                </div>
                <div className={classes.ambassadorCount}>
                  {ambassador.count}
                </div>
              </li>
            );
          })}
        </ol>
      </>
    );
  }
}

export default inject("orgStore")(observer(withStyles(styles)(Ambassadors)));
