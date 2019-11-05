import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Delete, Error, CheckCircleOutline } from '@material-ui/icons';
import { observer, inject } from 'mobx-react';
import { green } from '@material-ui/core/colors';


class RemoveAccountAction extends React.Component {
  state = {
    error: null,
    success: false
  }

  handleRemoveAccount = async () => {
    if (window.confirm("Do you want to delete his profile and remove his access to the organisation?")) {
      const { orgStore, recordStore, userStore, userId, recordId, onDelete } = this.props;
      if (recordId) await recordStore.deleteRecord(recordId).catch(e => this.setState({ error: e }));
      await userStore.banUser(userId, orgStore.currentOrganisation._id).catch(e => this.setState({ error: e }));

      if (!this.state.error) {
        this.setState({ success: true }, () => {
          setTimeout(() => { onDelete(userId); }, 1000);
        });
      }
    }
  }

  render() {
    const { error, success } = this.state;
    return (
      <IconButton aria-label="delete" onClick={this.handleRemoveAccount} disabled={error || success} >
        {!error && !success && (<Delete />)}
        {error && (<Error style={{ color: 'red' }} />)}
        {!error && success && (<CheckCircleOutline style={{ color: green[600] }} />)}
      </IconButton>
    )
  }
}

export default inject("orgStore", "recordStore", "userStore")(observer(RemoveAccountAction));