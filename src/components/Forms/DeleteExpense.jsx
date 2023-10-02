import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function DeleteConfirmationPopup({isOpen, onDelete, selectedExpenseId, onClose}) {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete that expense? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onDelete(selectedExpenseId)}>
            Yes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}