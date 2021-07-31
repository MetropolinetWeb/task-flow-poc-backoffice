import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },ref: React.Ref<unknown>) {
   return <Slide direction="up" ref={ref} {...props} />;
});



export default function FullScreenDialog(props:{ handleClickOpen:() => void, handleClose: () => void, open: boolean}) {
  const classes = useStyles();
  

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Task Assignment
            </Typography>
          </Toolbar>
        </AppBar>
        <hr/>
        <Select autoFocus>
          <MenuItem value="agentId">agent 1</MenuItem>
          <MenuItem value="agentId">agent 2</MenuItem>
          <MenuItem value="agentId">agent 3</MenuItem>
          <MenuItem value="agentId">agent 4</MenuItem>
          <MenuItem value="agentId">agent 5 </MenuItem>
          </Select>
        <hr/>
        <Button variant="outlined" color="primary" onClick={props.handleClose}>Assign</Button>
      </Dialog>
    </div>
  );
}
