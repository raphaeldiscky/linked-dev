import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{
          borderRadius: '1.5rem',
          color: '#dc3545',
          marginRight: '1.3rem',
          borderColor: '#dc3545'
        }}
        variant='outlined'
        className='btn-float-right'
        onClick={handleClickOpen}
      >
        Delete {props.whatToDelete}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete Account Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.contextText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: '#dc3545'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={props.handleDelete}
            style={{
              color: '#dc3545'
            }}
            autoFocus
          >
            Delete {props.whatToDelete}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
