import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import MiniProfileCard from '../../../components/utils/container/MiniProfileCard';
import undefsafe from 'undefsafe';
import RemoveAccountAction from './RemoveAccountAction';
import AuthProvider from './AuthProvider';

export default React.memo(({ user, classes, onDelete, ...props }) =>
  <TableRow >
    <TableCell align="left" >
      <MiniProfileCard
        pictureUrl={undefsafe(user.orgsAndRecords[0], 'record.picture.url')}
        name={undefsafe(user.orgsAndRecords[0], 'record.name')}
        recordTag={undefsafe(user.orgsAndRecords[0], 'record.tag')}
        completedAt={undefsafe(user.orgsAndRecords[0], 'record.completedAt')}
      />
    </TableCell>
    <TableCell>
      <AuthProvider user={user} />
      <div className={classes.emailContainer}>
        <span style={{fontSize: '.6rem'}}>{(user.email.validated ? '✔️' : '⌛')}</span>&nbsp;{user.email.value}
      </div>
    </TableCell>
    <TableCell>{moment(user.orgsAndRecords[0].created).calendar()}</TableCell>
    <TableCell>{user.orgsAndRecords[0].welcomed_date && moment(user.orgsAndRecords[0].welcomed_date).calendar()}</TableCell>
    <TableCell>{moment(user.last_access || user.last_login || user.created).calendar()}</TableCell>
    <TableCell>
      <RemoveAccountAction userId={user._id} recordId={undefsafe(user.orgsAndRecords[0].record, '_id')} onDelete={onDelete} />
    </TableCell>
  </TableRow>
);