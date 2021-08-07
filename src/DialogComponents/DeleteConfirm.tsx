import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BOServices from '../BOServices';


export default function DeleteConfrimDialog(props:{open:boolean,handleDeleteConfirmClose:()=>void,taskId:string}) {
  
  
 
  const deleteTask = async () => {
    debugger
    props.handleDeleteConfirmClose();
    //call delete task
    if (props.taskId) {
      const response = await BOServices.deleteTask(props.taskId);
      alert(response);
    } else {
      alert('parameter id missing, action aborted!')
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleDeleteConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"WARNING!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will delete this task permanently!
          </DialogContentText>
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this task?"}</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDeleteConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTask} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
