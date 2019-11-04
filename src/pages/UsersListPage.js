import React from 'react';
import Card from '../components/utils/container/Card';
import { Grid, withStyles, Typography, Table, TableCell, TableRow, TableHead, TableBody, TablePagination, TableSortLabel } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import MiniProfileCard from '../components/utils/container/MiniProfileCard';
import undefsafe from 'undefsafe';

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
  },
  emailContainer: {
    overflowWrap: 'break-word',
    width: '150px',
    minWidth: '15vw'
  }
}

class UsersListPage extends React.Component {

  state = {
    users: [],
    page: 0,
    rowsPerPage: 10,
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
    if(orderBy === 'last_login') {
      aVal = (new Date(a[orderBy] || a['created'])).getTime();
      bVal = (new Date(b[orderBy] || b['created'])).getTime();
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

  render() {
    const { classes } = this.props;
    const { users, order, orderBy, page, rowsPerPage } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    return (
      <Grid container className={classes.root} >
        <Grid item xs={12} >
          <Card style={{ overflowX: 'auto', }} >
            <Typography variant="h1">
              Liste des utilisateurs
            </Typography>
            <Table className={classes.table} aria-label="users list">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Profile</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Created</TableCell>
                  <TableCell align="left" sortDirection={orderBy === 'last_login' ? order : false}>
                    <TableSortLabel
                      active={true}
                      direction={order}
                      onClick={(e) => this.handleRequestSort(e, 'last_login')}
                    >
                      Last login
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.stableSort(users, this.getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    return (
                      <TableRow key={user._id}>
                        <TableCell align="left" >
                          <MiniProfileCard
                            pictureUrl={undefsafe(user.orgsAndRecords[0], 'record.picture.url')}
                            name={undefsafe(user.orgsAndRecords[0], 'record.name')}
                            recordTag={undefsafe(user.orgsAndRecords[0], 'record.tag')}
                          />
                        </TableCell>
                        <TableCell>
                          <div className={classes.emailContainer}>
                            {user.email.value}
                          </div>
                        </TableCell>
                        <TableCell>{moment(user.created).calendar()}</TableCell>
                        <TableCell>{moment(user.last_login || user.created).calendar()}</TableCell>
                      </TableRow>
                    );
                  })}
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