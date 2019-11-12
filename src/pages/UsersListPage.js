import React from 'react';
import Card from '../components/utils/container/Card';
import { Grid, withStyles, Typography, Table, TableCell, TableRow, TableBody, TablePagination, Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import UsersListHeader from '../components/admin/users/UsersListHeader';
import UsersListRow from '../components/admin/users/UsersListRow';
import urlService from '../services/url.service';
import { FormattedMessage } from 'react-intl';

var MomentConfigs = require('../components/configs/moment.conf');
MomentConfigs.setMomentFr();

const style = {
  root: {
    width: 'calc(100vw - 19px)',
    minHeight: '100vh',
    position: 'relative',
    padding: 64,
    paddingTop: 64,
    left: 0,
    '& *': {
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  table: {
    minWidth: 775,
    marginTop: 64
  },
  emailContainer: {
    overflowWrap: 'break-word',
    width: '150px',
    minWidth: '13vw'
  },
  usersActionContainer: {
    float: 'right',
    '& > *': {
      marginLeft: 16
    }
  }
}

class UsersListPage extends React.Component {

  state = {
    users: [],
    page: 0,
    rowsPerPage: 5,
    orderBy: 'last_login',
    order: 'desc'
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleRequestSort = (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({ order: (isDesc ? 'asc' : 'desc'), orderBy: property })
  };

  descDate(a, b, orderBy) {
    let aVal, bVal;
    if (orderBy === 'last_login') {
      aVal = (new Date(a['last_access'] || a[orderBy] || a['created'])).getTime();
      bVal = (new Date(b['last_access'] || b[orderBy] || b['created'])).getTime();
    } else if (orderBy === 'oar.created') {
      aVal = (new Date(a.orgsAndRecords[0].created)).getTime();
      bVal = (new Date(b.orgsAndRecords[0].created)).getTime();
    } else if (orderBy === 'oar.welcomed_date') {
      aVal = (new Date(a.orgsAndRecords[0].welcomed_date)).getTime();
      bVal = (new Date(b.orgsAndRecords[0].welcomed_date)).getTime();
    } else {
      aVal = (new Date(a[orderBy])).getTime();
      bVal = (new Date(b[orderBy])).getTime();
    }

    if (bVal < aVal) {
      return -1;
    }
    if (bVal > aVal) {
      return 1;
    }
    return 0;
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
  }

  getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => this.descDate(a, b, orderBy) : (a, b) => -this.descDate(a, b, orderBy);
  }

  componentDidMount() {
    this.props.userStore.fetchOrgUsers(this.props.orgStore.currentOrganisation._id)
      .then((users) => {
        this.setState({ users: users });
      }).catch(e => { console.log(e) });
  }

  handleRemoveAccount = (userId) => {
    let users = this.state.users.filter(u => u._id !== userId);
    this.setState({users: users});
  }

  render() {
    const { classes } = this.props;
    const { users, order, orderBy, page, rowsPerPage } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    return (
      <Grid container className={classes.root} >
        <Grid item xs={12} >
          <Card style={{ overflowX: 'auto', }} >
            <Typography variant="h1" style={{ float: 'left', fontSize: '1.6rem', fontWeight: 500 }}>
              <FormattedMessage id="menu.drawer.admin.userList" />
            </Typography>
            <div className={classes.usersActionContainer} >
              <Button color="secondary" component="a" href={urlService.createUrl(process.env.REACT_APP_HOST_BACKFLIP, '/admin/organisation/export/csv', this.props.orgStore.currentOrganisation.tag)}>
                Export to CSV
              </Button>
              <Button color="secondary" component="a" href={urlService.createUrl(process.env.REACT_APP_HOST_BACKFLIP, '/admin/organisation/export/excel', this.props.orgStore.currentOrganisation.tag)}>
                Export to Excel
              </Button>
            </div>

            <Table className={classes.table} aria-label="users list">
              <UsersListHeader handleRequestSort={this.handleRequestSort} orderBy={orderBy} order={order} />
              <TableBody>
                {this.stableSort(users, this.getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => <UsersListRow classes={classes} user={user} key={user._id} onDelete={this.handleRemoveAccount} />
                  )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 72.8 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
}
export default inject('commonStore', 'orgStore', 'authStore', 'recordStore', 'userStore', 'keenStore')(
  observer(
    withStyles(style)((UsersListPage))
  )
);