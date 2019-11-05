import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default React.memo(({recordId, userId, ...props }) => {

  let handleRemoveAccount = () => {
    console.log(recordId, userId);
    // remove profile 
    // remove orgsAndRecords
  }

  return (
    <IconButton aria-label="delete" onClick={handleRemoveAccount} disabled>
      <DeleteIcon />
    </IconButton>
  )
}
);