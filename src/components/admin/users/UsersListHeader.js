import React from 'react';
import { Typography, TableCell, TableRow, TableHead, TableSortLabel } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

export default React.memo(({ handleRequestSort, orderBy, order, ...props }) =>
  <TableHead>
    <TableRow>
      <TableCell align="left"><Typography variant="h4"><FormattedMessage id="users.header.profile" /></Typography></TableCell>
      <TableCell align="left"><Typography variant="h4"><FormattedMessage id="users.header.account" /></Typography></TableCell>
      <TableCell align="left" sortDirection={orderBy === 'oar.created' ? order : false}>
        <Typography variant="h4">
          <TableSortLabel
            active={(orderBy === 'oar.created' ? true : false)}
            direction={order}
            onClick={(e) => handleRequestSort(e, 'oar.created')}
            style={{ height: '1.3rem', width: '1.3rem' }}
          >
            <FormattedMessage id="users.header.accessDate" />
          </TableSortLabel>
        </Typography>
      </TableCell>
      <TableCell align="left" sortDirection={orderBy === 'oar.welcomed_date' ? order : false}>
        <Typography variant="h4">
          <TableSortLabel
            active={(orderBy === 'oar.welcomed_date' ? true : false)}
            direction={order}
            onClick={(e) => handleRequestSort(e, 'oar.welcomed_date')}
            style={{ height: '1.3rem', width: '1.3rem' }}
          >
            <FormattedMessage id="users.header.welcomedDate" /> 
          </TableSortLabel>
        </Typography>
      </TableCell>
      <TableCell align="left" sortDirection={orderBy === 'last_login' ? order : false}>
        <Typography variant="h4">
          <TableSortLabel
            active={(orderBy === 'last_login' ? true : false)}
            direction={order}
            onClick={(e) => handleRequestSort(e, 'last_login')}
            style={{ height: '1.3rem', width: '1.3rem' }}
          >
            <FormattedMessage id="users.header.lastAccess" />
          </TableSortLabel>
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="h4">
          <FormattedMessage id="users.header.actions" />
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
);