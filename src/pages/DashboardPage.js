import React from "react";
import { inject, observer } from "mobx-react";
import { Grid, withStyles } from "@material-ui/core";
import Funnel from "../components/admin/funnel/Funnel";
import Card from "../components/utils/container/Card";
import Chart from "../components/admin/chart/Chart";
import { queries } from "../components/configs/keenQuery.config.js";
import "../components/configs/keenOverride.css";
import { injectIntl } from "react-intl";

const style = theme => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    padding: 64,
    paddingTop: 64,
    // paddingLeft: 32,
    left: 0,
    "& *": {
      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)"
    },
    [theme.breakpoints.down("md")]: {
      "& .keen-dataviz .keen-dataviz-title, .keen-dataviz .text-label, .keen-dataviz .text-main": {
        fontSize: "1rem"
      }
    },
    [theme.breakpoints.down("xs")]: {
      padding: 16,
      paddingTop: 64,
      "& .keen-dataviz .text-label": {
        marginRight: "-100px !important"
      }
    }
  }
});

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphes: []
    };
    this.props.commonStore.setUrlParams(this.props.match);
  }

  componentDidMount() {
    this.setState({
      graphes: [
        {
          title: this.props.intl.formatMessage({
            id: "dashboard.chart.userActive.title"
          }),
          graphId: "user-active",
          query: queries.userActiveInOrg,
          type: "area-spline"
        },
        {
          title: this.props.intl.formatMessage({
            id: "dashboard.chart.search.title"
          }),
          graphId: "search",
          query: queries.searchInOrg,
          type: "area-spline"
        },
        {
          title: this.props.intl.formatMessage({
            id: "dashboard.chart.view.title"
          }),
          graphId: "view",
          query: queries.profileView,
          type: "area-spline"
        },
        {
          title: this.props.intl.formatMessage({
            id: "dashboard.chart.contact.title"
          }),
          graphId: "contact",
          query: queries.contactInOrg,
          type: "area-spline"
        },
        {
          title: this.props.intl.formatMessage({
            id: "dashboard.chart.contactByType.title"
          }),
          graphId: "contact-type",
          query: queries.contactByType,
          type: "donut"
        },
        {
          title: this.props.intl.formatMessage({
            id: "dashboard.chart.pwa.title"
          }),
          graphId: "pwa",
          query: queries.pwaUsage,
          type: "area-spline",
          superadmin: true
        }
      ]
    });
  }

  render() {
    const { classes } = this.props;
    const { graphes } = this.state;

    return (
      <>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.funnel}>
            <Card>
              <Funnel keenQuery={queries.funnel} />
            </Card>
          </Grid>
          {graphes.map((graphe, index) => {
            if (
              graphe.superadmin &&
              !this.props.userStore.currentUser.superadmin
            )
              return null;

            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                className={classes.block}
                key={index}
              >
                <Card
                  style={graphe.superadmin ? {backgroundColor: 'rgba(239,216,7,.95)'} : {}}
                >
                  <Chart
                    title={graphe.title}
                    keenQuery={graphe.query}
                    dupQueryWith={graphe.dupQueryWith}
                    graphId={graphe.graphId}
                    type={graphe.type}
                    superadmin={graphe.superadmin}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}
export default inject(
  "commonStore",
  "orgStore",
  "authStore",
  "recordStore",
  "userStore",
  "keenStore"
)(observer(withStyles(style)(injectIntl(DashboardPage))));
