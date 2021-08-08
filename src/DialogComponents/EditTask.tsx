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
import { Box, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Task } from "../interfaces/tasks.interface";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function EditTaskDialog(props:{open:boolean, handleEditTaskClose:() => void, task:Task}) {
  
  const classes = useStyles();
  const handleCreateClick = () => {
 
  }
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  }
  const handleSystemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    setSystem(event.target.value);
  }
  const [type, setType] = React.useState('');
  const [system, setSystem] = React.useState('');

  return (
    <div>
      <Dialog open={props.open}  TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={ props.handleEditTaskClose }>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Task
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Box m={5}>
              <Box><TextField label="name" placeholder={props.task.name}/></Box>
              <Box><TextField  label="description" /></Box>
              <Box><TextField  label="duration"  /></Box>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={(event)=>handleTypeChange}>
                  <MenuItem value={10}>Collection</MenuItem>
                  <MenuItem value={20}>Messurment</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">System</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={system} onChange={(event)=>handleSystemChange}>
                  <MenuItem value={10}>Collection</MenuItem>
                  <MenuItem value={20}>Messurment</MenuItem>
                  <MenuItem value={30}>Rabanut</MenuItem>
                  <MenuItem value={30}>IEC</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Typography> 
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="primary" fullWidth onClick={handleCreateClick}>Update Task</Button>
        </DialogActions>      
        <hr/>
      </Dialog>
    </div>
  );
}



